import jwt from 'jwt-simple';
import User from '../models/user_model.js';
import dotenv from 'dotenv';

dotenv.config({ silent: true });
// import config from '../../config';

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
  const user = new User();
  user.email = email;
  user.password = password;
  user.save();
  res.send({ token: tokenForUser(user) });
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.API_SECRET);
}