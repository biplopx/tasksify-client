import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const NotFound = () => {
  return (
    <>
      <PageTitle title="Page Not Found"></PageTitle>
      <section className='py-10 px-5'>
        <div className="containe mx-auto">
          <div className="flex">
            <div className="mx-auto bg-white text-center">
              <img src='https://i.postimg.cc/1zFB9RHK/page-not-found.png' className='w-50' alt='page not found' />
              <Link className="btn btn-primary text-white my-3" to="/" role="button">Back To Home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;