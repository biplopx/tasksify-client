import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase';
import Loading from './Loading';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
  }
  const menuItems = <>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/todo">ToDo</Link></li>
    <li><Link to="/completed-task">Compeleted Task</Link></li>
    <li><Link to="/calender">Calender</Link></li>
    {
      user ?
        <></>
        :
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
    }
  </>

  if (loading) {
    return <Loading></Loading>
  }


  return (
    <header className='border'>
      <div className="container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52">
                {menuItems}
              </ul>
            </div>
            <Link to="/home" className="normal-case text-2xl font-bold text-primary">Tasksify BD</Link>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              {menuItems}
            </ul>
            {
              user && <>
                <button onClick={logout} className="btn btn-active btn-primary text-white">Log Out</button>
              </>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;