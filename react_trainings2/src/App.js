import React from "react";
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
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/test">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/*<Route path="/" exact="true">*/}
          {/*  <Home />*/}
          {/*</Route>*/}
          <Route path="/" component={Home} exact/>

          <Route path="/about" render={(args) => {
            console.log(args);
            return <About/>
          }}/>

          {/*doesn't conduct props*/}
          <Route path="/users">
            <Users />
          </Route>

          <Route path="/test">
            {Users}
          </Route>

          {/*<Route>*/}
          {/*  <h2>PAGE'S NOT FOUND</h2>*/}
          {/*</Route>*/}

          <Route>
            <Redirect to="/"/>
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

function About(props) {
  // console.log(props)
  return <h2>About</h2>;
}

function Users(props) {
  console.log(props)
  return <h2>Users</h2>;
}
