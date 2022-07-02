import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const SingleTask = ({ task, setFetchAgain }) => {
  const [isEdit, setIsEdit] = useState("false");
  const { _id, title } = task;
  const { register, handleSubmit } = useForm({
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
    fetch(`https://polite-drake-61056.herokuapp.com/mytask`, {
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

  // Delete Task
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/mytask/`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: _id })
    }).then(res => res.json())
      .then(result => {
        toast.success('Task Delete');
        setFetchAgain(true)
      })
  }


  const onSubmit = async data => {
    fetch(`https://polite-drake-61056.herokuapp.com/mytask/edit`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ title: data.title, id: _id })
    }).then(res => res.json())
      .then(result => {
        toast.success('task edited');
        setFetchAgain(true)
        setIsEdit("true")
      })
  }


  return (
    <li className='p-4 flex justify-between items-center bg-white border border-secondary duration-300 hover:bg-gray-100 mb-3 rounded-md'>
      <span><input onClick={handleOnCheck} type="checkbox" className="checkbox checkbox-xs" /> </span>
      <p className={isEdit ? "block" : "hidden"}>{title}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control max-w-md mx-auto">
          <input
            type="text"
            {...register("title")}
            placeholder={title} className={`input input-bordered w-full input-sm ${!isEdit ? "block" : "hidden"}`} />
        </div>
      </form>
      <div className="btn-group">
        <button onClick={() => handleEdit(_id)} className="btn border-0 btn-xs bg-primary text-white">Edit</button>
        <button onClick={() => handleDelete(_id)} className="btn border-0 btn-xs bg-red-500 text-white">Delete</button>
      </div>
    </li>
  );
};

export default SingleTask;