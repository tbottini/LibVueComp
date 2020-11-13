var axios = require("axios");

class ApiHandler
{

    constructor() {
    }

    post(section, data)
    {
        return axios({
            method: 'post',
            url: section,
            data: data,
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }

    dateToString(datel)
    {
        let date_ob = datel;

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        
        let hours = ("0" + date_ob.getHours()).slice(-2);
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);
        
        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }

    //event section
    async set(section, id, attr, value) {
        var b = this.buildBody(attr, value);
        return this.post('/api/' + section + '/set/' + ((id) ? id : ''), b);
    }

    buildBody(attr, value) {
        var form = new FormData();
        form.append("attr", attr);
        if (value instanceof Date)
            form.append("value", this.dateToString(value));
        else if (value instanceof File)
            form.append("image", value);
        else
            form.append("value", value);
        return form;        
    }
}

var apiHandler = new ApiHandler();

module.exports = apiHandler;