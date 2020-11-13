const db = require("../toolbox/sqlite.js");
const hash = require("../toolbox/password.js");
const parse = require("../toolbox/parser");

class UserController
{
    async init()
    {
            var res = await db.run(`
            CREATE TABLE if not exists users(
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                email varchar(200) not null,
                password varchar(256) not null,
                isAdmin boolean default false
            )`);

    }

    async auth(mail, password)
    {
        var user = await db.get("select * from users where email = '?'", [mail]);
        if (!user)
        {
            return ({error: "no entry found"});
        }
        else if (!await hash.verify(user.password, password))
        {
            return ({error: "bad password provide"});
        }
        delete user.password;
        return (user);       
    }

    async authId(id, password)
    {
        var user = await db.get("select * from users where id = '?'", [id]);
        if (!user)
            return ({error: "no entry found"});
        else if (!await hash.verify(user.password, password))
            return ({error: "bad password provide"});
        delete user.password;
        return (user);
    }

    async changePassword(id, oldPassword, newPassword)
    {
        var auth = await this.authId(id, oldPassword);
        if (auth.error)
            return (auth);
        newPassword = await hash.hash(newPassword);
        var res = await db.run("update users set password = '?' where id = '?'", [newPassword, id]);
        return ({msg: "password changed"});
    }

    async changeAttr(id, attr, value)
    {
        var user = await this.getUser(id);
        if (user.error)
            return (user);
        await db.run("update users set ? = '?' where id = '?'",
        [
            attr, value, id,
        ]);
        user[attr] = parse.decode(value);
        return user;
    }

    async getUsers()
    {
        return parse.decodeCollection(await db.all("select id, email from users"));
    }

    //get all public data (include artworks) of users
    async getUser(id)
    {
        console.log(id);
        var user = await db.get("select * from users where users.id = '?'", [id]);
        console.log(user);
        return (user) ? parse.decodeObject(user) : {error: 'cannot find user'};
    }

    async getAdmin()
    {
        return await db.get("select id, email from users where isAdmin = true");
    }

    async getUserByEmail(email)
    {
        return await db.get("select id, email from users where email = '?'", [email]);
    }

    async delete(id)
    {
        return await db.run("delete from users where id = '?' and isAdmin = 'false'", [id]);
    }

    async getUserId(id)
    {
        var user = await db.get("select id, email from users where id = '?'", [id]);
        return parse.decodeObject(user);
    }
    
}

var userController = new UserController();
userController.init();

module.exports = userController;