
//check if user admin exist
var userController = require("./controller/users");
var User = require("./model/users");

const ADMIN_MAIL = "<admin-mail>";

async function init()
{
    userController.getAdmin()
    .then((admin) => {
        if (!admin)
        {
            userController.createUser(new User({
                email: ADMIN_MAIL,
                password: "admin",
                isAdmin: true,
            }))
            .then(res => {
                console.log(res);
            })
            .catch(err => { console.log("err: " + err)})
        }
        else if (admin.email != ADMIN_MAIL)
            console.warn("the admin name is incorrect");
        else
            console.log("admin already exist")
    }) 
}

module.exports = init;
