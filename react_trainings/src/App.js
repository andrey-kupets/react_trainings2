import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

const Header = ({counter}) => {
    console.log('rerender child');
    return <h1>{counter}</h1>;
}

const TodoItem = ({todo}) => (
    <div>
        {todo.title} <br/>
        {todo.content}
        <hr/>
    </div>
)

function App() {
  console.log('rerender parent');

  // const [ counter, setCounter ] = useState(0);
  // const [ headerVisibility, setHeaderVisibility ] = useState(true);
  // const [ todos, setTodos ] = useState([
  //     {id: 1, title: 'react', content: 'text'},
  //     {id: 2, title: 'angular', content: 'text'},
  //     {id: 3, title: 'mongo', content: 'text'}]);

  const [ state, setState ] = useState({
      counter: 0,
      headerVisibility: true,
      todos: [
          {id: 1, title: 'react', content: 'text'},
          {id: 2, title: 'angular', content: 'text'},
          {id: 3, title: 'mongo', content: 'text'}]
  })

  const countHandler = () => {
    setState({
        ...state,
        counter: state.counter + 1
    });
    console.log(state.counter + 1);
  };

  const toggleHandler = () => {
    setState({
        ...state,
        headerVisibility: !state.headerVisibility
    });
  };

  const changeTodo = () => {
    const newArr = [...state.todos];
    newArr[1] = {
        id: newArr[1].id,
        title: Math.random(),
        content: Math.random()
    };
    setState({
        ...state,
        todos: newArr
    });

    // if ref on initialState isn't changed - NO RENDER - so we copy by ...
      // or in that way:
      // setTodos([...todos])
      // todos = [todos[0], todos[1]];
    //   todos[1] = Math.random();
    //   setTodos(todos);

  };

  const { counter, headerVisibility, todos } = state;
  return (
    <div className="App">
      {headerVisibility && <Header counter={counter}/>}
      <button onClick={countHandler}><h3>+1</h3></button>
      <button onClick={toggleHandler}><h3>toggleHeader</h3></button>
      <button onClick={changeTodo}><h3>change todo</h3></button>
      {state.todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
    </div>
  );
}

export default App;
