<template>
    <div>
        <Button @click.native="goBack">RETURN</Button>
        <Header>Compose</Header>
        <p>
            from: {{getMailUser()}}
        </p>
        <InputText v-model="title">Title</InputText>
        <InputText v-model="receiver">To</InputText>
        <InputArea v-model="content"></InputArea>
        <InputSubmit @click.native="send"></InputSubmit>
        <Button @click.native="save">save</Button>
    </div>
</template>
<script>

export default {
    props: {
        mail: {
            type: Object,
            required: false,
        }
    },
    watch: {
        $route (to, from) {
            this.save();
        }
    },
    data() {
        return (this.mail) ? this.mail : {
            receiver: "",
            content: "",
            title: "",
        }
    }, 
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        save() {
            this.$axios.post("/api/contact/save", {
                author: this.getMailUser(),
                receiver: this.receiver,
                content: this.content,
                title: this.title,
                id: (this.mail) ? this.mail.id : null,
            })
            .then(r => {
                this.$store.commit("setMsgApi", r.data);
            });
        },
        getMailUser()
        {
            if (!this.$store.state.user)
                return "";
            return this.$store.state.user.firstname + "."
                + this.$store.state.user.lastname + "@atelier-azurees.com"
        },
        send()
        {
            this.$axios.post("/api/contact/send", {

            })
            .then(r => {
                this.$store.commit("setMsgApi", r.data);
            })
        }
    }
}
</script>
<style scoped>
p {
    font-size: 1.2em;
}
</style>