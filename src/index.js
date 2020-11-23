import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {createStore, Store} from 'redux';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';

import SearchPage from './components/SearchPage';

import songReducer from './reducers/SongReducer';

import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => <div className="container"><Link to="/search">Search</Link></div>
const DetailsPage = () => <div className="container">Details Page</div>

const store = createStore(songReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/details/:detailsId" component={DetailsPage} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();