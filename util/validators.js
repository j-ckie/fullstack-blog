const express = require('express')
const router = express.Router()

// regex to validate email
const isEmail = email => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

//console.log(isEmail("test@email.com")) // check if isEmail works

// validate registration data
exports.validateRegistration = data => {
    let errors = {};

    if (data.email === "") {
        errors.email = emptyError;
    } else if (!isEmail(data.email)) {
        errors.email = "Must be a valid email address";
    }

    if (data.name === "") errors.name = emptyError;
    if (data.handle === "") errors.handle = emptyError;
    if (data.password === "") errors.password = emptyError;
    if (data.confirmPassword === "") errors.confirmPassword = emptyError;
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords must match";
    console.log(data.confirmPassword)

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };

};

exports.validateLogin = data => {
    let errors = {};
    let email = data.email,
        password = data.password,
        emptyError = "Must not be empty";

    if (email === "") errors.email = emptyError;
    if (password === "") errors.password = emptyError;

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};
