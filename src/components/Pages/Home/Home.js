import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase';
import Loading from '../../Shared/Loading';
import SingleTask from '../../Shared/SingleTask';
import AddTask from '../ToDo/AddTask';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [myTasks, setMyTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/mytasks?email=${user?.email}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('tasksifyAccessToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setMyTasks(data);
        });
    }
  }, [user, navigate])


  if (loading) {
    return <Loading></Loading>
  }


  return (
    <>
      {
        user ? <>
          <section className='bg-amber-50 py-10'>
            <div className="container mx-auto px-6">
              <div className='text-center'>
                <label htmlFor="addTask-Modal" className="btn modal-button">Add Task {myTasks?.length}</label>
              </div>
              <div className='mt-6 max-w-md mx-auto'>
                {
                  myTasks.map((task, index) => <SingleTask key={task._id} task={task}></SingleTask>)
                }
              </div>
            </div>
          </section>
          <AddTask></AddTask>

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