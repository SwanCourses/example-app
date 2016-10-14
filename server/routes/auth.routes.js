import * as AuthController from '../controllers/auth.controller';

export default function (router, protectedMiddleware) {
  router.post('/auth', AuthController.signIn);
  return router;
};
