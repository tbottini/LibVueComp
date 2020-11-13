const router = require("express").Router();
var userController = require("../controller/users.js");
var artworkController = require("../controller/artwork.js.js.js.js.js");
var User = require("../model/users.js");
const ERROR = require("../toolbox/error");
const parse = require("../toolbox/parser.js");
var images = require('../toolbox/images.js');
const { entitiesObject } = require("../toolbox/parser.js");
const upload = images.upload;

router
.post('/login', async (req, res) => 
{
    var {email, password} = parse.entitiesObject(req.body);
    if (!email || !password)
        return res.json(ERROR.uncomplete)
    var user = await userController.auth(email, password);
    req.session.is_admin = user.isAdmin;
    req.session.id_user = user.id;
    return res.json(user);
})
.post('/create', upload.single('image'), async (req, res) => {
    var params = parse.entitiesObject(req.body);
    if (!req.body.email || !req.body.password)
        return res.json(ERROR.uncomplete);
    if (!req.session.is_admin)
        return res.json(ERROR.adminRight);
    if (!parse.checkMail(params.email))
        return res.json(ERROR.formatemail);
    if (!parse.checkPassword(req.body.password))
        return res.json(ERROR.formatpassword);
    var filename = (req.file) ? await images.save(req.file.buffer) : null;
    
    var newUser = User.create({
        email: params.email,
        isAdmin: false,
        password: params.password,
    });
    if (!newUser)
    {
        return res.json(ERROR.uncomplete);
    }
    var newUser = await userController.createUser(newUser);
    return res.json(newUser);
})
.post("/removeUser/", async (req, res) => {
    if (!req.body.id)
        return res.json(ERROR.uncomplete);
    if (!req.session.is_admin)
        return res.json(ERROR.adminRight);
    var idDelete = parse.secureSql(req.body.id);
    var ret = await userController.delete(idDelete);
    return res.json({msg: "user delete"});
})
.post("/changePassword", async (req, res) => {
    console.log(req.body);
    if (!req.body.oldPassword
        || !req.body.newPassword)
        return res.json(ERROR.uncomplete);
    if (!parse.checkPassword(req.body.newPassword))
        return res.json(ERROR.formatpassword);
    var params = parse.entitiesObject(req.body);
    var status = await userController.changePassword(
        req.session.id_user,
        params.oldPassword,
        params.newPassword
    );
    return res.json(status);
})
.post("/set", upload.single('image'), async (req, res) => {
    var params = parse.entitiesObject(req.body);
    console.log(req.body);
    if (!req.session.id_user)
        return res.json(ERROR.unlog);
    if (!params.attr || (!params.value && params.attr != "srcIcon")
        )
        return res.json(ERROR.uncomplete);
    if (![]
        .includes(params.attr))
        return res.json(ERROR.attrRight);

    if (params.attr == "srcIcon" && !req.file)
        return res.json(ERROR.fileMissing);
    else if (params.attr == "srcIcon")
        params.value = await images.save(req.file.buffer);

    var status = await userController.changeAttr(
        req.session.id_user,
        params.attr,
        params.value
    );
    return res.json(status);
}).post("/set/:id", upload.single('image'), async (req, res) => {
    var params = parse.entitiesObject(req.body);
    console.log(req.body);
    if (!req.session.is_admin)
        return res.json(ERROR.adminRight);
    if (!req.params.id)
        return res.json(ERROR.uncomplete);
    if (!params.attr || (!params.value && params.attr != "srcIcon"))
        return res.json(ERROR.uncomplete);
    if (![]
        .includes(params.attr))
        return res.json(ERROR.attrRight);
    if (params.attr == "srcIcon" && !req.file)
        return res.json(ERROR.fileMissing);
    else if (params.attr == "srcIcon")
        params.value = await images.save(req.file.buffer);
    var id = parse.secureSql(req.params.id);
    var status = await userController.changeAttr(
        id,
        params.attr,
        params.value
    );
    return res.json(status);
})
.post("/artwork/post",
    upload.single('image'),
    async(req, res) =>
{
    if (!req.session.id_user)
        return res.json(ERROR.unlog);
    if (!req.file || !req.file.buffer)
        return res.json(ERROR.uncomplete);
    const filename = await images.save(req.file.buffer);
    var post = await artworkController.post(
        req.session.id_user,
        filename
    );
    return res.json(post)
})
.post('/artwork/del/:id', async(req, res) =>
{
    if (!req.session.id_user)
        return res.json(ERROR.unlog);
    var params = parse.entitiesObject(req.body);
    return await artworkController.delete(params.id, req.session.id_user);
})

.get("/", async (req, res) => {
    return res.json(await userController.getUsers());
})
.get('/self', async(req, res) =>
{
    if (!req.session.id_user)
        return res.json(ERROR.unlog)
    return res.json(await userController.getUser(req.session.id_user));
})
.get('/logout', async(req, res) =>
{
    req.session.id_user = null;
    req.session.is_admin = null;
    res.json({msg: "user logout"});
})
.get("/:id", async (req, res) => {
    var id_user = parse.secureSql(req.params.id);
    return res.json(await userController.getUser(id_user));
})
.get("/email/:email", async(req, res) =>
{
    var email = parse.secureSql(req.params.id);
    return res.json(await userController.getUserByEmail(email));
})

module.exports = router;