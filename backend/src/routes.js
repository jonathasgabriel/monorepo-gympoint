import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentLogInController from './app/controllers/StudentLogInController';

import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/checkid', StudentLogInController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', StudentHelpOrderController.index);
routes.post('/students/:id/help-orders', StudentHelpOrderController.store);

// Auth middleware will be applied to below declared routes
routes.use(authMiddleware);

routes.get('/students/:id', StudentController.show);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans/:id', PlanController.show);
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments/:id', EnrollmentController.show);
routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', GymHelpOrderController.index);
routes.put('/help-orders/:id/answer', GymHelpOrderController.update);

export default routes;
