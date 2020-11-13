var Container = require('~/assets/class/container');
var Tile = require("./tile");
class Mosaic
{
    container;
    width;
    height;
    
    constructor(container, width = 100, height = 30)
    {
        if (this.container == null)
            this.container = new Container('row', '10', [new Tile(null, '100')]);
        else
            this.container = container;
        this.width = width;
        this.height = height;
    }
}

module.exports = Mosaic;