import React from 'react';
import { Switch } from 'react-router-dom';

import LegislacaoNovo from 'pages/Legislacao/Cadastrar';
import Home from '../pages/Home';
import Route from './Route';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" component={Home} isPrivate />
      <Route path="/legislacaonovo" component={LegislacaoNovo} isPrivate />
    </Switch>
  );
};

export default Routes;
