import React , { Component } from 'react';
import Content from './components/Content'
import Login from './components/Login'
import Register from './components/Register'
import Edocument from './components/EdocuMent'
import NotFound from './components/NotFound'
import { HashRouter, Switch, Route } from 'react-router-dom';
import { auth } from "./config/firebase";

export default class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render(){
    return (
      <div className="App">
        <HashRouter basename='/'>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/home' component={Content} />
            <Route exact path='/edocument' component={Edocument} />
            <Route exact component={NotFound} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
  
}

