<template>
    <div class="artistPage">
        <Header :edit="false" :query="firstname">{{ artist.firstName.toUpperCase() }} {{ artist.lastName.toUpperCase()}}</Header>
        <H3 :query="title" :edit="editable">{{ artist.title }}</H3>
        <template v-if="$mq == 'desktop'">
            <div id="body">
                <div id="leftside">
                    <Mosaic
                    :host="host"
                    :mosaic="mosaic" :edit="editable" @save="save"/>
                </div>
                <P :query="descr" :edit="editable" class="text" :text="artist.description" />
                <ModalBox title="Append Artwork" v-model="openModal">
                    <InputText>Title</InputText>
                    <InputFile>Artwork Src</InputFile>
                </ModalBox>
            </div>
        </template>
        <template v-else>
            <Mosaic
            :host="host"
            :mosaic="mosaic"
            :edit="editable" @save="save"/>
            <P :query="descr" :edit="editable" class="text" style="margin-top: 40px;" :text="artist.description" />
        </template>
    </div>
</template>
<script>
import axios from 'axios';
import Artist from '~/assets/class/artist.js';
import Mosaic from '~/assets/class/Mosaic';
import Container from '~/assets/class/container';
import Tile from '~/assets/class/tile';
import string from '~/mixins/string.js';

export default {
    async asyncData({params})
    {
        var r = await axios.get('/api/users/' + params.id);
        var user = r.data;
            
        
        var artist = new Artist({
            firstname: user.firstname,
            lastname: user.lastname,
            description: user.descr,
            id: user.id,
            srcIcon: user.srcIcon,
            title: user.title,
        })

        
        var m = (user.mosaic && user.mosaic != "undefined") ? JSON.parse(user.mosaic) : null;

        if (!m)
        {
            m = new Mosaic(new Container('row', '10', [new Tile(null, '100')]), "80", "30");
        }
        else
        {
            m = new Mosaic(Container.parse(m.container), m.width, m.height);
        }


        return {
            artist: artist,
            openModal: false,
            firstname: {id: null, apiSection: "users", attr: "firstname"},
            title: {id: null, apiSection: "users", attr: "title"},
            descr: {id: null, apiSection: "users", attr: "descr"},
            mosaic: m,
        }
        
    },
    methods: {
        save()
        {
            
            var str = JSON.stringify(this.mosaic, null);
            

            axios.post('/api/users/set', {
                attr: 'mosaic',
                value: str,
            })
            .then(res =>
            {
                
            })
            //on recupere toute la mosaic et on l'envoie au serveur
            
        },
    },
    computed: {
        editable() {
            return this.$store.state.user && this.$store.state.user.id == this.artist.id;
        },
        host() {
            return '';
        }
    }
}
</script>
<style scoped>

.artistPage
{
    margin: 4%;
}


#body
{
    display: flex;
    margin-top: 70px;
    flex-direction: row;
    flex-wrap: wrap;   
}

#leftside
{
    min-width: 350px;
    margin-right: 7%;
    flex: 2;
}

#mosaic
{
    background-color: black;
    display: grid;
    min-width: 100%;
    width: 100%;
    height: 200px;
}

.text
{
    min-width: 300px;
    flex: 1;
}
</style>