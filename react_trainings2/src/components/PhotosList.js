import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersDataFromApi, removeFromFiring, setToFiring,} from "../redux/action-creators";

export const PhotosList = () => {
  const dispatch = useDispatch();

  const users = useSelector(({userReducer: {users}}) => users);
  const employeesToFiring = useSelector(({userReducer: {employeesToFiring}}) => employeesToFiring)

  const fetchData = async () => {
    const raw = await fetch(`https://dummyapi.io/data/api/user?limit=10`, {
      headers: {
        'app-id': 'lTE5abbDxdjGplutvTuc'
      }
    });
    const jsonData = await raw.json();

    dispatch(getUsersDataFromApi(jsonData.data));
  }


  const toggleFiring = (id) => {
    const answer = !employeesToFiring.includes(id) && window.confirm(`do u really wanna delete this item from a list?`)
    answer ? dispatch(setToFiring(id)) : employeesToFiring.includes(id) && dispatch(removeFromFiring(id))
  }

  useEffect(() => {
    if (!users.length) { // don't get request every time u render component
      fetchData();
    }

  }, [])


  // filter: grayscale(1);
  return (
    <div>
      {users.map(el => <img
        style={{
          filter: employeesToFiring.includes(el.id)
          ? 'blur(3px)'
          : ''
        }}
        onClick={() => toggleFiring(el.id)}
        key={el.id}
        src={el.picture}
        alt={el.firstName}
      />)}
    </div>
  )
}
