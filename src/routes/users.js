var express = require("express");
const { NotExtended } = require("http-errors");
var router = express.Router();
var User = require("../user/User");

router.get("/:id", function (req, res) {
  let user;
  try {
    user = req.app.locals.user.getUserById(req.params.id);
    if ( user == null ) {
      return res.status(404).json({message: "Unable to locate user"});
    }
  }
  catch ( error ) {
    res.status(500).json({ message: error.message });
  }
  
  return res.send(user);
});

router.get("/", function (req, res) {
  req.app.locals.user
    .getUsers()
    .then((users) => res.json(users));
});


module.exports = router;
