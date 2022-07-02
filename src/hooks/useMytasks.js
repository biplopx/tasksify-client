import { useEffect, useState } from "react";
const useMytasks = user => {
  const [myTasks, setMytasks] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
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
          setMytasks(data);
          setFetchAgain(false);
        });
    }
  }, [user, fetchAgain])
  return [myTasks, setMytasks, fetchAgain];
}
export default useMytasks;