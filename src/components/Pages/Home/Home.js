import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase';
import Loading from '../../Shared/Loading';
import SingleTask from '../../Shared/SingleTask';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [myTasks, setMyTasks] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

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
          setFetchAgain(false);
        });
    }
  }, [user, navigate, fetchAgain])


  if (loading) {
    return <Loading></Loading>
  }

  // Add Task submit
  const onSubmit = async data => {
    console.log(user.email)
    const task = {
      email: user?.email,
      title: data.title,
    }
    fetch('http://localhost:5000/add-task', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          toast.success("Task Added");
          reset();
          setFetchAgain(true)
        }
        else {
          toast.error("Something error");
          reset();
        }
      })
  }

  return (
    <>
      {
        user ? <>
          <section className='bg-amber-50 py-10'>
            <div className="container mx-auto px-6">
              <div className='text-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Task */}
                  <div className="form-control max-w-md mx-auto">
                    <input
                      type="text"
                      {...register("title", {
                        required: {
                          value: true,
                          message: 'Please enter your task name'
                        }
                      })}
                      placeholder="Add your task" className="input input-bordered w-full" />
                    <label className="label">
                      {errors.title?.type === 'required' && <span className="label-text-alt text-red-500">{errors.title.message}</span>}
                    </label>
                  </div>
                </form>
              </div>
              <div className='mt-6 max-w-md text-center mx-auto'>
                <ul className="rounded-md">
                  {
                    myTasks.map(task => <SingleTask key={task._id} setFetchAgain={setFetchAgain} task={task}></SingleTask>)
                  }
                </ul>
                {
                  myTasks && myTasks.length > 10 ? <button className='btn btn-primary text-white btn-sm'><Link to="/todo">View All</Link></button>
                    :
                    <></>
                }
              </div>
            </div>
          </section>

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