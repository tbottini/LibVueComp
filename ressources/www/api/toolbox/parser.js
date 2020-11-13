const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const {encode, decode} = entities;


class Parser
{
    constructor()
    {

    }

    secureSql(string)
    {
        return encode(string);
    }

    entitiesObject(obj)
    {
        var newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[key] = this.secureSql(value);
        }
        return newObj;
    }

    decodeObject(obj)
    {
        if (!obj)
            return (null);
        var newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[key] = (typeof value == 'string') ? this.decode(value) : value;
        }
        return newObj;       
    }

    decodeCollection(obj)
    {
        var arr = [];
        obj.forEach(o => {
            arr.push(this.decodeObject(o));
        });
        return arr;
    }

    wrapString(string)
    {
        return `'${string}'`;
    }

    decode(string)
    {
        return decode(string);
    }

    // transform string for secure query utilisation
    wrapSql(string)
    {
        return this.wrapString(
            this.secureSql(
                string
            )
        );
    }

    checkMail(email)
    {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkPassword(password)
    {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&,ùçà#^¨]{8,}$/;
        return regex.test(password);
    }
    
    checkDate(date)
    {
        const regex =/\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}/; 
        return regex.test(date);
    }

}

module.exports = new Parser();