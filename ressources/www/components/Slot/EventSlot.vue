<template>
    <div v-if="$mq == 'desktop'" id="event" :style="heightMax">
        <p class="date">{{ date }}</p>
        <img v-if="$mq == 'desktop'" :src="src" :style="imgHeight"/>
        <div v-else class="img-wrapper">
            <img :src="src" class="img-mobile" />
        </div>
        <div id="presentation">
            <p id="title">{{event.name}}</p>
            <p id="descr">{{event.description}}</p>
            <nuxt-link :to="'/home/events/'+event.id"><Button style="position: absolute; margin: 0; bottom: 0;">En Savoir Plus</Button></nuxt-link>
        </div>
    </div>
    <div id="event-mobile" style="margin-bottom: 40px" v-else>

        <div class="event-body-mobile">
            <p style="font-size: 2em; margin: 0; text-align: left;">{{event.name}}</p>
            <p class="date-mobile" style="margin: 4px 0;">{{ date }}</p>
                <div class="img-wrapper">
                    <img class="img-mobile" :src="src" />
                </div>
            <p style="font-size: 1.1em; margin-bottom: 10px;">{{event.description}}</p>          
            <nuxt-link :to="'/home/events/'+event.id"><Button style="margin-left: 0">en savoir plus</Button></nuxt-link>

    </div>  
    </div>
</template>
<script>
import Event from '@/assets/class/event.js';

export default {
    props: {
        event: {
            type: Event,
            required: true,
        },
        height:{
            type: String,
            default: "200px"
        }
    },
    computed: {
        date()
        {
            if (!this.event.dateStart)
                this.event.dateStart = Date.now();
            var d = new Date(this.event.dateStart);
            var day = (d.getDate() >= 10) ? d.getDate() : '0' + d.getDate();
            var month = d.getMonth() > 10 ? d.getMonth() : '0' + d.getMonth();
            return `${day}.${month}.${d.getFullYear()}`;
        },
        src()
        {
            if (!this.event.src)
                return '#';
            return '/api/static/' + this.event.src;
        },
        heightMax()
        {
            return {
                'max-height': this.height,
            }
        },
        imgHeight()
        {
            return {
                'width': this.height,
                'height': this.height,
                'min-width': this.height,
            }
        }
    },
}
</script>
<style scoped>

#title
{
    font-size: 1.8em;
    margin: 0;
}

#event
{
    display: flex;
    flex-direction: row;
    max-height: 150px;
}

.event-mobile
{
    align-items: flex-start;
}

#descr
{
    max-width: 100%;
    max-height: 90px;
    overflow: hidden;
    margin-bottom: 0;
    flex: 1;
}

img
{
    width: 150px;
    height: 150px;
    object-fit: cover;
}

p
{
    font-size: 1em;
}

p:nth-child(3)
{
    font-size: 2em;
}

.date
{
    font-size: 1.8em;
    letter-spacing: 1px;
    margin: 0;
    padding: 0;
    margin-right: 3px;
    width: 1em;
    transform: scale(-1, -1);
    writing-mode: vertical-lr;
    text-orientation: mixed;
}

.date-mobile
{
    font-size: 1.5em;
    text-align: left;
}

#presentation
{
    margin-left: 20px;
    overflow: hidden;
    min-width: 100px;
    width: 70%;
    display: flex;
    flex-direction: column;
    position: relative;
}

a 
{
    bottom: 0;
}

.button
{
    padding: 2px 20px;
}

/* mobile section */
.img-wrapper
{
    position: relative;
    flex: 1;
}

.img-wrapper::after {
    display: block;
    content: '';
    padding-bottom: 100%;
}

.img-mobile
{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

#event-mobile
{
    display: flex;
    flex-direction: row;
    margin: 20px 4px;
    width: 100%;
}

#event-mobile:not(:last-child)
{
    border-bottom: 1px solid blue;
    padding-bottom: 30px;
}

.event-body-mobile
{
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header
{
    display: flex;
    flex-direction: row;
    width: 100%;
}

#event-mobile-present
{
    flex: 2;
    text-align: center;
    font-size: 1.2em;
}

.event-mobile-name
{
    font-size: 1.7em;
}
</style>