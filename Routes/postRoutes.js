// express server
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Post } = require("../models/post");

const moment = require("moment");
const { getDistance, convertDistance } = require("geolib");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/", (req, res) => {
  Post.find({ completed: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(transaction);
      }
    });
});

router.post("/", (req, res) => {
  Post.create({
    author: req.body.user,
    reimbursement: req.body.post.reimbursement,
    description: req.body.post.description,
    time: moment(),
    items: req.body.post.items,
    location: req.body.post.location,
    completed: false,
  })
    .then((post) => {
      Post.find({ completed: false })
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
});


router.get("/:id", (req, res) => {
  const currentUser = req.params._id;
  const userLocation = req.body.currLocation;
  const distance = req.body.distance;
  const reimbursement = req.body.reimbursement;
  const size = req.body.size;

  Post.find({ completed: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const paymentFilter = transaction.filter((post) => post.reimbursement === reimbursement);
        const sizeFilter = paymentFilter.filter((post) => sizeEstimate(post) === size);
        // console.log(sizeFilter);
        // sizeFilter.forEach((post) => console.log(userLocation.location.lat));
        const distFilter = sizeFilter.filter((post) => {
          return (
            convertDistance(
              getDistance(
                {
                  latitude: userLocation.lat,
                  longitude: userLocation.lng
                },
                {
                  latitude: post.location.lat,
                  longitude: post.location.lng
                }
              ), "km"
            ) < Number(distance)
          );
        });
        res.json(distFilter)
      }
    });

});

const sizeEstimate = (post) => {
  let size = null;
  if (post.items.length <= 3) {
    size = "Small";
  } else if (post.items.length <= 8) {
    size = "Medium";
  } else {
    size = "Large";
  }
  return size;
};


/* Route to edit a post
   Returns the updated post

   TODO: Everything
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
              Post.find({ completed: false })
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

/* Route to delete a post
   Returns the deleted post

   TODO: Everything
*/
router.delete("/", (req, res) => {
  User.findById(req.body.user)
    .then((user) => {
      if (!user) {
        res.sendStatus(404);
      } else {
        Post.findById(req.body.post).then((post) => {
          if (!post) {
            res.sendStatus(404);
          } else {
            if (user.admin || post.author.toString() === req.body.user) {
              Post.findByIdAndDelete(req.body.post).then((post) => {
                Post.find({ completed: false })
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
});

router.put("/accept/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      User.findById(req.body.user).then((user) => {
        if (user) {
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
        } else {
          res.sendStatus(404);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
});

router.put("/complete/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      post.completed = true;
      post.save().then((savedPost) => {
        User.findById(req.body.user).then((user) => {
          if (user) {
            user.active_post = null;
            user.save().then((savedUser) => {
              Post.find({ completed: false })
                .populate("author")
                .exec((err, transaction) => {
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.json({ currentUser: savedUser, posts: transaction });
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
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;

  Post.find({ author: id })
  .then((posts) => {
    console.log(posts.length)
    res.json(posts.length);
  })
  .catch((error) => {
    res.sendStatus(404);
  })
})

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