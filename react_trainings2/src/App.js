// 1. REACT ROUTER
// import React, {useEffect, useState} from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
//   useLocation,
//   useHistory,
//   useParams, useRouteMatch
// } from "react-router-dom";
//
// export default function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             {/*<li>*/}
//             {/*  <Link to="/about">About</Link>*/}
//             {/*</li>*/}
//             {/*<li>*/}
//             {/*  <Link to="/users">Users</Link>*/}
//             {/*</li>*/}
//             {/*<li>*/}
//             {/*  <Link to="/test">Test</Link>*/}
//             {/*</li>*/}
//             <li>
//               <Link to="/posts">Posts</Link>
//             </li>
//             {/*<li>*/}
//             {/*  <Link to="/posts/:id">PostDetails</Link>*/}
//             {/*</li>*/}
//           </ul>
//         </nav>
//
//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           {/*different ways to render*/}
//           {/*<Route path="/" exact="true">*/}
//           {/*  <Home />*/}
//           {/*</Route>*/}
//           {/*<Route path="/about" render={(args) => {*/}
//           {/*  console.log(args);*/}
//           {/*  return <About/>*/}
//           {/*}}/>*/}
//           {/*doesn't conduct props*/}
//           {/*<Route path="/users">*/}
//           {/*  <Users />*/}
//           {/*</Route>*/}
//           {/*<Route path="/test">*/}
//           {/*  {Test}*/}
//           {/*</Route>*/}
//           {/*<Route>*/}
//           {/*  <Redirect to="/"/>*/}
//           {/*</Route>*/}
//
//           <Route path="/" component={Home} exact/>
//
//           <Route path="/posts">
//             <Posts/>
//           </Route>
//
//           <Route>
//             <h2>PAGE'S NOT FOUND</h2>
//           </Route>
//
//         </Switch>
//       </div>
//     </Router>
//   );
// }
//
// function Home(props) {
//   return <h2>Home</h2>;
// }
//
// function Posts(props) {
//   const [posts, setPosts] = useState([]);
//
//   const fetchData = async () => {
//     const baseUrl = 'https://jsonplaceholder.typicode.com/posts/';
//
//     const rawData = await fetch(baseUrl);
//     const jsonData = await rawData.json();
//
//     await setPosts(jsonData);
//     console.log(posts)
//   };
//
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   return (
//     <div>
//       {/*don't forget to chenge the order of rendering components */}
//       <ul>
//         {posts.map((el) => <Link to={`/posts/${el.id}`}><li>{el.id} - {el.title}</li></Link>)}
//       </ul>
//
//       <Switch>
//         <Route path="/posts/:id" component={PostDetails} exact/>
//
//         <Route>
//           <Redirect to="/posts"/>
//         </Route>
//       </Switch>
//     </div>
//   );
// }
//
// const PostDetails = (props) => {
//   console.log(props);
//   const [post, setPost] = useState([]);
//
//   const { id } = useParams();
//   const match = useRouteMatch();
//   const location = useLocation();
//   const history = useHistory(); // or
//   // const { history } = props; // ...if starting route conducts props...
//   // console.log({params, match, location, history});
//
//   const fetchData = async () => {
//     const baseUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
//
//     const rawData = await fetch(baseUrl);
//     const jsonData = await rawData.json();
//
//     setPost(jsonData);
//   };
//
//   useEffect(() => {
//     fetchData();
//   }, [id]);
//
//     return (
//         <div>
//           {post && (
//             <>
//               <h1>Post Details:</h1>
//               <h3>{post.title}</h3>
//               <p>{post.body}</p>
//
//
//               <button onClick={() => history.push(`/posts/${+id - 1}`)}>go to the previous</button>
//               <button onClick={() => history.push(`/posts/${+id + 1}`)}>go to the next</button>
//             </>
//           )}
//         </div>
//     )
// }

//2. CONTEXT (TODOS LIST)
// import React, {createContext, useContext, useState} from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
//
// const TodoContext = createContext();
//
// const TodoContextProvider = ({children}) => {
//   const [todos, setTodos] = useState([]);
//   const [doneTodosIds, setDoneTodosIds] = useState([]);
//
//   const onTodoCreate = (newTodo) => {
//     if (!newTodo || !newTodo.title || !newTodo.description) {
//       console.error('wrong arg, put smth like "title: ..., description: ..."');
//       return;
//     }
//     setTodos([newTodo, ...todos]);
//   }
//
//   const onTodoRemove = (todoId) => {
//     if (!todoId) {
//       return console.error('wrong id value:' , todoId);
//     }
//
//     setTodos(todos.filter(el => el.id !== todoId));
//     setDoneTodosIds(doneTodosIds.filter(id => id !== todoId));
//   }
//
//   const isDoneToggle = (todoId) => {
//     const isTodoMarkedAsDone = doneTodosIds.includes(todoId);
//
//     if (isTodoMarkedAsDone) {
//       return setDoneTodosIds(doneTodosIds.filter(id => id !== todoId));
//     }
//
//     setDoneTodosIds([...doneTodosIds, todoId]);
//   }
//
//   return (
//     <TodoContext.Provider value={{
//       todos,
//       onTodoCreate,
//       onTodoRemove,
//       isDoneToggle,
//       doneTodosIds,
//     }}>
//       {children}
//     </TodoContext.Provider>
//   )
// }
//
// const TodoItem = ({todo, onTodoRemove, isDoneToggle, isDoneTodoIdStatus}) => {
//   const onDeleteTodo = () => {
//     const answer = window.confirm('are u really sure wanting to delete this one?');
//
//     if (answer) {
//       onTodoRemove(todo.id);
//     }
//   };
//
//   const onMarkIsDoneToggle = () => isDoneToggle(todo.id);
//
//   return (
//     <li>
//       <div style={{
//         textDecoration: isDoneTodoIdStatus ? 'line-through' : ''
//       }}>
//         <h4>title: {todo.title}</h4>
//         <p>description: {todo.description}</p>
//         <button onClick={onDeleteTodo}>delete todo</button>
//         <button
//           style={{backgroundColor: isDoneTodoIdStatus ? 'palegreen' : 'red'}}
//           onClick={onMarkIsDoneToggle}>mark as {isDoneTodoIdStatus ? 'active' : 'done'}</button>
//       </div>
//     </li>
//   )
// }
//
// const TodosList = () => {
//   const {
//     todos,
//     onTodoRemove,
//     isDoneToggle,
//     doneTodosIds,
//   } = useContext(TodoContext);
//   console.log(doneTodosIds);
//
//   return (
//     <div>
//       <ul>
//         {todos.map(el => (
//           <TodoItem
//             key={el.title + el.description}
//             todo={el}
//             onTodoRemove={onTodoRemove}
//             isDoneToggle={isDoneToggle}
//             isDoneTodoIdStatus={doneTodosIds.includes(el.id)}
//           />
//         ))}
//       </ul>
//     </div>
//   )
// }
//
// const AddTodo = () => {
//   const [todoValues, setTodoValues] = useState({
//     title: '',
//     description: '',
//     id: null,
//   });
//
//   const { onTodoCreate } = useContext(TodoContext);
//
//   const onTodoChange = ({target: {name, value}}) => setTodoValues({...todoValues, [name]: value})
//
//   const onCreate = () => {
//   //  onTodoCreate (from context)
//     onTodoCreate({ ...todoValues, id: uuidv4() });
//     setTodoValues({
//       title: '',
//       description: '',
//       id: null,
//     })
//   }
//
//   return (
//     <div>
//       <input value={todoValues.title} onChange={onTodoChange} type="text" name="title" placeholder="add title"/>
//       <br/>
//       <input value={todoValues.description} onChange={onTodoChange} type="text" name="description" placeholder="add description"/>
//       <br/>
//       <button onClick={onCreate}>add todo</button>
//     </div>
//   )
// }
//
// const Header = () => {
//   const {
//     todos,
//     doneTodosIds,
//     } = useContext(TodoContext);
//
//   return (
//     <header>
//       <Link to="/">list</Link>
//       <Link to="/create-todo">add new todo</Link>
//
//       {/*just as a spacer*/}
//       <div style={{flex: 1}}/>
//
//       <h3 style={{marginRight: 16}}>todos totals: {todos.length}</h3>
//       <h3 style={{marginRight: 16}}>active todos: {todos.length - doneTodosIds.length}</h3>
//       <h3 style={{marginRight: 16}}>done todos: {doneTodosIds.length}</h3>
//
//     </header>
//   )
// }
//
// const App = () => {
//   return (
//     <TodoContextProvider>
//       <main>
//         <Router>
//           <Header/>
//
//           <div style={{padding: 20}}>
//             <Switch>
//               <Route path="/" exact>
//                 <TodosList/>
//               </Route>
//
//               <Route path="/create-todo">
//                 <AddTodo/>
//               </Route>
//             </Switch>
//           </div>
//         </Router>
//       </main>
//     </TodoContextProvider>
//   )
// }
//
// export default App;

// 3. REACT HOOKS
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";

const fn = (a, b) => {
  console.log('called');
  return Math.pow(a, b)
};

const Child = memo(() => { // memorize components
  console.log('child rerender');
  return (<h2>Child Component</h2>)
})

const App = () => {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(2);
  const [counter3, setCounter3] = useState(0);

  const inc = () => {
    // setTimeout(() => { // clearly seen the difference in common & cb styles of setState using
      setCounter(counter + 1)
    // },1000); // setState => async Func (NOT A PROMISE). All of logic must put into the useEffect-hook
    // setCounter((prev) => prev + 1); // useState in cb style, use if value of new state depends on previous one
    console.log(counter);
  }

  // useEffect(() => {
  //   console.log(counter);
  // }, [counter])

  const inc2 = () => {
    setCounter2(prev => prev + 1);
  };

  const logic = useMemo(() => {
    return fn(4, counter2);
  }, [counter2]);

  // const logic = fn(4, 2); // fn called every time u change any state
  console.log(logic); // fn called only necessary deps is


  const inc3 = useCallback(() => { // memorize function
    console.log(counter3);
    setCounter3(counter3 + 1);
  },[counter3]); // [] always = 0, [...] = new ...


  return (
    <div>
      <button onClick={inc}>{counter}</button>
      <button onClick={inc2}>{counter2}</button>
      <button onClick={inc3}>{counter3}cb</button>

      {/*<Child/>*/}
      <Child inc={inc}/>
    </div>
  )
}

export default App;
