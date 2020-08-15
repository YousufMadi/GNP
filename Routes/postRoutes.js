// express server
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Post } = require("../models/post");

const moment = require("moment");
const { getDistance, convertDistance } = require("geolib");

const bodyParser = require("body-parser");
const user = require("../models/user");
// router.use(bodyParser.json());

/*
  GET route to get all the posts which have not been completed and are
  not active. Must be logged in to get these posts.

  ON SUCCESS:
  Return all the pending and non-active posts.
*/
router.get("/", (req, res) => {
  const curr_user = req.session.user;
  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById(curr_user).then((user) => {
      if (user) {
        Post.find({ completed: false, active: false })
          .populate("author")
          .exec((err, transaction) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.json(transaction);
            }
          });
      } else {
        res.sendStatus(401);
      }
    });
  }
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
  
  PUT route to filter posts. Must be a logged in user to make
  this request.

  BODY:
  {
    "currLocation": <user's current location> (used by google maps API),
    "distance": <filter by this distance>,
    "reimbursement": <filter by this reimbursement type>,
    "size": <filter by the size of the request>
  }

  ON SUCCESS:
  Returns the filtered posts

*/
router.put("/filter", (req, res) => {
  const curr_user = req.session.user;

  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById((curr_user) => {
      if (!curr_user) {
        res.sendStatus(401);
      } else {
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
      }
    });
  }
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

/*
  GET the posts associated with the given user id. Only admins
  and those the logged in user associated with this post can
  make this request

  PARAMS: id -> get posts of this user's id

  ON SUCCESS:
  Return the posts of the given user
*/
router.get("/users/:id", (req, res) => {
  const id = req.params.id;

  const curr_user = req.session.user;

  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById(curr_user)
      .then((user) => {
        Post.find({ author: id })
          .then((posts) => {
            res.json(posts.length);
          })
          .catch((error) => {
            res.sendStatus(404);
          });
      })
      .catch((error) => {
        res.sendStatus(401);
      });
  }
});

/*
  GET all completed posts. Request can only be made by admin

  ON SUCCESS:
  Return all the completed posts

*/
router.get("/completed", (req, res) => {
  const curr_user = req.session.user;
  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById(curr_user).then((user) => {
      if (user || user.admin) {
        Post.find({ completed: true })
          .populate("author")
          .exec((err, transaction) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.json(transaction);
            }
          });
      } else {
        res.sendStatus(401);
      }
    });
  }
});

/*
  GET all pending posts. Request can only be made by admin

  ON SUCCESS:
  Return all the pending posts

*/
router.get("/pending", (req, res) => {
  const curr_user = req.session.user;
  if (!curr_user) {
    res.sendStatus(401);
  } else {
    User.findById(curr_user).then((user) => {
      if (user || user.admin) {
        Post.find({ completed: false })
          .populate("author")
          .exec((err, transaction) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.json(transaction);
            }
          });
      } else {
        res.sendStatus(401);
      }
    });
  }
});

module.exports = router;
