import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find()
    .then(posts => {
      res.json(cleanPosts(posts));
    })
    .catch(error => {
      res.json({ error });
    });
};
// Clean post or cleanposts?
// export const getPost = (req, res) => {
//   Post.findById(req.params.id)
//   then (post => {
//     res.json(cleanPosts(post));
//   });
// };

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
  .then(() => {
    res.json({ message: 'Post deleted!' });
  })
  .catch(error => {
    res.json({ error });
  });
};


export const updatePost = (req, res) => {
  // Post.findOneAndUpdate() (_id: , { title: req.body.title etc. })
  .then(() => {
    res.json({ message: 'Post updated!' });
  })
  .catch(error => {
    res.json({ error });
  });

};

// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};
