import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import HelpOrders from '~/pages/HelpOrders';

import Students from '~/pages/Students';
import StudentCrUp from '~/pages/StudentCrUp';

import Plans from '~/pages/Plans';
import PlanCrUp from '~/pages/PlanCrUp';

import Registrations from '~/pages/Registrations';
import RegistrationCrUp from '~/pages/RegistrationCrUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/create"
        component={RegistrationCrUp}
        isPrivate
      />
      <Route
        path="/registrations/update/:id"
        component={RegistrationCrUp}
        isPrivate
      />

      <Route path="/help" component={HelpOrders} isPrivate />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/update/:id" component={StudentCrUp} isPrivate />
      <Route path="/students/create" component={StudentCrUp} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/update/:id" component={PlanCrUp} isPrivate />
      <Route path="/plans/create" component={PlanCrUp} isPrivate />
    </Switch>
  );
}
