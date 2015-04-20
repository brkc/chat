'use strict';

module.exports = function(app, io, db) {
  app.get('/', function(req, res) {
    db.Post.all({order: 'id DESC'}).then(function(posts) {
      res.render('index', {
        posts: posts.map(function(post) {
          return post.get();
        })
      });
    });
  });

  app.post('/', function(req, res) {
    if (!req.body.message) {
      res.sendStatus(400);
      return;
    }

    db.Post.create({
      message: req.body.message,
    }).then(function(post) {
      res.sendStatus(200);
      io.emit('add', req.body.message);
    });
  });
};
