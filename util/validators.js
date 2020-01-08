// regex to validate email
const isEmail = email => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

// validate registration data
exports.validateRegistration = data => {
    let errors = {};
    let email = data.email,
        name = data.name,
        handle = data.handle,
        password = data.password,
        confirmPassword = data.confirmPassword,
        emptyError = "Must not be empty";

    if (email === "") {
        errors.email = emptyError;
    } else if (!isEmail(email)) {
        errors.email = "Must be a valid email address";
    }

    if (name === "") errors.name = emptyError;
    if (handle === "") errors.handle = emptyError;
    if (password === "") errors.password = emptyError;
    if (confirmPassword === "") errors.confirmPassword = emptyError;
    if (password !== confirmPassword) errors.confirmPassword = "Passwords must match";

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