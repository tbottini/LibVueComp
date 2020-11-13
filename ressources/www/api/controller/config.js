const db = require("../toolbox/sqlite.js");

class ConfigController
{
    async init()
    {
        var res = await db.run(`
            create table if not exists config(
                id integer primary key autoincrement
            )
        `)
        
        var res = await db.get("select * from config");
        if (!res)
        {
            console.log("add first row in config");
            await db.run('insert into config values(null, null,null)')
        }
    }

    async get()
    {
        return await db.get("select id, from config", []);
    }
}

var configController = new ConfigController();
configController.init();

module.exports = configController;