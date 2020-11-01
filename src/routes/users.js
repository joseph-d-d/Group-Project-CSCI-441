var express = require("express");
const { NotExtended } = require("http-errors");
var router = express.Router();
var User = require("../user/User");

// Used to pass data to dashboard html file, since GET /dashboard sends just html file without user data
router.get("/loggedIn", function(req, res){
    if (req.isAuthenticated()) {
        const { password, ...user } = req.user;
        res.json(user);
    }
});

router.get("/:id", async function(req, res){
    let user;
    try {
        user = await req.app.locals.user.getUserById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Unable to locate user" });
        }

        return res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    return res.send(user);
});

router.get("/", function(req, res){
    req.app.locals.user.getUsers().then((users) => res.json(users));
});

module.exports = router;
