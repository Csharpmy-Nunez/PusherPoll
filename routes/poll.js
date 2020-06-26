const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');


const Pusher = require('pusher');

const keys = require('../config/keys');

var pusher = new Pusher({
  appId: keys.pusherAppId,
  key: keys.pusherKey,
  secret: keys.pusherSecret,
  cluster: keys.pusherCluster,
  encrypted: keys.pusherEncrypted
});


router.get('/', (req, res) => {
  Vote.find().then(votes => {res.json({success: true, votes: votes})});
});



router.post('/', (req, res) => {
  //Save to database
  const newVote = {
    os: req.body.os,
    points: 1
  }

  //Create new Vote and save
  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
   });

   return res.json({success: true, message: "Thank you for voting"});
  });
});

module.exports = router;