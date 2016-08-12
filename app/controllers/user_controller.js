import jwt from 'jwt-simple';
import config from '../../config.js';
import User from '../models/user_model.js';


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  User.findOne({ email })
  .then(result => {
    return res.status(422).send('That email is already taken!');
  });
  const newUser = new User();
  newUser.email = email;
  newUser.password = password;
  newUser.save();
  res.send({ token: tokenForUser(newUser) });
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
