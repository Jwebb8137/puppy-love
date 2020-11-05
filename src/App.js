import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import config from './config';
import '@progress/kendo-theme-material/dist/all.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import SignUp from './components/Signup/Signup';
import SignIn from './components/Signin/Signin';
import Dashboard from './components/Dashboard/Dashboard';
import ResultsList from './components/ResultsList/ResultsList';
import ProfileFull from './components/ProfileFull/ProfileFull';
import Footer from './components/Footer/Footer';
import Chat from './components/ChatApp/Chat';
import ChatList from './components/ChatApp/ChatList';
import '@progress/kendo-theme-material/dist/all.css';

function App() {

  const { API_ENDPOINT } = config;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    console.log = console.warn = console.error = () => {};
    try {
      const response = await fetch(`${API_ENDPOINT}/api/is-verified`, {
        method: "GET",
        headers: { token : localStorage.token }
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Route path={["/signup","/signin","/results","/"]} render={props => 
          <Navbar {...props} setAuth={setAuth} isAuth={isAuthenticated}/>
        }/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" 
          render={props => 
            !isAuthenticated ? (
              <SignUp {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route 
          exact path="/signin" 
          render={props => 
            !isAuthenticated ? (
              <SignIn {...props} setAuth={setAuth}/>
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route 
          exact path="/browse" 
          render={props => 
            <ResultsList {...props} setAuth={setAuth} isAuth={isAuthenticated}/>          
          }
        />
        <Route exact path="/chatlist/:user" 
          render={props => 
            isAuthenticated ? (
              <ChatList {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route exact path="/dashboard" 
          render={props => 
            isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        {/* <Route path="/browse" component={ResultsList}/> */}
        <Route path="/user/:userid" component={ProfileFull}/>
        <Route exact path="/chat/:userid" component={Chat}/>
        <Route path={["/signup","/signin","/results","/"]} component={Footer}/>
      </div>
    </BrowserRouter>
  );  
}

export default App;
