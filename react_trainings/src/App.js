import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';

const Header = ({add}) => (
    <h1>{add}</h1>
)

function App() {
  const [counter, setCounter ] = useState(0);
  const [headerVisibility, setHeaderVisibility ] = useState(true);
  const [todos, setTodos] = useState(['react', 'angular']);

  const countHandler = () => {
    setCounter(counter + 1);
    console.log(counter + 1);
  };

  const toggleHandler = () => {
    setHeaderVisibility(!headerVisibility);
  };

  const changeTodo = () => {
    const newArr = [...todos];
    newArr[1] = Math.random();
    setTodos(newArr);
    // if ref on initialState isn't changed - NO RENDER - so we copy by ... or in that way:
    //   todos = [todos[0], todos[1]];
    //   todos[1] = Math.random();
  };

  return (
    <div className="App">
      {headerVisibility && <Header add={counter}/>}
      <button onClick={countHandler}><h3>+1</h3></button>
      <button onClick={toggleHandler}><h3>toggleHeader</h3></button>
      <button onClick={changeTodo}><h3>change todo</h3></button>
      <div>{todos[0]}</div>
      <div>{todos[1]}</div>
    </div>
  );
}

export default App;
