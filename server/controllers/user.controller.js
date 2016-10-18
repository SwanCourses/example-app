import User from '../models/user';
import cuid from 'cuid';
import serverConfig from '../config';
import jwt from 'jwt-simple';
import { generateRandomToken, sha512 } from '../util/security';

export function create(req, res) {
  if (!req.body.user.email || !req.body.user.password) {
    res.status(403).end();
  } else {
    let newUser = new User(req.body.user);
    newUser.cuid = cuid();
    newUser.password_salt = generateRandomToken();
    newUser.password = sha512(newUser.password, newUser.password_salt);

    let payload = { sub: newUser.cuid };

    User.findOne({ email: newUser.email })
      .then((emailUser) => {
        if (emailUser) {
          res.status(403).end();
        } else {
          return newUser.save();
        }
      })
      .then(user => {
        let token = jwt.encode(payload, serverConfig.JWT_TOKEN);
        res.json({ token: token, admin: false });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}
