const models = require("../models");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const {
    validateRegistration,
    validateLogin
} = require("../util/validators");

// register
exports.register = (req, res) => {
    let email = req.body.email,
        name = req.body.name,
        handle = req.body.handle,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword;

    const newUser = {
        email: email,
        name: name,
        handle: handle,
        password: password,
        confirmPassword: confirmPassword
    };

    const { valid, errors } = validateRegistration(newUser);

    if (!valid) return res.status(400).json(errors)

    models.users.findOne({
        where: {
            handle: req.body.handle
        }
    })
        .then(user => {
            if (user) res.status(500).json({ message: "Handle already exists" })
            else {
                bcrypt.hash(password, SALT_ROUNDS).then(hash => {
                    let newUser = models.users.build({
                        email: email,
                        name: name,
                        handle: handle,
                        password: hash,
                    })

                    newUser.save().then(() => res.redirect("/login"))
                }).catch(err => console.error(err));
            }
        });
};
