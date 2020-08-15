// express server
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Post } = require("../models/post");

const moment = require("moment");
const { getDistance, convertDistance } = require("geolib");

const bodyParser = require("body-parser");
const user = require("../models/user");
router.use(bodyParser.json());

router.get("/", (req, res) => {
  Post.find({ completed: false, active: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(transaction);
      }
    });
});

/*
  POST request to create a new post. Only logged in users can
  create a new post.

  BODY:
  {
    "author": <id of the user creating the post>,
    "reimbursement": <reimburesement type> ("Cash", "E-transfer" or "Cheque"),
    "description": <description of post>,
    "items": [<Item Objects>],
    "location": <Location object from Google API>

  }
*/
router.post("/", (req, res) => {
  const curr_user = req.session.user;
  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById(curr_user)
      .then((user) => {
        if (curr_user !== req.body.user) {
          res.sendStatus(401);
        } else {
          Post.create({
            author: req.body.user,
            reimbursement: req.body.post.reimbursement,
            description: req.body.post.description,
            time: moment(),
            items: req.body.post.items,
            location: req.body.post.location,
            completed: false,
            active: false,
          })
            .then((post) => {
              Post.find({ completed: false, active: false })
                .populate("author")
                .exec((err, transaction) => {
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.json(transaction);
                  }
                });
            })
            .catch((e) => {
              res.sendStatus(500);
            });
        }
      })
      .catch((error) => {
        res.sendStatus(401);
      });
  }
});

/* 
    
  PUT route to make edits to existing posts. Only allow authors
  of posts to make edits. 

  BODY:
  {
    "reimbursement": <Cash, E-transfer or Cheque>,
    "description": <Description of the post>,
    "items": <[Item objects]>,
    "user": "The current users's id"
  }
  
  ON SUCCESS:
  Edits the given post

*/
router.put("/:id", (req, res) => {
  User.findById(req.body.user)
    .then((user) => {
      Post.findById(req.params.id).then((post) => {
        if (!post) {
          res.sendStatus(404);
        } else {
          if (post.author.toString() === req.body.user) {
            post.description = req.body.post.description;
            post.items = req.body.post.items;
            post.reimbursement = req.body.post.reimbursement;
            post.save().then((p) => {
              Post.find({ completed: false, active: false })
                .populate("author")
                .exec((err, transaction) => {
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.json(transaction);
                  }
                });
            });
          } else {
            res.sendStatus(400);
          }
        }
      });
    })
    .catch((e) => {
      res.sendStatus(500);
    });
});

const sizeEstimate = (post) => {
  let size = null;
  if (post.items.length <= 3) {
    size = "small";
  } else if (post.items.length <= 8) {
    size = "medium";
  } else {
    size = "large";
  }
  return size;
};


/* 
  
  DELETE route to delete a post. Only authors of posts and admins can
  delete posts.

  BODY:
  {
   "post": <ID of the post to be deleted>,
   "currentUserID": <ID of user deleting the post> 
  }

  ON SUCCESS:
  Delete the request and return all incomplete and non-active
  posts.

*/
router.delete("/", (req, res) => {
  const curr_user = req.session.user;

  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById(curr_user)
      .then((u) => {
        if (!u.admin && u.id !== currentUserID) {
          res.sendStatus(401);
        } else {
          User.findById(req.body.user)
            .then((user) => {
              if (!user) {
                res.sendStatus(404);
              } else {
                Post.findById(req.body.post).then((post) => {
                  if (!post) {
                    res.sendStatus(404);
                  } else {
                    if (
                      user.admin ||
                      post.author.toString() === req.body.user
                    ) {
                      Post.findByIdAndDelete(req.body.post).then((post) => {
                        Post.find({ completed: false, active: false })
                          .populate("author")
                          .exec((err, transaction) => {
                            if (err) {
                              res.sendStatus(500);
                            } else {
                              res.json(transaction);
                            }
                          });
                      });
                    } else {
                      res.sendStatus(400);
                    }
                  }
                });
              }
            })
            .catch((e) => {
              res.sendStatus(500);
            });
        }
      })
      .catch((error) => {
        res.sendStatus(401);
      });
  }
});

/*
  PUT request to accept a user post. Only logged in users can
  accept posts.

  BODY:
  {
    "user": <ID of the user accepting the post>
  }

  PARAMS: id -> id of the post being accepted
*/

router.put("/accept/:id", (req, res) => {
  const curr_user = req.session.user;

  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById(curr_user)
      .then((u) => {
        if (u) {
          Post.findById(req.params.id).then((post) => {
            if (post) {
              User.findById(req.body.user).then((user) => {
                if (user) {
                  post.active = true;
                  post.save().then((post) => {
                    user.active_post = post._id;
                    user.save().then((savedUser) => {
                      User.findById(savedUser._id)
                        .populate({
                          path: "active_post",
                          model: "Post",
                          populate: { path: "author", model: "User" },
                        })
                        .exec((err, transaction) => {
                          if (err) {
                            res.sendStatus(500);
                          } else {
                            res.json({ currentUser: transaction });
                          }
                        });
                    });
                  });
                } else {
                  res.sendStatus(404);
                }
              });
            } else {
              res.sendStatus(404);
            }
          });
        } else {
          res.sendStatus(400);
        }
      })
      .catch((error) => {
        res.sendStatus(400);
      });
  }
});


/*
  PUT request to complete a user post. Only logged in users can
  complete posts.

  BODY:
  {
    "user": <ID of the user completing the post>
  }

  PARAMS: id -> id of the post being completed
*/

router.put("/complete/:id", (req, res) => {
  const curr_user = req.session.user;

  if (!curr_user) {
    req.sendStatus(401);
  } else {
    User.findById(curr_user).then((u) => {
      if (u) {
        Post.findById(req.params.id).then((post) => {
          if (post) {
            post.completed = true;
            post.active = false;
            post.save().then((savedPost) => {
              User.findById(req.body.user).then((user) => {
                if (user) {
                  user.active_post = null;
                  user.save().then((savedUser) => {
                    Post.find({ completed: false, active: false })
                      .populate("author")
                      .exec((err, transaction) => {
                        if (err) {
                          res.sendStatus(500);
                        } else {
                          res.json({
                            currentUser: savedUser,
                            posts: transaction,
                          });
                        }
                      });
                  });
                } else {
                  res.sendStatus(404);
                }
              });
            });
          } else {
            res.sendStatus(404);
          }
        });
      } else {
        res.sendStatus(400);
      }
    });
  }
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;

  Post.find({ author: id })
    .then((posts) => {
      res.json(posts.length);
    })
    .catch((error) => {
      res.sendStatus(404);
    });
});

router.get('/completed', (req, res) => {
  Post.find({ completed: true })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(transaction);
      }
    });
})

router.get('/pending', (req, res) => {
  Post.find({ completed: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log(transaction)
        res.json(transaction);
      }
    });
})



module.exports = router;
