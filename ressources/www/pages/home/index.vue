<template>
    <div id="home">
        <Header>L'atelier</Header>
        <div id="present">
            <P class="text" text="Voici l'atelier azurees" />
            <div id="plan">
                <img src="~/assets/images/M1.png"/>
                <a :href="linkGmap">
                    <Button>AFFICHER SUR GOOGLE MAPS</Button>
                </a>
                
            </div>
        </div>
        <Mosaic
        :host="host"
        :mosaic="mosaic" :edit="editable" @save="save">
        </Mosaic>
    </div>
</template>
<script>
import Container from '~/assets/class/container';
import Tile from '~/assets/class/tile';
import Mosaic from '~/assets/class/Mosaic.js'
import axios from 'axios';

export default {
    data() {
        
        axios.get('/api/config/')
        .then((result) =>
        {
            var m = (result.data.mosaic) ? JSON.parse(result.data.mosaic) : null;
            if (m)
            {
                this.mosaic = m;
            }
        })
        
        var defaultM = new Mosaic(null, "80", "30");
        return {
            mosaic: defaultM,
            linkGmap: "https://www.google.fr/maps/place/16+Rue+d'Anvers,+13001+Marseille/@43.302175,5.3918169,17.25z/data=!4m5!3m4!1s0x12c9c09e20e97441:0xb894062df6eff92e!8m2!3d43.3023638!4d5.3939142"
        }
    },
    methods: {
        save()
        {
            var str = JSON.stringify(this.mosaic, null);

           axios.post('/api/config/set/mosaic', {
                mosaic: str,
            })
            .then(res =>
            {
                
            })
        }
    },
    computed: {
        editable()
        {
            return this.$store.state.user && this.$store.state.user.isAdmin;
        },
        host() {
            return '';
        }
    }
}
</script>
<style scoped>

#home
{
    height: 100%;
    padding-bottom: 10px;
}

#present
{
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
    flex-wrap: wrap;
}

.text
{
    margin: 0;
    width: 50%;
    flex: 1;
    min-width: 200px;
    border: none;
}

#plan
{
    flex: 1;
    width: 40%;
    min-width: 220px;
}

img
{
    
    width: 100%;
}

#plan
{
    display: block;
}

a
{
    font-size: 1em;
    text-decoration: none;
    color: black;
}

#mosaic
{
    margin: 0 40px;
    background-color: black;
    margin-top: 40px;
    min-width: 100px;
    min-height: 100px;
}
</style>
