<template>
    <div>
        <Header>Les artistes résidents</Header>
        <div id="artists">
            <ArtistSlot
                :class="$mq == 'desktop' ? 'artistSlot-desktop' : 'artistSlot-mobile'"
                v-for="(artist, index) in artists"
                :key="index"
                :artist="artist"
            />
            <AddSlot v-if="this.isAdmin" @click.native="modalOpen = !modalOpen" :class="$mq == 'desktop' ? 'addSlot' : 'addSlot-mobile'"/>
            <ModalBox title="test" v-model="modalOpen" @validate="addUser">
                <InputText v-model="form.email">Email </InputText>
                <InputText :hidden="true" v-model="form.password">Password </InputText>
                <InputText v-model="form.lastname">LastName </InputText>
                <InputText v-model="form.firstname">FirstName </InputText>
                <InputArea v-model="form.descr">Description</InputArea>
                <InputFile @changeFile="changeFile" v-model="imageUrl">Profile Icon</InputFile>
            </ModalBox>
        </div>
            
    </div>
</template>
<script>
import Artist from '~/assets/class/artist.js';
import adminStatus from '~/mixins/adminStatus.js';
import axios from 'axios';

export default {
    data()
    {
        axios.get('/api/users/')
        .then(r => {
            
            r.data.forEach(u =>
            {
                
                this.artists.push(new Artist({
                    firstname: u.firstname,
                    lastname: u.lastname,
                    description: u.descr,
                    title: u.userTitle,
                    id: u.id,
                    srcIcon: u.srcIcon
                }))
            })
        })

        return {
            artists: [
            ],
            modalOpen: false,
            imageUrl: '',
            form: {
                email: '',
                password: '',
                lastname: '',
                firstname: '',
                descr: '',
                image: ''
            }
        }
    },
    mixins: [adminStatus],
    methods: {
        addUser()
        {
            var data = new FormData();
            for (const [key, value] of Object.entries(this.form)) {
                if (value)
                    data.append(key, value);
            }
                        
            for (var value of data.values()) {
                
            }

            axios({
                method: 'post',
                url: '/api/users/create',
                data: data,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then((response) =>
            {
                this.$store.commit('setMsgApi', response.data);
                
            })
        },
        changeFile(file)
        {
            this.form.image = file;
        }
    }
}
</script>
<style scoped>

header 
{
    font-size: 1.8em;
    margin: 20px;
    text-decoration: underline;
}

#artists
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: -1px;
}

#artists > *
{
    border-left: 1px solid blue;
}

.addSlot
{
    min-width: 220px;
    height: 200px;
    padding: 25px;
}

.addSlot-mobile
{
    width: 100%;
    padding: 25px;
    height: 200px;
}

.artistSlot-mobile:not(:first-child)
{
    border-top: 1px solid blue;
}

.artistSlot-desktop:not(:first-child)
{
    border-left: 1px solid blue;
}

</style>