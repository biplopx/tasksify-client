import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const SingleTask = ({ task, setFetchAgain }) => {
  const [isEdit, setIsEdit] = useState("false");
  const { _id, title } = task;
  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });


  // Edit task
  const handleEdit = (id) => {

    console.log(id)
    setIsEdit(!isEdit);

  }

  // Complete Task
  const handleOnCheck = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/mytask`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ status: "completed", id: _id })
    }).then(res => res.json())
      .then(result => {
        toast.success('task completed');
        setFetchAgain(true)
      })
  };


  const onSubmit = async data => {
    console.log(data)
    // const task = {
    //   email: user?.email,
    //   title: data.title,
    // }
    // fetch('http://localhost:5000/add-task', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(task)
    // })
    //   .then(res => res.json())
    //   .then(result => {
    //     if (result.status === 200) {
    //       toast.success("Task Added");
    //       reset();
    //       setFetchAgain(true)
    //     }
    //     else {
    //       toast.error("Something error");
    //       reset();
    //     }
    //   })
  }


  return (
    <li className='p-4 flex justify-between items-center bg-white border border-secondary duration-300 hover:bg-gray-100 mb-3 rounded-md'>
      <span><input onClick={handleOnCheck} type="checkbox" className="checkbox checkbox-xs" /> </span>
      <p className={isEdit ? "block" : "hidden"}>{title}</p>
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
            placeholder={title} className={`input input-bordered w-full input-sm ${!isEdit ? "block" : "hidden"}`} />
        </div>
      </form>
      <div className="btn-group">
        <button onClick={() => handleEdit(_id)} className="btn border-0 btn-xs bg-primary text-white">Edit</button>
        <button className="btn border-0 btn-xs bg-red-500 text-white">Delete</button>
      </div>
    </li>
  );
};

export default SingleTask;