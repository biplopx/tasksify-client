import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase';
import Loading from '../../Shared/Loading';
import SingleTask from '../../Shared/SingleTask';

const ToDo = () => {
  const [user, loading] = useAuthState(auth);
  const [myTasks, setMyTasks] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    if (user) {
      fetch(`https://polite-drake-61056.herokuapp.com/mytasks?email=${user?.email}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('tasksifyAccessToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setMyTasks(data);
          setFetchAgain(false);
        });
    }
  }, [user, fetchAgain])
  if (loading) {
    return <Loading></Loading>
  }
  return (
    <section className='bg-amber-50 py-10'>
      <div className="container mx-auto px-6">
        <div className='text-center'>
          <h2 className='text-2xl text-center'>To DO {myTasks.length}</h2>
        </div>
        <div className='mt-6 max-w-md mx-auto'>
          {
            myTasks && myTasks.map(task => <SingleTask key={task._id} task={task} setFetchAgain={setFetchAgain}></SingleTask>)
          }
        </div>
      </div>
    </section>
  );
};

export default ToDo;