import { useEffect, useState } from "react";
const useMytasks = user => {
  const [myTasks, setMytasks] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    if (user) {
      fetch(`https://polite-drake-61056.herokuapp.com/mytasks?email=${user?.email}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('tasksifyAccessToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setMytasks(data);
          setFetchAgain(false);
        });
    }
  }, [user, fetchAgain])
  return [myTasks, setMytasks, fetchAgain];
}
export default useMytasks;