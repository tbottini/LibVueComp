const express = require("express");
const bodyParser = require("body-parser");
var routerUser = require("./router/users.js");
var routerConfig = require("./router/config");
const init = require("./init.js");
const redis = require('redis')
const session = require("express-session");
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

var app = express();

app
.use('/static', express.static('public'))
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json()) 
.use(session({
    secret: '<name>-session',
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient}),
    cookie: {
        secure: false,
        maxAge: 1000*60*60*8,
        httpOnly: false,
        sameSite: 'lax',
    },
}))
.use((req, res, next) =>
{
    console.log("PAGE " + req.url);
    console.log(req.body);
    next();
})
.use('/users', routerUser)
.use('/config', routerConfig)
.use((req, res) =>
{
    res.status(404).json("PAGE " + req.url + " unexist");
})

init();

module.exports = app;
