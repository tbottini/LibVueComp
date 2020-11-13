class Event
{
    title;
    description;
    src;
    dateStart;
    dateEnd;
    id;

    constructor({name, description, dateStart, dateEnd, src, id})
    {
        this.name = name;
        this.description = description;
        this.src = src;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.id = id;
    }
}

export default Event;
