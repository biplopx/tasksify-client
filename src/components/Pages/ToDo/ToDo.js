import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase';
import useMytasks from '../../../hooks/useMytasks';
import Loading from '../../Shared/Loading';
import SingleTask from '../../Shared/SingleTask';

const ToDo = () => {
  const [user, loading] = useAuthState(auth);
  const [myTasks] = useMytasks(user);
  if (loading) {
    return <Loading></Loading>
  }

  return (
    <section className='bg-amber-50 py-10'>
      <div className="container mx-auto px-6">
        <div className='text-center'>
          <h2 className='text-2xl text-center'>To DO</h2>
        </div>
        <div className='mt-6 max-w-md mx-auto'>
          {
            myTasks?.map(task => <SingleTask key={task._id} task={task}></SingleTask>)
          }
        </div>
      </div>
    </section>
  );
};

export default ToDo;