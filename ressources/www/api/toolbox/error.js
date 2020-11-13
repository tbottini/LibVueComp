//file with all error message

const error = Object.freeze({
    uncomplete: {error: "body uncomplete"},
    unexist: 'resource unexist',
    formatpassword: {error: "password to weak, password: 8 letters min, 1maj, 1number and 1 special character"},
    formatemail: {error: "bad email enter"},
    formatdate: {error: "date have bad format: YYYY-MM-DD hh:mm:ss"},
    adminRight: {error: "permission denied"},
    attibuteUnexist: {error: "attribute doesn't exist"},
    attrRight: {error: "can't change this attribute"},
    unlog: {error: "no user log"},
    attrMissing: {error: "no attr provide"},
    valueMissing: {error: "no value provide"},
    fileMissing: {error: "setting src variable but no image provide"}
})


module.exports = error;