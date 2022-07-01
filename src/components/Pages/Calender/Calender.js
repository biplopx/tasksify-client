import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PageTitle from '../../Shared/PageTitle';


const Calender = () => {
  return (
    <>
      <PageTitle title="Calender"></PageTitle>
      <section className="py-10">
        <div className="h-3/4 flex justify-center items-center">

          <Calendar />

        </div>
      </section>
    </>
  );
};

export default Calender;