import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase';
import Loading from '../../Shared/Loading';

const PasswordReset = () => {
  let resetError;
  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

  if (error) {
    resetError = <div className="p-2 my-3 bg-red-500 text-white rounded-md">
      <p><small>{error?.message}</small></p>
    </div>
  }
  if (sending) {
    return <Loading></Loading>
  }

  return (
    <section className='py-12 p-5 bg-sky-100'>
      <div className="flex h-screen justify-center items-start">
        <div className="w-96 bg-white border-2 rounded-md border-primary p-5">
          <h2 className="text-lg text-center font-bold mb-3">Password Reset</h2>
          <div>
            <div className='border-2 rounded-md mb-3'>
              <input onChange={(e) => setEmail(e.target.value)}
                type="email" placeholder="Type your email" className="input w-full focus:outline-none" />
            </div>
            {resetError}
            <button
              onClick={async () => {
                if (email) {
                  await sendPasswordResetEmail(email);
                  toast.success('Password reset email send');
                }
                else {
                  toast.error('Please enter your email address');
                }

              }}
              className='btn btn-primary w-full text-white'>Send Reset Email</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PasswordReset;