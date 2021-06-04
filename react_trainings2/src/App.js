import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
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

          <Route path="/posts">
            <Posts/>
          </Route>

          <Route>
            <h2>PAGE'S NOT FOUND</h2>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  console.log(props)
  return <h2>Home</h2>;
}

function Posts(props) {
  console.log(props)
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts/';

    const rawData = await fetch(baseUrl);
    const jsonData = await rawData.json();

    setPosts(jsonData);
    console.log(posts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((el) => <li>{el.id} - {el.title}</li>)}
      </ul>
    </div>
  );
}

