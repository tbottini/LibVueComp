<template>
    <div id="loginAdmin" @keyup.enter="onClick">
        
        <div id="home">
            <nuxt-link to="/home">
            Atelier Azurees
            <div id="elem">
                <label></label>
            </div>
            </nuxt-link>
        </div>
        <div id="form">
            <InputText v-model="login">Login</InputText>
            <InputText :hidden="true" v-model="password" >Password</InputText>
            <InputSubmit v-on:click.native="onClick">Send</InputSubmit>
        </div>
        <InfoBox />
    </div>
</template>
<script>
export default {
    mounted()
    {
        this.$store.watch(
            this.$store.getters.user,
            (n) => {
                if (n.firstname)
                    this.$router.push('/home');
            }
        );
    },
    data(){
        return {
            login: "",
            password: "",
        }
    },
    methods: {
        async onClick() 
        {
            this.$store.dispatch('login', {username: this.login, password: this.password}).then(() => {});
        }
    }
}
</script>
<style scoped>

#home
{
    color: black;
    font-size: 2.3em;
    padding: 40px;
    position: relative;

}

#elem
{
    height: calc(100% - 80px);
    width: 400px;
    position: absolute;
    left: 30px;
    top: 40px;
    transition: 0.6s ease;
}

#elem:hover
{
    width: 50%;
}

label
{
    position: absolute;
    bottom: 0;
    width: 10%;
    display: block;
    background-color: black;
    height: 4px;
}



a {
    text-decoration: none;
    color: black;
}

#loginAdmin
{
    height: 100vh;
    width: 100vw;
    background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
}

#form
{
    margin: auto;
    margin-top: 10vh;
    width: 30%;
    min-width: 100px;
    padding: 40px;
    border-radius: 30px;
    border: 3px solid white;
    font-size: 1.3em;
}

</style>