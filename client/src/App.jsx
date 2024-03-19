import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterCom from './components/FooterCom'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollTop from './components/ScrollTop'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollTop/>
        <Header/>
        <Routes>
          <Route path='/' element ={ <Home/> } />
          <Route path='/about' element ={ <About/> } />
          <Route path='/sign-in' element ={ <SignIn/> } />
          <Route path='/sign-up' element ={ <SignUp/> } />

          <Route element ={ <PrivateRoute/> }>
            <Route path='/dashboard' element ={ <Dashboard/> } />
          </Route>
          <Route element={ <AdminPrivateRoute/> }>
            <Route path='/createPost' element ={ <CreatePost/> }/>
            <Route path='/update-post/:postId' element={ <UpdatePost/> } />
          </Route>

          <Route path='/projects' element ={ <Projects/> } />
          <Route path='/post/:postSlug' element={ <PostPage/> } />
        </Routes>
        <FooterCom/>
      </BrowserRouter>
    </>
  )
}

export default App
