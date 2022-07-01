import React from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase';
import Loading from '../../Shared/Loading';

const AddTask = () => {
  const [user, loading] = useAuthState(auth);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  // Loading
  if (loading) {
    return <Loading></Loading>
  }
  // Add Task submit
  const onSubmit = async data => {
    console.log(user.email)
    const task = {
      email: user?.email,
      title: data.title,
      description: data.description,
      label: data.label
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
        }
        else {
          toast.error("Something error");
          reset();
        }
      })
  }


  return (
    <>
      <input type="checkbox" id="addTask-Modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Task */}
            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: 'Please enter your task name'
                  }
                })}
                className="input input-bordered w-full" />
              <label className="label">
                {errors.fullName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.title.message}</span>}
              </label>
            </div>
            {/* Description */}
            <div className="form-control w-full ">
              <label className="label font-semibold">
                <span className="label-text">Task Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: 'Please input task details'
                  }
                })}
                className="textarea textarea-bordered" rows="6"></textarea>
              <label className="label">
                {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
              </label>
            </div>
            {/* Task Label */}
            <div className="form-control w-full">
              <label className="label font-semibold">
                <span className="label-text">Label</span>
              </label>
              <input type="text"
                {...register("label", {
                  required: {
                    value: true,
                    message: 'Please enter task label'
                  }
                })}
                className="input input-bordered w-full" />
              <label className="label">
                {errors.label?.type === 'required' && <span className="label-text-alt text-red-500">{errors.label.message}</span>}
              </label>
            </div>
            <input className='btn btn-primary w-full text-white' type="submit" value="Add Task" />
          </form>
          <div className="modal-action">
            <label htmlFor="addTask-Modal" className="btn">Close</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;