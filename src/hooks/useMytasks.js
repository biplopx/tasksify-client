import { useEffect, useState } from "react";
const useMytasks = user => {
  console.log(user)
  const [myTasks, setMytasks] = useState([]);
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
          console.log(data)
          setMytasks(data);
        });
    }
  }, [user])
  return myTasks;
}
export default useMytasks;