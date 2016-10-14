import User from '../models/user';
import serverConfig from '../config';
import jwt from 'jwt-simple';
import { sha512 } from '../util/security';

export function signIn(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(403).end();
  } else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.status(401).end();
        } else {
          let password = sha512(req.body.password, user.password_salt);
          if (password === user.password) {
            let token = jwt.encode({ sub: user.cuid }, serverConfig.JWT_TOKEN);
            res.json({ token: token, admin: user.isAdmin });
          } else {
            res.status(401).end();
          }
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}
