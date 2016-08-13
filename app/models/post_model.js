import mongoose, { Schema } from 'mongoose';

// create a schema for posts with a field
const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  tags: String,
  content: String,
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
