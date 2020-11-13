<template>
    <div id="mail">
        <div id="sidebar">
            <ul class="mail-menu">
                <li @click="filter='emitter=false'">reception</li>
                <li @click="filter='draft=true'">brouillon</li>
                <li @click="filter='draft=0&emitter=1'">envoyé</li>
            </ul>
        </div>
        <div id="mail-selection">
            <Header>Mail</Header>
            <div id="mail-actions">
                <Button @click.native="deleteMails">Delete</Button>
                <nuxt-link to="mail/compose"><Button>Composer</Button></nuxt-link>
            </div>
            <MailList @mailOpen="mailOpen"
            @mailAdd="addMail"
            :mailsSelected="mailsSelected"
            :mails="mails" ></MailList>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        this.getMails('?emitter=false');
        return {
            mails: [],
            mailSelected: null,
            mailsSelected: {},
            filter: "",
        }
    },
    methods: {
        mailOpen(index) {
            //if (this.mailSelected) this.mailSelected.active = false;
            //this.mailSelected = this.mails[index];
            //this.mails[index].active = !(this.mails[index].active);
        },
        addMail(value, index, indexArray)
        {
            if (value)
                this.mailsSelected[index.toString()] = indexArray;
            else
                delete this.mailsSelected[index];  
            console.log(this.mailsSelected);              
        },
        deleteMails()
        {
            for (const [key, value] of Object.entries(this.mailsSelected)) {
                this.$axios.get("/api/contact/del/" + key).then(r => {});
                var index;
                for (var i = 0; i < this.mails.length; i++)
                {
                    if (this.mails[i].id == key)
                        index = i;
                }
                console.log(index);
                this.mails.splice(index, 1);

            }
            this.mailsSelected = {};

        },
        getMails(filter = "")
        {
            axios.get('/api/contact' + filter)
            .then((res) => {
                console.log("resultat", res);
                res = res.data;
                if (res.error)
                    this.$store.commit('setMsgApi', res);
                else
                {
                    console.log(res);
                    this.mails = res;
                }
            })
        }
    },
    watch: {
        filter(value) {
            this.getMails("?" + value);
        }
    }
}
</script>
<style scoped>

#sidebar
{
    margin: 0;
    padding-right: 20px;
    height: 100%;
    min-width: 120px;

}

.mail-menu
{
    margin-top: 12vh;
}

ul
{
    padding: 0;
}

li
{
    list-style: none;
    font-size: 1.2em;
    padding: 10px 0;
    cursor: pointer;
}


#mail-actions
{
    display: flex;
    flex-direction: row;
}

#mail
{
    display: flex;
    flex-direction: row;
}

#mail-selection
{
    display: flex;
    flex: 1;
    flex-direction: column;
}
</style>
