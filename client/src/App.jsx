import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Home, Shared, CreatePost } from './pages'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <header className='w-full h-16 sm:px-6 px-4 py-3 bg-white flex justify-between items-center border-b border-gray-100 '>
          <Link to='/'>
            <span className='font-bold text-2xl bg-gradient-to-r from-[#3491ee] to-[#c81bf3] text-transparent bg-clip-text'>ImageHub</span>
          </Link>
          <div className='flex justify-between items-center gap-4'>

          <Link to="/shared-posts" className='bg-blue-600 font-inter text-white rounded-lg px-4 py-2'>Shared Posts</Link>
          <Link to="/create-post" className='bg-blue-600 font-inter text-white rounded-lg px-4 py-2'>Create</Link>
          </div>
        </header>
        <main className='bg-gray-50 w-full sm:p-8 px-4 py-4 min-h-[calc(100vh-64px)]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shared-posts' element={<Shared />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
