import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory,
  useParams, useRouteMatch
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/*<li>*/}
            {/*  <Link to="/about">About</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link to="/users">Users</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link to="/test">Test</Link>*/}
            {/*</li>*/}
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            {/*<li>*/}
            {/*  <Link to="/posts/:id">PostDetails</Link>*/}
            {/*</li>*/}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/*different ways to render*/}
          {/*<Route path="/" exact="true">*/}
          {/*  <Home />*/}
          {/*</Route>*/}
          {/*<Route path="/about" render={(args) => {*/}
          {/*  console.log(args);*/}
          {/*  return <About/>*/}
          {/*}}/>*/}
          {/*doesn't conduct props*/}
          {/*<Route path="/users">*/}
          {/*  <Users />*/}
          {/*</Route>*/}
          {/*<Route path="/test">*/}
          {/*  {Test}*/}
          {/*</Route>*/}
          {/*<Route>*/}
          {/*  <Redirect to="/"/>*/}
          {/*</Route>*/}

          <Route path="/" component={Home} exact/>

          <Route path="/posts" exact>
            <Posts/>
          </Route>

          <Route path="/posts/:id" component={PostDetails}/>

          <Route>
            <h2>PAGE'S NOT FOUND</h2>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  return <h2>Home</h2>;
}

function Posts(props) {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts/';

    const rawData = await fetch(baseUrl);
    const jsonData = await rawData.json();

    await setPosts(jsonData);
    console.log(posts)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((el) => <Link to={`/posts/${el.id}`}><li>{el.id} - {el.title}</li></Link>)}
      </ul>
    </div>
  );
}

const PostDetails = (props) => {
  console.log(props);
  const [post, setPost] = useState([]);

  const { id } = useParams();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory(); // or
  // const { history } = props; // ...if starting route conducts props...
  // console.log({params, match, location, history});

  const fetchData = async () => {
    const baseUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;

    const rawData = await fetch(baseUrl);
    const jsonData = await rawData.json();

    setPost(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

    return (
        <div>
          {post && (
            <>
              <h1>Post Details:</h1>
              <h3>{post.title}</h3>
              <p>{post.body}</p>


              <button onClick={() => history.push(`/posts/${+id+1}`)}>go to the next</button>
              <button onClick={() => history.push(`/posts/${+id+1}`)}>go to the next</button>
            </>
          )}
        </div>
    )
}

