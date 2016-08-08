import Post from '../models/post_model';

export const createPost = (req, res) => {
  console.log('new');
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

// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

const cleanAPost = (post) => {
  return { id: post._id, title: post.title, tags: post.tags };
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

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    res.json(cleanAPost(post));
  });
};

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
  console.log('update');
  Post.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, tags: req.body.tags, content: req.body.content })
  .then(() => {
    res.json({ message: 'Post updated!' });
  })
  .catch(error => {
    res.json({ error });
  });
};
