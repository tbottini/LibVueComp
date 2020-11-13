
class Tile
{
    type;
    src;
    flex;

    constructor(src, flex)
    {
        this.type = "img";
        this.src = src;
        this.flex = parseFloat(flex || 1);
    }
}

module.exports = Tile;