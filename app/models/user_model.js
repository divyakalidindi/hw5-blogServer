import bcrypt from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function beforeYourModelSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
)};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
