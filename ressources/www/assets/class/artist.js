class Artist
{
    firstName;
    lastName;
    description;
    iduser;
    srcIcon;
    title;

    constructor({
        firstname = '',
        lastname = '',
        description = '',
        srcIcon = '',
        title = "",
        id = null,
    })
    {
        this.firstName = firstname;
        this.lastName = lastname;
        this.description = description;
        this.srcIcon = srcIcon;
        this.id = id;
        this.title = title;
    }
}

export default Artist;
