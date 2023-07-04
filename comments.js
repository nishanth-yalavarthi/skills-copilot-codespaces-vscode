// Create web server
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create express app
const app = express();
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create routes
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  // Create comment id
  const commentId = randomBytes(4).toString('hex');

  // Get comment object from request body
  const { content } = req.body;

  // Get comments array for post id
  const comments = commentsByPostId[req.params.id] || [];

  // Push new comment to comments array
  comments.push({ id: commentId, content });

  // Set comments array for post id
  commentsByPostId[req.params.id] = comments;

  // Send back created comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});