import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase';
import Loading from '../../Shared/Loading';
import DoneTask from './DoneTask';

const CompeletedTask = () => {
  const [user, loading] = useAuthState(auth);
  const [completedTask, setCompletedTask] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    if (user) {
      fetch(`https://polite-drake-61056.herokuapp.com/mytasks/completed?email=${user?.email}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('tasksifyAccessToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setCompletedTask(data);
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
          <h2 className='text-2xl text-center'>Completed Task {completedTask.length}</h2>
        </div>
        <div className='mt-6 max-w-md mx-auto'>
          {
            completedTask && completedTask.map(task => <DoneTask key={task._id} task={task} setFetchAgain={setFetchAgain}></DoneTask>)
          }
        </div>
      </div>
    </section>
  );
};

export default CompeletedTask;