<template>
    <div :id="$mq == 'desktop' ? 'artistSlot' : 'artistSlot-mobile'" class="artistSlot">
        <div id="head">
            <img :src="src" :class="'img-' + $mq"/>
            <div :id="'id-' + $mq">
                <div :id="'present-' + $mq">
                    <p>{{ artist.firstName.toUpperCase() }}</p>
                    <p>{{ artist.lastName.toUpperCase() }}</p>
                </div>
            </div>
        </div>
        <p id="descr">{{ artist.description }}</p>
        <nuxt-link :to="'/home/artists/'+ artist.id">
            <Button :class="$mq == 'desktop' ? 'button-desktop' : 'button-mobile'">En Savoir Plus</Button>
        </nuxt-link>

    </div>
</template>
<script>
import Artist from '@/assets/class/artist.js';

export default {

    props: {
        artist: {
            type: Artist,
            required: true,
        }
    },
    computed: {
        src()
        {
            console.log(this.artist);
            return '/api/static/' + this.artist.srcIcon;
        }
    }
}
</script>
<style scoped>

.artistSlot
{

    display: flex;
    flex-direction: column;
    transition: 1s;
    overflow: hidden;
    padding: 30px;
}

#artistSlot
{
    height: 500px;
    min-width: 250px;
    max-width: 350px;
}

#artistSlot-mobile
{
   width: 90%;
   min-height: 200px;
   max-height: 500px;
   padding-left: 3%;
   padding-right: 3%;
}

#id-desktop, #id-mobile
{
    position: relative;
}

#present-desktop
{
    position: absolute;
    bottom: 0;
    margin-bottom: -8px;
}

#present-mobile
{
    position: absolute;
    bottom: 0;
    margin-bottom: -9px;
    margin-bottom: -0.9vw;
}

img
{
    object-fit: cover;
    margin-right: 10px;
}

p
{
    color: black;
    margin: 0;
    padding: 0;
    min-height: 0;
    overflow: hidden;
    flex: 1;
}

#id-desktop p 
{
    font-size: 2.4em;
    margin-left: 5px;
    line-height: 1.2em;

}

#id-mobile p
{
    margin: 0;
    padding: 0;
    font-size: 6vw;
    line-height: calc(8vw - 6px);
}

#descr
{
    font-size: 1.45em;
}

#head
{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}

a
{
    color: white;
}

.button-mobile
{
    width: 100%;
    margin-top: 5px;
}

.button-desktop
{
    margin-top: 10px;
}

.img-desktop
{
    width: 130px;
    min-width: 130px;
    height: 130px;
}

.img-mobile
{
    width: 100px;
    min-width: 100px;
    height: 100px;
}

</style>