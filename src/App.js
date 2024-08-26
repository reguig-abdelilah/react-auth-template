import logo from './logo.svg';
import './App.css';
import Register from './pages/register';
import { Login } from './pages/login';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import LinkPage from './pages/linkpage'
import Unauthorized from './pages/unauthorized'
import Home from './pages/home'
import Editor from './pages/editor'
import Admin from './pages/admin'
import Lounge from './pages/lounge'
import Missing from './pages/missing';
import RequireAuth from './components/requireauth';
import PersistLogin from './components/persistlogin';

const RolesList = Object.freeze( {
  ADMIN: 9999,
  EDITOR: 5000,
  USER: 4500
});

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout />}>
      {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* Private Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[RolesList.USER]}/>}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[RolesList.ADMIN]}/>}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[RolesList.EDITOR]}/>}>
            <Route path='editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[RolesList.ADMIN, RolesList.EDITOR]}/>}>
            <Route path='lounge' element={<Lounge />} />
          </Route>
        </Route>

        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
    // <main className="App">
    //   {/* <Register /> */}
    //   <Login />
    // </main>
  );
}

export default App;
