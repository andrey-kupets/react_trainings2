import React, {Component, useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

// 1. state
// const Header = ({counter}) => {
//     console.log('rerender child');
//     return <h1>{counter}</h1>;
// };
//
// const TodoItem = ({todo, remove}) => (
//     <div>
//         {todo.title} <br/>
//         {todo.content} <br/>
//         <button onClick={remove}><b>remove</b></button>
//         <hr/>
//     </div>
// );
//
// function App() {
//   console.log('rerender parent');
//
//   // const [ counter, setCounter ] = useState(0);
//   // const [ headerVisibility, setHeaderVisibility ] = useState(true);
//   // const [ todos, setTodos ] = useState([
//   //     {id: 1, title: 'react', content: 'text'},
//   //     {id: 2, title: 'angular', content: 'text'},
//   //     {id: 3, title: 'mongo', content: 'text'}]);
//
//   const [ state, setState ] = useState({
//       counter: 0,
//       headerVisibility: true,
//       todos: [
//           {id: 1, title: 'react', content: '1'},
//           {id: 2, title: 'angular', content: '2'},
//           {id: 3, title: 'mongo', content: '3'}],
//       itemsToHide: [],
//   });
//
//   const countHandler = () => {
//     setState( {
//         // для сложных стейтов (стейт - объект)
//         // если не копировать стейт, то тогда мы перезапишем ВЕСЬ стейт (все его поля) на то, что влаживаем
//         // т.е. в данном случае весь объект - перезапишется только на его часть (одно поле)
//         ...state,
//         counter: state.counter + 1
//     });
//     console.log(state.counter + 1);
//   };
//
//   const toggleHandler = () => {
//     setState({
//         ...state,
//         headerVisibility: !state.headerVisibility
//     });
//   };
//
//   const changeTodo = () => {
//     const newArr = [...state.todos];
//     newArr[0] = {
//         id: newArr[0].id,
//         title: Math.random(),
//         content: Math.random()
//     };
//     setState({
//         ...state,
//         todos: newArr
//     });
//     // if ref on initialState isn't changed - NO RENDER - so we copy by ...
//       // or in that way:
//       // setTodos([...todos])
//       // todos = [todos[0], todos[1]];
//     //   todos[1] = Math.random();+-
//     //   setTodos(todos);
//   };
//
//   // const removeFirst = () => {
//   //     // setState({
//   //     //     ...state,
//   //     //   todos: state.todos.filter((todo, index ) => index !== 0)
//   //     // })
//   //     const newArr = [...state.todos];
//   //     newArr.shift();
//   //     setState({
//   //         ...state,
//   //         todos: newArr
//   //     })
//   // };
//   //
//   // const removeLast = () => {
//   //     const newArr = [...state.todos];
//   //     newArr.pop();
//   //     setState({
//   //         ...state,
//   //         // todos: state.todos.filter((todo, index ) => index !== state.todos.length - 1)
//   //         todos: newArr
//   //     })
//   // }
//
//   // const removeTodoItem = (todoItem) => {
//   //     if (todoItem !== 'first' && todoItem !== 'last') return;
//   //     const newArr = [...state.todos];
//   //     // todoItem === 'first' && newArr.shift();
//   //     // todoItem === 'last' && newArr.pop();
//   //     todoItem === 'first' ? newArr.shift() : newArr.pop();
//   //     // если в параметрах слайса указан [], то происходит поверхностная копия,
//   //     // и всё равно, что в этот массив влаживать
//   //     // const  newArr = [...state.todos].slice('first' ? [0, 1] : [[...state.todos].length, [...state.todos].length - 1]);
//   //     // todoItem === 'first' ? newArr.shift() : newArr.pop();
//   //
//   //     setState({
//   //         ...state,
//   //         todos: newArr
//   //     });
//   // };
//
//   const filteredArr = [...state.todos].filter(todo => !state.itemsToHide.includes(todo.id));
//
//   const removeTodoItem = (itemForRemoving) => {
//       const itemToRemove = itemForRemoving === 'first' ? filteredArr[0] : filteredArr[filteredArr.length-1];
//       // if (filteredArr.length === 0) return;
//       if (!itemToRemove) return;
//       setState({
//           ...state,
//           itemsToHide: [...state.itemsToHide, itemToRemove.id]
//       });
//   };
//
//   // const removeTodo = (id) => {
//   //     setState({
//   //         ...state,
//   //         todos: state.todos.filter(todo => todo.id !== id)
//   //     })
//   // };
//
//     const removeTodo2 = (itemForRemoving) => {
//         // const itemToRemove = itemForRemoving === 'first' ? filteredArr[0] : filteredArr[filteredArr.length-1];
//         // if (filteredArr.length === 0) return;
//         if (!itemForRemoving) return;
//         setState({
//             ...state,
//             itemsToHide: [...state.itemsToHide, itemForRemoving.id]
//         });
//     };
//
//   const restoreTodos = () => {
//       setState({
//           ...state,
//           // todos: [ // hardcode
//           //     {id: 1, title: 'react', content: '1'},
//           //     {id: 2, title: 'angular', content: '2'},
//           //     {id: 3, title: 'mongo', content: '3'}]
//           itemsToHide: []
//       })
//   };
//
//   const { counter, headerVisibility, todos } = state;
//   return (
//     <div className="App">
//       {headerVisibility && <Header counter={counter}/>}
//       <button onClick={countHandler}><h3>+1</h3></button>
//       <button onClick={toggleHandler}><h3>toggleHeader</h3></button>
//       <button onClick={changeTodo}><h3>change todo</h3></button>
//       <button onClick={() => removeTodoItem('first')}><h3>remove 1st todo</h3></button>
//       <button onClick={() => removeTodoItem('last')}><h3>remove last todo</h3></button>
//       <button onClick={restoreTodos}><h3>restore todos</h3></button>
//       <ul>
//           {/*{filteredArr.map(todo => <li key={todo.id}><TodoItem todo={todo} remove={() => removeTodo(todo.id)}/></li>)}*/}
//           {filteredArr.map(todo => <li key={todo.id}><TodoItem todo={todo} remove={() => removeTodo2(todo)}/></li>)}
//       </ul>
//     </div>
//   );
// };

//2. componentDidMount, DidUpdate, WillUnmount
// useEffect

// class Child extends Component {
//     componentDidMount() {
//         console.log('child mount');
//     }
//
//     componentWillUnmount() {
//         console.log('no child render more');
//     }
//
//     render() {
//         return (
//             <>
//                 <h3>child</h3>
//             </>
//         );
//     }
// }

// const Child =() => {
//
//     //REMEMBER return in useEffect === WillUnmount
//     useEffect(() => {
//         console.log('child mount');
//
//         return () => console.log('no child render more');
//     },[]);
//
//     return (
//         <>
//             <h3>child</h3>
//         </>
//     );
// }

// class App extends Component {
//     state = {counter: 0};
//     intervalId;
//
//     inc = () => {
//         // this.state.counter++;
//         this.setState({counter: ++this.state.counter});
//         console.log(this.state.counter)
//     }
//     componentDidMount() {
//         this.intervalId = setInterval(() => {
//             console.log('justice', this.intervalId);
//         }, 2000)
//
//         console.log(this.intervalId, 'MOUNT');
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         console.log('state is updated');
//     }
//
//
//
//     render() {
//         return (
//             <>
//                 <h2 onClick={this.inc}>react {this.state.counter} is - in justice</h2>
//                 {this.state.counter < 3 && <Child/>}
//
//             </>
//         );
//     }
// }


// 3. Fetching
const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

export const App = () => {

    const getData = async () => {
        const res = await fetch(baseUrl);
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        getData();
    })

    return (
        <div>
            App
        </div>
    )
}
export default App;

