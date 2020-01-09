const models = require("../models");
const express = require("express");
const app = express();
const router = express.Router()
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

router.use(express.urlencoded()); // REEEEEEEEEEEEEEEEEEEEEEEE

const {
    validateRegistration
    // validateLogin
} = require("../util/validators");



router.get("/", (req, res) => {
    res.render("register")
})

// register
router.post("/", (req, res) => {
    let email = req.body.email,
        name = req.body.name,
        handle = req.body.handle,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword;
    // console.log(req.body)

    let registerData = {
        email: email,
        name: name,
        handle: handle,
        password: password,
        confirmPassword: confirmPassword
    };

    const { valid, errors } = validateRegistration(registerData);

    if (!valid) return res.status(400).json(errors)

    models.users.findOne({
        where: {
            handle: req.body.handle
        }
    })
        .then(persistedUser => {
            if (persistedUser) {
                res.status(500).json({ message: "handle already exists" })
            } else {
                console.log(req.body)
                let persistHandle = req.body.handle,
                    persistPassword = req.body.password,
                    persistName = req.body.name,
                    persistEmail = req.body.email;
                bcrypt.hash(persistPassword, SALT_ROUNDS).then(hash => {
                    let newUser = models.users.build({
                        handle: persistHandle,
                        password: hash,
                        name: persistName,
                        email: persistEmail
                    })
                    newUser.save().then(() => res.redirect("/login")).catch(err => console.error(err))
                })
            }
        })
})

// console.log(router)
module.exports = router