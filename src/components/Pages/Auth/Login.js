import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase';
import useToken from '../../../hooks/useToken';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';

const Login = () => {
  let signinError;
  const navigate = useNavigate();
  const location = useLocation();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  let from = location.state?.from?.pathname || "/";

  const [token] = useToken(user || gUser)

  // if user exits then
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      toast.success('Login Successful');
    }
  }, [token, navigate, from])


  // loading state
  if (loading || gLoading) {
    return <Loading></Loading>
  }

  // error handling
  if (error || gError) {
    signinError = <div className="p-2 my-3 bg-red-500 text-white rounded-md">
      <p><small>{error?.message || gError?.message}</small></p>
    </div>
  }
  const onSubmit = async data => {
    signInWithEmailAndPassword(data.email, data.password);
  }
  return (
    <>
      <PageTitle title="Login"></PageTitle>
      <section className='py-12 p-5 bg-sky-100'>
        <div className="flex h-screen justify-center items-start">
          <div className="w-96 bg-white border-2 rounded-md border-primary p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <div className="form-control w-full ">
                <label className="label font-semibold">
                  <span className="label-text">Email</span>
                </label>
                <input type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: 'Please enter your email'
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Provide a valid an Email'
                    }
                  })}
                  placeholder="Your email" className="input input-bordered w-full" />
                <label className="label">
                  {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                  {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                </label>
              </div>
              {/* Pass Input */}
              <div className="form-control w-full">
                <label className="label font-semibold">
                  <span className="label-text">Password</span>
                </label>
                <input type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: 'Password is Required'
                    },
                    minLength: {
                      value: 6,
                      message: 'Password must be 6 characters or longer'
                    }
                  })}
                  placeholder="Your password" className="input input-bordered w-full" />
                <label className="label">
                  {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                  {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                </label>
              </div>
              <div>{signinError}</div>
              <input className='btn btn-primary w-full text-white' type="submit" value="Login" />
            </form>
            <p className='mt-4'><Link className='text-primary' to="/password-reset">Forgotten password?</Link></p>
            <p className='mt-4'>New to Taksify <Link className='text-primary' to="/register">Create new account here</Link></p>
            <div className="divider">OR</div>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline w-full hover:bg-primary"
            >Continue with Google</button>
          </div>

        </div>
      </section>
    </>
  );
};

export default Login;