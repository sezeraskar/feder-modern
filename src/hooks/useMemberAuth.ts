import { useState, useCallback } from 'react'
import type { Member } from '../admin/types'

const SESSION_KEY = 'feder_member_session'
const MEMBERS_KEY = 'feder_members'

interface MemberSession {
  memberId: string
  email: string
  exp: number
}

function loadMembers(): Member[] {
  try {
    return JSON.parse(localStorage.getItem(MEMBERS_KEY) || '[]')
  } catch {
    return []
  }
}

function loadSession(): MemberSession | null {
  try {
    const s = localStorage.getItem(SESSION_KEY)
    if (!s) return null
    const parsed = JSON.parse(s) as MemberSession
    if (parsed.exp < Date.now()) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function useMemberAuth() {
  const [session, setSession] = useState<MemberSession | null>(loadSession)

  const login = useCallback((email: string, password: string, remember: boolean): boolean => {
    const members = loadMembers()
    const member = members.find(m => m.email.toLowerCase() === email.toLowerCase() && m.password === password)
    if (!member) return false

    const exp = remember
      ? Date.now() + 30 * 24 * 3600 * 1000
      : Date.now() + 24 * 3600 * 1000

    const s: MemberSession = { memberId: member.id, email: member.email, exp }
    localStorage.setItem(SESSION_KEY, JSON.stringify(s))
    setSession(s)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }, [])

  const getProfile = useCallback((): Member | null => {
    if (!session) return null
    const members = loadMembers()
    return members.find(m => m.id === session.memberId) ?? null
  }, [session])

  return {
    isLoggedIn: !!session,
    session,
    login,
    logout,
    getProfile,
  }
}

export function getMemberSession(): MemberSession | null {
  return loadSession()
}
