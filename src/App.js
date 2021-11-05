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
    if (account.token !== "") {
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
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">Posts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                {
                  account.token === "" ?
                    (
                      <li key="login">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                    ) : (
                      <li key="login">
                        <button className="btn btn-outline-secondary btn-sm" 
                                style={{marginTop: "5px"}}
                                onClick={() => {
                          setAccount({
                            token: "",
                            userId: ""
                          })
                        }}>Logout</button>
                      </li>
      
                    )
                }
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/posts">
              <Posts />
            </Route>
            <Route path="/login">
              <Login account={account} wrapper={wrapperSetAccount} />
            </Route>
            <Route path="/profile" render={() =>
              account.token === "" ? (
                <div>
                  <p className="d-flex justify-content-center" style={{marginTop: "5em"}}>
                    You need to login to continue
                  </p>
                  <Login account={account} wrapper={wrapperSetAccount} />
                </div>
              ) : (
                <Profile account={account} />
              )
            } />
            <Route exact path="/posts/:id">
              <PostDetail />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}


export default App;
