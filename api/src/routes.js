import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrdersController from './app/controllers/HelpOrdersController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

/** CHECK-INS */
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

/** Help Orders */
routes.get('/students/:stud_id/help-orders', HelpOrdersController.index);
routes.post('/students/:stud_id/help-orders', HelpOrdersController.store);

routes.use(authMiddleware);

routes.get('/students/:stude_id', StudentController.show);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:stud_id', StudentController.update);
routes.delete('/students/:stud_id', StudentController.delete);

routes.get('/plans/:plan_id', PlanController.show);
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:plan_id', PlanController.update);
routes.delete('/plans/:plan_id', PlanController.delete);

routes.get('/registrations/:regis_id', RegistrationController.show);
routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:regis_id', RegistrationController.update);
routes.delete('/registrations/:regis_id', RegistrationController.delete);

/** Aswer Help Orders */
routes.get('/help-orders', AnswerController.index);
routes.post('/help-orders/:help_id/answer', AnswerController.store);

export default routes;
