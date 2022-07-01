import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase';
import Loading from '../../Shared/Loading';
import AddTask from '../ToDo/AddTask';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading></Loading>
  }
  return (
    <>
      {
        user ? <>
          <div className="hero bg-amber-50	">
            <div className="hero-content text-center">
              <div>
                <label htmlFor="addTask-Modal" className="btn modal-button">open modal</label>
              </div>
              <AddTask></AddTask>
            </div>
          </div>
        </>
          :
          <>
            <div className="hero min-h-screen bg-amber-50">
              <div className="hero-content text-center">
                <div className='max-w-lg'>
                  <h1 className="text-5xl font-bold"><span className='text-primary'>TasksifyBD</span> - Track your tasks</h1>
                  <p className="py-6">To manage your daily task first login into your exits account or create new account.</p>
                  <button className="btn btn-primary text-white mr-2"><Link to="/login">Login</Link></button>
                  <button className="btn btn-primary text-white"><Link to="/register">Register</Link></button>
                </div>
              </div>
            </div>
          </>
      }

    </>
  );
};

export default Home;