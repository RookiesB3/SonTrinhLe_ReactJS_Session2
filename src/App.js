import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Home from './components/Home';
import Posts from './components/Posts';
import Login from './components/Login';
import Profile from './components/Profile';
import PostDetail from './components/PostDetail';
import { useState, useCallback, useEffect } from 'react';

function App() {
  const [account, setAccount] = useState({
    token: localStorage.getItem('TOKEN'),
    userId: localStorage.getItem('USERID')
  })

  useEffect(() => {
    if(account.token !== ""){
      localStorage.setItem('TOKEN', account.token);
      localStorage.setItem('USERID', account.userId);
    }
  }, [account]);

  const wrapperSetAccount = useCallback(val => {
    setAccount({
      token: val.token,
      userId: val.userId
    });
  }, [setAccount]);

  console.log(account)
  return (
    <div className="App" style={{ margin: "10px", marginTop: "20px" }}>
      <div>
        <Router>
          <ul>
            <li key="home">
              <Link to="/">Home</Link>
            </li>
            <li key="posts">
              <Link to="/posts">Posts</Link>
            </li>
            <li key="profile">
              <Link to="/profile">Profile</Link>
            </li>
            {
              account.token === "" ?
                (
                  <li key="login">
                    <Link to="/login">Login</Link>
                  </li>
                ) : (
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => {
                    setAccount({
                      token: "",
                      userId: ""
                    })
                  }}>Logout</button>
                )
            }
          </ul>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/posts">
              <Posts/>
            </Route>
            <Route path="/login">
              <Login account={account} wrapper={wrapperSetAccount} />
            </Route>
            <Route path="/profile" render={() => 
                account.token === "" ? (
                  <div>
                    <p>You need to login to continue</p>
                    <Login account={account} wrapper={wrapperSetAccount} />
                  </div>
                ) : (
                  <Profile account={account} />
                )
            }/>
            <Route exact path="/posts/:id">
              <PostDetail/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}


export default App;
