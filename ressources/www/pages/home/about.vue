<template>
    <div id="about">
        <Header>Contactez-nous</Header>
        <div id="coord">
            <p class="pres">
                Atelier Azurées<br />
                16 rue d'Anvers<br />
                13001 MARSEILLE<br />
                <a href="mailto:contact@atelier-azurees.com?subject=Contact Atelier Azurees">
                    contact@atelier.azurees.com
                </a><br>
            </p>
        </div>
        <div>
            <InputText v-model="lastname">Nom *</InputText>
            <InputText v-model="firstname">Prenom *</InputText>
            <InputText v-model="email">Mail *</InputText>
            <InputText v-model="title">Title</InputText>
            <InputArea v-model="message">Message *</InputArea>
            <InputSubmit @click.native="send">Envoyer</InputSubmit>
        </div>

        <P><br/>

        </P>

        
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            firstname: '',
            lastname: '',
            email: '',
            message: '',
            title: '',
        }


    },
    methods: {
        send()
        {
            axios.post('/api/contact/post',
            {
                title: this.title,
                author: this.email,
                content: this.message,
                firstname: this.firstname,
                lastname: this.lastname,
            })
            .then(res =>
            {
                res = res.data;
                console.log(res);
                this.firstname = '';
                this.lastname = '';
                this.email = '';
                this.message = '';
                this.title = '';
                this.$store.commit('setMsgApi', res)
                
            })
        }
    }
}
</script>
<style scoped>
#about
{
    margin-left: 40px;
}

a
{
    color: #0000ff55;
    font-size: 1em;
    display: inline;
}

#coord
{
    font-size: 1em;
    margin-top: 10px;
    margin-bottom: 40px;
}

.pres
{
    text-align: left;
}
</style>