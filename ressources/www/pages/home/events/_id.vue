<template>
    <div v-if="event" id="event">
        <Header :query="title" :edit="editable">{{ name }}</Header>
        <template v-if="$mq == 'desktop'">
            <div id="body">
                <Img :query="src" class="img" :edit="editable" v-model="event.src" />
                <P
                :query="descr"
                :edit="editable"
                class="text editable">{{ event.description }}
                </P>
            </div>
            <Button style="background-color: red; border: red; color: white;" @click.native="deleteEvent()" v-if="editable">Delete</Button>
        </template>
        <template v-else>
            <div id='body-mobile'>
                <Img :query="src" class="img" style="width: 100%" :block="true" :edit="editable" v-model="event.src" />
                <P style="margin-top: 30px;" :text="event.description" />
            </div>
        </template>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        console.log(this.$route.params);
        axios.get("/api/event/" + this.$route.params.id)
        .then(r => {
            r.data.src =  r.data.src;
            
            var event;
            if (!r.error)
            {
                event = r.data;
                event.src = "http://" + process.env.host + ':' + process.env.port + '/api/static/' + event.src;
            }
            this.event = event;
        })
        return {
            id: this.$route.params.id,
            event: null,
        }
    },
    methods: {
        deleteEvent()
        {
            axios.get('/api/event/del/' + this.id)
            .then(r =>
            {
                
                this.$store.commit('setApiMsg', r);
                this.$router.go(-1);
            })
        },
        strUcFirst(a){
            return (a+'').charAt(0).toUpperCase()+a.substr(1).toLowerCase();
        }
    },
    computed: {
        descr() {
            return {
                attr: "description",
                apiSection: "event",
                id: this.event.id,
            }
        },
        title() {
            return {
                attr: "name",
                apiSection: "event",
                id: this.event.id,
            }
        },
        src() {
            return {
                attr: "src",
                apiSection: "event",
                id: this.event.id,
            }
        },
        editable()
        {
            return this.$store.getters.isAdmin;
        },
        name()
        {
            var title = this.event.name.charAt(0).toUpperCase()
                + this.event.name.substr(1).toLowerCase();

            return title.replace(/\s+/g, ' ').trim();
        }
    }
}
</script>
<style  scoped>

#event
{
    margin: 4%;
}

.img
{
    width: 40%;
    flex: 1.5;
}

#body
{
    display: flex;
    flex-direction: row;
}

#body-mobile
{
    display: flex;
    flex-direction: column;
}

.text
{
    margin-left: 7%;
    flex: 1;
}


.title-mobile
{
    font-size: 2em;
    width: 100%;
    margin: 20px;
    margin-left: 30px;
}
</style>