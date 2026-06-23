import type { Member, Due } from './types'
import { boardMembers } from '../data/content'

const phones = ['0532 111 22 33','0533 222 33 44','0542 333 44 55','0545 444 55 66','0551 555 66 77','0553 666 77 88','0555 777 88 99']
const occupations = ['Mühendis','Avukat','Doktor','Öğretmen','Akademisyen','İşletmeci','Memur','Emekli']
const districts = ['Kadıköy','Üsküdar','Beşiktaş','Şişli','Bakırköy','Ataşehir','Maltepe']

function slugify(s: string) {
  return s.toLowerCase()
    .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s')
    .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
    .replace(/\s+/g,'.')
}

const REGULAR_NAMES = [
  'Ahmet Yılmaz','Mehmet Kaya','Ayşe Demir','Fatma Çelik','Ali Şahin',
  'Hasan Arslan','Zeynep Kurt','Elif Aydın','Mustafa Doğan','Serkan Öztürk',
  'Gülay Yıldız','Cem Korkmaz','Selin Koç','Burak Güneş','Deniz Erdoğan',
  'Tuba Aktaş','Umut Çakır','Hande Polat','Ozan Güler','Melis Acar',
]

export const SEED_MEMBERS: Member[] = [
  ...boardMembers.map((bm, i) => ({
    id: `brd-${String(i + 1).padStart(3, '0')}`,
    name: bm.name,
    email: `${slugify(bm.name)}@feder.org.tr`,
    phone: phones[i % phones.length],
    joinDate: '2020-01-15',
    birthDate: `${1960 + (i % 25)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
    address: `${districts[i % districts.length]}, İstanbul`,
    occupation: occupations[i % occupations.length],
    status: 'active' as const,
    boardMember: true,
    boardBoard: bm.board as 1 | 2,
    boardTitle: bm.title,
    notes: '',
    createdAt: '2020-01-15T10:00:00Z',
  })),
  ...REGULAR_NAMES.map((name, i) => ({
    id: `mbr-${String(i + 1).padStart(3, '0')}`,
    name,
    email: `${slugify(name)}@gmail.com`,
    phone: phones[(i + 3) % phones.length],
    joinDate: `${2018 + (i % 6)}-${String((i % 12) + 1).padStart(2, '0')}-01`,
    birthDate: `${1975 + (i % 20)}-06-15`,
    address: `${districts[(i + 2) % districts.length]}, İstanbul`,
    occupation: occupations[(i + 2) % occupations.length],
    status: (i % 5 === 0 ? 'passive' : 'active') as 'active' | 'passive',
    boardMember: false,
    notes: '',
    createdAt: `${2018 + (i % 6)}-${String((i % 12) + 1).padStart(2, '0')}-01T09:00:00Z`,
  })),
]

const YEARS = [2022, 2023, 2024, 2025, 2026]
const AMOUNT = 500

export const SEED_DUES: Due[] = SEED_MEMBERS.flatMap((m, mi) =>
  YEARS.map((year, yi) => ({
    id: `due-${mi}-${yi}`,
    memberId: m.id,
    year,
    amount: AMOUNT,
    paid: year <= 2024 ? mi % 7 !== 0 : mi % 3 === 0,
    paidDate: year <= 2024 && mi % 7 !== 0
      ? `${year}-${String((mi % 3) + 1).padStart(2, '0')}-15`
      : (year > 2024 && mi % 3 === 0 ? `${year}-01-20` : ''),
    notes: '',
  }))
)
