var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/candidates', function(req, res, next) {
  Comment.find(function(err, candidates){
    if(err){ return next(err); }
    res.json(candidates);
  });
});

router.post('/candidates', function(req, res, next) {
  var candidate = new Comment(req.body);
  candidate.save(function(err, candidate){
    if(err){ return next(err); }
    res.json(candidate);
  });
});

router.param('candidate', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
    return next();
  });
});
router.get('/candidates/:candidate', function(req, res) {
  res.json(req.candidate);
});
router.put('/candidates/:candidate/upvote', function(req, res, next) {
  req.candidate.upvote(function(err, candidate){
    if (err) { return next(err); }
    res.json(candidate);
  });
});
router.delete('/candidates/:candidate', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.sendStatus(200);
});

module.exports = router;
