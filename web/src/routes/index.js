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

      <Route path="/registrations" component={Registrations} isPrivate />
      <Route
        path="/create-registrantion"
        component={RegistrationCrUp}
        isPrivate
      />
      <Route
        path="/update-registration/:id"
        component={RegistrationCrUp}
        isPrivate
      />

      <Route path="/help" component={HelpOrders} isPrivate />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/update-student/:id" component={StudentCrUp} isPrivate />
      <Route path="/create-student" component={StudentCrUp} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/update-plan/:id" exact component={PlanCrUp} isPrivate />
      <Route path="/create-plan" exact component={PlanCrUp} isPrivate />
    </Switch>
  );
}
