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
// const HeaderComp.js = () => {
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
//           <HeaderComp.js/>
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
// import React, {memo, useCallback, useEffect, useMemo, useReducer, useState} from "react";
//
// const initialState = {
//   counter4: 0
// }
//
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'INC': return {
//       ...state,
//       counter4: state.counter4 + 1
//     }
//     case 'DEC': return {
//       ...state,
//       counter4: state.counter4 - 1
//     }
//     case 'RESET': return {
//       ...state,
//       counter4: 0
//     }
//     default: return state;
//   }
// }
//
// const fn = (a, b) => {
//   console.log('called');
//   return Math.pow(a, b)
// };
//
// const Child = memo(() => { // memorize components
//   console.log('child rerender');
//   return (<h2>Child Component</h2>)
// })
//
// const App = () => {
//   const [counter, setCounter] = useState(0);
//   const [counter2, setCounter2] = useState(2);
//   const [counter3, setCounter3] = useState(0);
//   const [state, dispatch] = useReducer(reducer, initialState);
//
//   const inc = () => {
//     // setTimeout(() => { // clearly seen the difference in common & cb styles of setState using
//       setCounter(counter + 1)
//     // },1000); // setState => async Func (NOT A PROMISE). All of logic must put into the useEffect-hook
//     // setCounter((prev) => prev + 1); // useState in cb style, use if value of new state depends on previous one
//     console.log(counter);
//   }
//
//   // useEffect(() => {
//   //   console.log(counter);
//   // }, [counter])
//
//   const inc2 = () => {
//     setCounter2(prev => prev + 1);
//   };
//
//   const logic = useMemo(() => {
//     return fn(4, counter2);
//   }, [counter2]);
//
//   // const logic = fn(4, 2); // fn called every time u change any state
//   console.log(logic); // fn called only necessary deps is
//
//
//   const inc3 = useCallback(() => { // memorize function
//     console.log(counter3);
//     setCounter3(prev => prev + 1);
//   },[]); // [] always = 0, [...] = new ...
//
//
//   return (
//     <div>
//       <button onClick={inc}>{counter}</button>
//       <button onClick={inc2}>{counter2}</button>
//       <button onClick={inc3}>{counter3}cb</button>
//       <hr/>
//       <button onClick={() => dispatch({type: 'INC' })}>useRed +</button>
//       <button onClick={() => dispatch({type: 'DEC' })}>useRed -</button>
//       <button onClick={() => dispatch({type: 'RESET' })}>useRed reset</button>
//       <h1>useReducer {state.counter4}</h1>
//
//       {/*<Child/>*/}
//       <Child inc={inc3}/>
//     </div>
//   )
// }
//
// export default App;

// 4. REDUX

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {dec, inc, random, reset,} from "./redux/action-creators";
import {Header, PhotosList, Products, ProductDetails} from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";


const App = () => {

  const counter = useSelector(({counterReducer: {counter}}) => {
    // console.log('counter', counter);// why twice?? & what launch the Fn? => The selector is called with the store state (=>doc)
    return counter;
  });

  const dispatch = useDispatch();

  return (
    <Router>
      <div>
        <Header/>
        <ul>
          <li>
            <Link to="/products">products</Link>
          </li>
          <li>
            <Link to='/wishlist'>wishlist</Link>
          </li>
          <li>
            <Link to='/cart'>cart</Link>
          </li>
          <li>
            <Link to='/trainings'>trainings</Link>
          </li>
        </ul>


        <Switch>
          <Route path='/' exact>
            <Redirect to='/products'/>
          </Route>

          <Route path='/products' exact>
            <Products/>
          </Route>

          <Route path='/products/:id'>
            <ProductDetails/>
          </Route>

          <Route path='/cart'>
            <div>cart</div>
          </Route>

          <Route path='/wishlist'>
            <div>wishlist</div>
          </Route>

          <Route path='/trainings'>
            <div>
              <h1>Rest Trainings</h1>
              <h2>{counter}</h2>
              <button onClick={() => dispatch(random(Math.random()))}>random</button>
              <button onClick={() => dispatch(inc())}>+</button>
              <button onClick={() => dispatch(dec())}>-</button>
              <button onClick={() => dispatch(reset())}>reset</button>

              {!!(counter % 2) && <PhotosList/>}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
