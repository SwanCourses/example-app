import * as UserController from '../controllers/user.controller';

export default function (router, protectedMiddleware) {
  router.post('/users/registration', UserController.create);
  return router;
};
