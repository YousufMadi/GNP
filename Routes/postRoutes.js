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

router.post("/", (req, res) => {
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
});

router.put("/filter", (req, res) => {
  const userLocation = req.body.currLocation;
  const distance = req.body.distance;
  const reimbursement = req.body.reimbursement;
  const size = req.body.size;

  Post.find({ completed: false, active: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        let filteredPosts = transaction;
        // Filter by payment
        if (reimbursement !== null && reimbursement !== "any") {
          filteredPosts = filteredPosts.filter((post) => {
            return reimbursement === post.reimbursement.toLowerCase();
          });
        }
        // Filter by size
        if (size !== null && size !== "any") {
          filteredPosts = filteredPosts.filter((post) => {
            return sizeEstimate(post) === size;
          });
        }
        // Filter by distance
        if (
          distance !== null &&
          distance !== "any" &&
          userLocation &&
          userLocation.latitude &&
          userLocation.longitude
        ) {
          let filterValue = null;
          if (distance === "1") {
            filterValue = 1;
          } else if (distance === "5") {
            filterValue = 5;
          } else if (distance === "20") {
            filterValue = 20;
          } else if (distance === "21") {
            filterValue = 40075;
          }
          filteredPosts = filteredPosts.filter((post) => {
            return (
              convertDistance(
                getDistance(
                  {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                  },
                  {
                    latitude: post.location.lat,
                    longitude: post.location.lng,
                  }
                ),
                "km"
              ) < filterValue
            );
          });
        }
        res.json(filteredPosts);
      }
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
});

router.put("/accept/:id", (req, res) => {
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
});

router.put("/complete/:id", (req, res) => {
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
      res.json(posts.length);
    })
    .catch((error) => {
      res.sendStatus(404);
    });
});

router.get("/completed", (req, res) => {
  Post.find({ completed: true })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(transaction);
      }
    });
});

router.get("/pending", (req, res) => {
  Post.find({ completed: false })
    .populate("author")
    .exec((err, transaction) => {
      if (err) {
        res.sendStatus(500);
      } else {
        console.log(transaction);
        res.json(transaction);
      }
    });
});

module.exports = router;
