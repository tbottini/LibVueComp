const router = require("express").Router();
var configController = require("../controller/config.js");
const parse = require("../toolbox/parser");
const db = require("../toolbox/sqlite.js");

router
.post('/set/description', async(req, res) =>
{
    if (!req.body.descrition)
        return res.json({error: "body uncomplete"});
    if (!req.session.is_admin)
        return res.json({error: "havn't admin right"});
    params = parse.entitiesObject(req.body);
    var r = await configController.setDescription(params.description);
    return res.json(r);
})
.post('/set/mosaic',  async(req, res) =>
{
    if (!req.body.mosaic)
        return res.json({error: "body uncomplete"});
    if (!req.session.is_admin)
        return res.json({error: "havn't admin right"});
    params = parse.entitiesObject(req.body);
    console.log(params.mosaic);
    var r = await configController.setMosaic(params.mosaic);
    return res.json(r);
})

.get('/', async(req, res) =>
{
    var conf = await configController.get();
    return res.json((conf && conf.error) ? conf : parse.decodeObject(conf));
})


module.exports = router;