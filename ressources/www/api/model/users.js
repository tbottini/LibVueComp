
class User
{
    email;
    isAdmin;
    password;

    constructor({email, isAdmin, password})
    {
        this.email = email;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    static create({email, isAdmin, password})
    {
        if (!email
            || !password)
        {
            return null;
        }
        else
        {
            return new User({
                email,
                isAdmin,
                password
            })
        }
    }
}

module.exports = User;