const Bill = require('../models/Bill');
const fs = require('fs');

exports.createBill = (req, res, next) => {
    const billObject = req.body
    delete billObject._id;
    delete billObject._userId;
    if (req.file) {
      const bill = new Bill({
        ...billObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
      });
      bill.save()
        .then(() => res.status(201).json({message: "bill saved"}))
        .catch(error => res.status(400).json({error}));
    }else{
      const bill = new Bill({
        ...billObject,
        userId: req.auth.userId,
        likes: 0,
        dislikes: 0,
      });
      bill.save()
        .then(() => res.status(201).json({message: "bill saved"}))
        .catch(error => res.status(400).json({error}));
    }
}

exports.getAllBill = (req, res, next) => {
    Bill.find().sort({creationTimeStamp: -1})
      .then((bills) => {
        res.status(200).json(bills)
      })
      .catch(error => res.status(400).json({error}))
}

exports.getOneBill = (req, res, next) => {
  Bill.findOne({ _id: req.params.id} )
    .then(bill => res.status(200).json(bill))
    .catch(error => res.status(400).json({error}))
}


exports.modifyBill = (req, res, next) => {
    var updateBill = (Bill, params) => {
      Bill.updateOne(
        { _id: req.params.id }, params)
        .then(modBill => res.status(200).json({message: "bill updated",modBill}))
        .catch(error => res.status(400).json({error}))
    };
    if (req.file) {  
      Bill.findOne({ _id: req.params.id })
        .then(bill => {
          const filename = bill.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            let params = {
              ...req.body, 
              userId: req.auth.userId,
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
              _id: req.params.id
            }
            updateBill(Bill, params)           
          });
        })
        .catch(error => res.status(400).json({error}))
    }else{
      let params= { 
        ...req.body, 
        userId: req.auth.userId,
        _id: req.params.id
      }
      updateBill(Bill, params)
    }
}



exports.deleteBill = (req, res, next) => {
  Bill.findOne({ _id: req.params.id })
    .then(bill => {
      if (bill.userId === req.auth.userId || req.auth.userId == "6329c34059bcae873c79b880") {
        if(bill.imageUrl){
          const filename = bill.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Bill.deleteOne({_id: req.params.id})
              .then(() => { res.status(200).json({message: "bill deleted"})})
              .catch(error => res.status(401).json({error}));
          });
        }else{
          Bill.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: "bill deleted"})})
            .catch(error => res.status(401).json({error}));
        }
      }else{
        res.status(401).json({message: "not authorized"});
      };
    })
}

exports.likeBill = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  Bill.findOne({_id: req.params.id})
      .then((bill) => {
        if (userId != req.auth.userId) {
          res.status(401).json({message: "not authorized"});
        }else{
          const userLiked = bill.usersLiked.findIndex(user => user == userId);
          const userDisliked = bill.usersDisliked.findIndex(user => user == userId);
          if (userLiked == -1 && userDisliked == -1) {
            if (like > 0) {
              bill.usersLiked.push(userId);
            }
            if (like < 0) {
              bill.usersDisliked.push(userId);
            }
            bill.likes = bill.usersLiked.length;
            bill.dislikes = bill.usersDisliked.length;
            bill.save()
              .then(() => { res.status(201).json({message: 'bill like/unlike saved'})})
              .catch(error => { res.status(400).json( { error })})
          }
          if (userLiked != -1 && userDisliked == -1) {
            if (like > 0) {
              res.status(400).json({message: 'cannot relike a bill'})
            }
            if (like < 0) {
              bill.usersLiked.splice(userLiked, 1)
              bill.usersDisliked.push(userId)
            }
          if (like == 0) {
            bill.usersLiked.splice(userLiked, 1)
            }
            bill.likes = bill.usersLiked.length;
            bill.dislikes = bill.usersDisliked.length;
            bill.save()
              .then(() => { res.status(201).json({message: 'bill saved'})})
              .catch(error => { res.status(400).json( { error })})
          }
          if (userLiked == -1 && userDisliked != -1) {
            if (like > 0) {
              bill.usersDisliked.splice(userDisliked, 1)
              bill.usersLiked.push(userId)
            }
            if (like < 0) {
              res.status(400).json({message: 'cannot redislike a bill'})
            }
            if (like == 0) {
              bill.usersDisliked.splice(userDisliked, 1)
            }
            bill.likes = bill.usersLiked.length;
            bill.dislikes = bill.usersDisliked.length;
            bill.save()
              .then(() => { res.status(201).json({message: 'bill unlike saved'})})
              .catch(error => { res.status(400).json( { error })})
          }
        }
      })
      .catch( error => {
        res.status(500).json({ error });
      });
};