import React, {Component} from 'react';
import './App.css';
// import Header from './Header'
import {Route, Switch} from 'react-router-dom'
import RecipeContainer from './RecipeContainer'
import Register from './Register'
import Login from './Login'
import FrontPage from './FrontPage';
import User from './UserContainer';


const My404 = () => {
  return(
    <div>
      'Sorry the page you requested was not found'
    </div>
  )
}

class App extends Component{

  constructor()
  {
    super()
    this.state =
    {
      //nothing here yet
    }
  }

  handleLogin = (currentUser) =>
  {
    console.log("handleLogin in App.js: " + currentUser);
    
    this.setState(
      {
        currentUser: currentUser
      });
    console.log("this.state.currentUser from App.js: ",this.state.currentUser)
  }

  render()
  {
    return (
      <div className="App">
        {/* <Header/> */}
          <Switch>
              <Route exact path='/' component={FrontPage}/>
              <Route exact path='/register' render={routeProps => <Register {...routeProps} handleLogin={this.handleLogin}/>}/>
              <Route exact path='/recipe' render={routeProps => <RecipeContainer {...routeProps} currentUser={this.state.currentUser}/>} /> {/*handleLogin={this.handleLogin}*/}
              <Route exact path='/login' render={routeProps => <Login {...routeProps} handleLogin={this.handleLogin}/>}/>
              <Route exact path='/user' render={routeProps => <User {...routeProps} handleLogin={this.handleLogin}  currentUser={this.state.currentUser}/>}/>
              <Route component = {My404}/>
          </Switch>
      </div>
    );
  }
}

export default App;
