const express = require("express");
const db = require("../data/db");

const router = express.Router();


router.post("/", (req, res) => {
  const newPost = req.body;

  db.insert(newPost)
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not add the post" });
    });
})

router.post("/:id/comments", (req, res) => {
  const newComment = req.body;

  db.insertComment(newComment)
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not add the comment" });
    });
})

router.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
})

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      res.status(200).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not delete the post" });
    });
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const newPost = req.body;
  
    db.update(id, newPost)
      .then(post => {
        res.status(201).json({ data: post });
      })
      .catch(error => {
        console.log(error);
        res.status(404).json({ errorMessage: "We could not edit the post" });
      });
  })

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  db.findPostComments(id)
    .then(comments => {
      res.status(200).json({ data: comments });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

module.exports = router;