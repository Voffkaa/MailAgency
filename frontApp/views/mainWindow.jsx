'use strict';

import '../css/bootstrap.css';

import React from 'react';

import * as auth from '../actions/auth.js';

var MainWindow = React.createClass({

    logout: function() {
        auth.logout();
    },

    render: function() {
      return (
          <nav className='navbar navbar-inverse navbar-fixed-top'>
              <div className='container'>
                  <div className='navbar-header'>
                      <a className='navbar-brand' href='/'>Mail Agency</a>
                  </div>
                  <div className='navbar-right'>
                      <button className='btn' onClick={this.logout}>Log out</button>
                  </div>
              </div>
          </nav>
      );
    }
});

React.render(<MainWindow />, document.body);
