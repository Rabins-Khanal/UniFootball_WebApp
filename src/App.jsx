import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import OnlyAdminPrivateRoute from './components/private/admin/OnlyAdminPrivateRoute';
import Dashboard from './components/private/dashboard/Dashboard';
import CreatePost from './components/private/posts/CreatePost';
import PostPage from './components/private/posts/PostPage';
import Search from './components/private/posts/Search';
import UpdatePost from './components/private/posts/UpdatePost';
import PrivateRoute from './components/private/user/PrivateRoute';
import Footer from './components/public/Footer';
import Header from './components/public/Header';
import Home from './components/public/Home';
import SignIn from './components/public/SignIn';
import SignUp from './components/public/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
