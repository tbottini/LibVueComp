module.exports = {
        dateToString(datel)
        {
            let date_ob = datel;

            // adjust 0 before single digit date
            let date = ("0" + date_ob.getDate()).slice(-2);
            
            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            
            // current year
            let year = date_ob.getFullYear();
            
            // current hours
            let hours = ("0" + date_ob.getHours()).slice(-2);
            
            // current minutes
            let minutes = ("0" + date_ob.getMinutes()).slice(-2);
            
            // current seconds
            let seconds = ("0" + date_ob.getSeconds()).slice(-2);
            
            // prints date & time in YYYY-MM-DD HH:MM:SS format
            return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            
        }
}