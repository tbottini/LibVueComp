const Tile = require("./tile");

class Container
{
    type;
    flex;
    child;

    constructor(type, flex, child)
    {
        this.type = type;
        this.flex = parseFloat(flex || 1);
        this.child = child;
    }

    static parseChild(obj)
    {
        var children = [];
        obj.forEach(c =>
            {
                var newObj = null;
                if (c.type == "img")
                {
                    newObj = new Tile(c.type, c.flex, c.src);
                }
                else
                {
                    newObj = new Container(c.type, c.flex, this.parseChild(c.child));
                }
                children.push(c);
            })
        return children;
    }

    static parse(obj)
    {
        var c = new Container(
            obj.type,
            obj.flex,
            []
        );
        c.child = this.parseChild(obj.child);
        return c;
    }
}

module.exports = Container;