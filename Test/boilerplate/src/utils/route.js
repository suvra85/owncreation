import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '@/views/Layout';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Landing from '@/views/Landing';
import Dashboard from '@/views/dashboard';


export const childRoutes = [
  {
    'path':'/dashboard',
    'component': Dashboard,
    'exactly': true
  },
  {
    'path':'/landing',
    'component': Landing,
    'exactly': true
  } 
  
];

const routes = (
  <Switch>
   <Route path="/login" component={Login}></Route>
   <Route path="/register" component={Register}></Route>
   <Route path="/" component={Layout}></Route>
  </Switch>
);

export default routes
