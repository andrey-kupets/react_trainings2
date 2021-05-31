import React, {Component, useEffect, useRef, useState} from "react";
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
//
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
//
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
//
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

// 3. Fetching, loading
// const baseUrl = 'https://jsonplaceholder.typicode.com/todos/';
//
// export const App = () => {
//     const [counter, setCounter] = useState(1);
//     // const [todos, setTodos] = useState([]);
//     const [todo, setTodo] = useState(null);
//     const [loadingStatus, setLoading] = useState(false);
//
//     const upCounter = () => {
//         setCounter(counter + 1);
//     }
//
//     const getData = async () => {
//         setLoading(true);
//         const res = await fetch(`${baseUrl}${counter}`);
//         const data = await res.json();
//         setTodo(data);
//         setLoading(false);
//         // console.log(todos);// void array cause of 'set...' is - ASYNC FUNC.
//     };
//
//     useEffect(() => {
//         getData();
//         return () => setTodo(null); // unmount prev todo
//     },[counter])
//
//     return (
//         <div>
//             <h2 onClick={upCounter}>React {counter} times</h2>
//             {loadingStatus && <h2>loading...</h2>}
//             {!!todo && <h3>{todo.title} - {todo.completed.toString()} - {todo.id}</h3>}
//             {/*may so, but render "-"*/}
//             {/*<h3>{todo?.title} {todo? '-' : ''} {todo?.completed.toString()} {todo? '-' : ''} {todo?.id}</h3>*/}
//         </div>
//     )
// }

// 4. Tabs of JSONPlaceholder
// const Tabs = ({ tabs, selectedTabTitle, onTabClick }) => {
//   return (
//     <div style={{ display: 'flex' }}>
//       {tabs.map((tab) => <button
//         key={tab}
//         style={{
//           flex: 1,
//           height: '40px',
//           background: selectedTabTitle === tab ? 'lightcoral' :'greenyellow'
//         }}
//         onClick={() => onTabClick(tab)}
//       >
//         {tab}
//       </button>)}
//     </div>
//   )
// };
//
// const PostsList = ({ list }) => {
//   return (
//     <>
//       {list.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <>{post.body}</>
//         </div>
//         ))}
//     </>
//   )
// };
//
// const CommentsList = ({ list }) => {
//   return (
//     <>
//       {list.map((comment) => (
//         <div key={comment.id}>
//           <h3>{comment.name}</h3>
//           <>{comment.body}</>
//         </div>
//         ))}
//     </>
//   )
// };
//
// const AlbumsList = ({ list }) => {
//   return (
//     <>
//       {list.map((album) => (
//         <div key={album.id}>
//           <h3>{album.title}</h3>
//         </div>
//         ))}
//     </>
//   )
// };
//
// const PhotosList = ({ list }) => {
//   return (
//     <>
//       {list.map((photo) => (
//         <div key={photo.id}>
//           <h3>{photo.title}</h3>
//           <img src={photo.thumbnailUrl} alt=""/>
//         </div>
//         ))}
//     </>
//   )
// };
//
// const TodosList = ({ list }) => {
//   return (
//     <>
//       {list.map((todo) => (
//         <div key={todo.id}>
//           <h3>{todo.title} - {todo.completed.toString()}</h3>
//           {/*instead of helper function*/}
//           {/*<h3>{todo.title} - {todo.completed?.toString()}</h3>*/}
//         </div>
//         ))}
//     </>
//   )
// };
//
// const UsersList = ({ list }) => {
//   return (
//     <>
//       {list.map((user) => (
//         <div key={user.id}>
//           <h3>{user.name} - {user.username} - {user.email}</h3>
//         </div>
//         ))}
//     </>
//   )
// };
//
// const baseUrlBuilder = (source) => `https://jsonplaceholder.typicode.com/${source}`;
//
//
// const POSTS = 'posts';
// const COMMENTS = 'comments';
// const ALBUMS = 'albums';
// const PHOTOS = 'photos';
// const TODOS = 'todos';
// const USERS = 'users';
//
// const Components = {
//   [POSTS]: PostsList,
//   [COMMENTS]: CommentsList,
//   [ALBUMS]: AlbumsList,
//   [PHOTOS]: PhotosList,
//   [TODOS]: TodosList,
//   [USERS]: UsersList,
// };
//
// // const tabs = [
// //   { title: POSTS, clickHandler: () => setSelectedTabTitle(POSTS) },
// //   { title: COMMENTS, clickHandler: () => setSelectedTabTitle(COMMENTS) },
// //   { title: ALBUMS, clickHandler: () => setSelectedTabTitle(ALBUMS) },
// //   { title: PHOTOS, clickHandler: () => setSelectedTabTitle(PHOTOS) },
// //   { title: TODOS, clickHandler: () => setSelectedTabTitle(TODOS) },
// //   { title: USERS, clickHandler: () => setSelectedTabTitle(USERS) },
// // ];
//
// const tabs = [
//   POSTS,
//   COMMENTS,
//   ALBUMS,
//   PHOTOS,
//   TODOS,
//   USERS,
// ];
//
// export const App = () => {
//   // helper function instead of Loading
//   // const tabChangeHandler = (tabTitle) => {
//   //   if (tabTitle !== selectedTabTitle) {
//   //     setSelectedTabTitle(tabTitle);
//   //     // setList([]);
//   //   }
//   // };
//
//   const [selectedTabTitle, setSelectedTabTitle] = useState(tabs[0]);
//   // const [list, setList] = useState([]);
//   const [data, setData] = useState({
//     [POSTS]: [],
//     [COMMENTS]: [],
//     [ALBUMS]: [],
//     [PHOTOS]: [],
//     [TODOS]: [],
//     [USERS]: [],
//   });
//   const  [loading, setLoading] = useState(false);
//
//   const fetchData = async () => {
//     setLoading(true);
//     const response = await fetch(baseUrlBuilder(selectedTabTitle));
//     const json = await response.json();
//     console.log(selectedTabTitle, json);
//
//     setData({ ...data, [selectedTabTitle]: json });
//     // setList(data);
//     setLoading(false);
//   };
//
//   useEffect(() => {
//     fetchData();
//   }, [selectedTabTitle])
//
//   const ComponentToRender = Components[selectedTabTitle];
//
//   return (
//     <div>
//       <Tabs
//         tabs={tabs}
//         selectedTabTitle={selectedTabTitle}
//         onTabClick={tab => setSelectedTabTitle(tab)}
//       />
//       {loading && !data[selectedTabTitle].length ? <h2>LOADING...</h2> : (
//         <ComponentToRender list={data[selectedTabTitle]}/>
//         // <>
//         //   {selectedTabTitle === POSTS && <PostsList posts={list}/>}
//         //   {selectedTabTitle === COMMENTS && <CommentsList comments={list}/>}
//         //   {selectedTabTitle === ALBUMS && <AlbumsList albums={list}/>}
//         //   {selectedTabTitle === PHOTOS && <PhotosList photos={list}/>}
//         //   {selectedTabTitle === TODOS && <TodosList todos={list}/>}
//         //   {selectedTabTitle === USERS && <UsersList users={list}/>}
//         // </>
//       )}
//     </div>
//   )
// }
// export default App;

// 5. Inputs (controlled, uncontrolled)

// 5.1. Uncontrolled inputs
// const App = () => {
// const _firstName = useRef();
// const _lastName = useRef();
// const _email = useRef();
// const _age = useRef();
// const _password = useRef();
// const _form = useRef();
//
// const onSubmit = e => {
//   e.preventDefault();
//   console.log(e);
// // _firstName.current.focus();
// // _firstName.current.style.background = 'lightblue';
//
//   // const {
//   //  1.1 by common destructuring
//   //   target: [
//   //   { value: firstName },
//   //   { value: lastName },
//   //   { value: email },
//   //   { value: age },
//   //   { value: password }
//   // ],
//   //  1.2 by destructuring of event.target.elements (need to define an input name)
//   //   target: {
//   //     elements: {
//   //       firstName: {value: firstName}, // got it
//   //       lastName,
//   //       email,
//   //       age,
//   //       password,
//   //     }
//   //   }
//   // } = e;
//   //
//   // 1.2
//   // console.log({ firstName, lastName, email, age, password });
//   // alert(JSON.stringify({
//   //   firstName, // got it
//   //   lastName: lastName.value,
//   //   email: email.value,
//   //   age: age.value,
//   //   password: password.value
//   // }, null, 2));
//
//   alert(JSON.stringify({
//     firstName: _firstName.current.value,
//     lastName: _lastName.current.value,
//     email: _email.current.value,
//     age: _age.current.value,
//     password: _password.current.value
//   }, null, 2));
//
// // _form.current.reset(); // ??
// _firstName.current.value = '';
// _lastName.current.value = '';
// _email.current.value = '';
// _age.current.value = '';
// _password.current.value = '';
// };
//
//   return (
//     <div className="App">
//       <form ref={_form} onSubmit={onSubmit}>
//         <input ref={_firstName} type="text" name="firstName" placeholder="input yr name" defaultValue="andrii"/>
//         <br/>
//         <input ref={_lastName} type="text" name="lastName" placeholder="input yr surname" defaultValue="pinskyi"/>
//         <br/>
//         <input ref={_email} type="email" name="email" placeholder="input email" defaultValue="andre@gmail.com"/>
//         <br/>
//         <input ref={_age} type="number" name="age" placeholder="input age" defaultValue="38"/>
//         <br/>
//         <input ref={_password} type="password" name="password" placeholder="input password" defaultValue="pass777"/>
//         <br/>
//         <br/>
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   )
// };
//
// export default App;


//5.2 Controlled inputs
const App = () => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [age, setAge] = useState('');
  // const [password, setPassword] = useState('');

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    password: '',
  });

  // const updateUserData = (field, value) => {
  //   setUserData({ ...userData, [field]: value })
  // };

  const updateUserData = (e) => {
    const {target: { value, name }} = e;
    setUserData({ ...userData, [name]: value })
  };

  const handleSubmit = () => {
    alert(JSON.stringify(userData, null, 2));
  };

  return (
    <div className="App">
      <input
        value={userData.firstName}
        onChange={updateUserData}
        type="text"
        name="firstName"
        placeholder="input yr name"/>
      <br/>
      <input
        value={userData.lastName}
        onChange={updateUserData}
        type="text"
        name="lastName"
        placeholder="input yr surname"
      />
      <br/>
      <input
        value={userData.email}
        onChange={updateUserData}
        type="email"
        name="email"
        placeholder="input email"
      />
      <br/>
      <input
        value={userData.age}
        onChange={updateUserData}
        type="number"
        name="age"
        placeholder="input age"
      />
      <br/>
      <input
        value={userData.password}
        onChange={updateUserData}
        type="password"
        name="password"
        placeholder="input password"
      />
      <br/>
      <br/>
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
};

export default App;
