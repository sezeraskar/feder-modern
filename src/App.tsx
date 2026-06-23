import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Management from './pages/Management'
import History from './pages/History'
import Contact from './pages/Contact'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import MemberRegister from './pages/MemberRegister'
import MemberLogin from './pages/MemberLogin'
import MemberProfile from './pages/MemberProfile'
import AdminLayout from './admin/AdminLayout'

function PublicSite() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FC', color: '#0D1B52' }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/yonetim-kurulu" element={<Management />} />
          <Route path="/tarihce" element={<History />} />
          <Route path="/haberler" element={<News />} />
          <Route path="/haberler/:id" element={<NewsDetail />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/uye-ol" element={<MemberRegister />} />
          <Route path="/giris" element={<MemberLogin />} />
          <Route path="/profilim" element={<MemberProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
