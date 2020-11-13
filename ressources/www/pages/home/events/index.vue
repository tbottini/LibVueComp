<template>
    <div :class="'event-' + $mq">
        <Header>Les évènements</Header>
        <EventSlot class="event" v-for="(event, index) in events"
            :key="index"
            :event="event"
        />
        <AddSlot v-if="isAdmin" @click.native="modalOpen = !modalOpen" class="addSlot" />
        <ModalBox v-model="modalOpen" @validate="addEvent">
            <InputText v-model="form.name">Name</InputText>
            <InputArea v-model="form.description">Description</InputArea>
            <InputFile @changeFile="changeFile" v-model="imageUrl">Event Image</InputFile>
            <InputDate v-model="form.dateStart">Date Start</InputDate>
            <InputDate v-model="form.dateEnd">Date End</InputDate>
        </ModalBox>
    </div>
</template>
<script>
import Event from '@/assets/class/event.js';
import adminStatus from '~/mixins/adminStatus.js';
import dateLib from '~/assets/dateLib.js';
import axios from 'axios';

export default {
    mounted()
    {
        return this.getEvents();
    },
    data()
    {
        return {
            events: [],
            modalOpen: false,
            imageUrl: '',
            form: {
                name: '',
                description: '',
                image:  '',
                dateStart: new Date(),
                dateEnd: new Date(),
            }
        }
    },
    mixins: [adminStatus],
    methods: {
        addEvent()
        {
            var bodyFormData = new FormData();
            var form = this.form;
            
            bodyFormData.append('name', form.name);
            bodyFormData.append('description', form.description);
            bodyFormData.append('image', form.image);
            if (form.dateStart)
                bodyFormData.append('dateStart', dateLib.dateToString(form.dateStart));
            if (form.dateEnd)
                bodyFormData.append('dateEnd', dateLib.dateToString(form.dateEnd));

            axios({
                method: 'post',
                url: '/api/event/add',
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then((response) =>
            {
                this.$store.commit('setMsgApi', response.data);
                
                this.getEvents();
            })
        },
        getEvents()
        {
            return axios.get('/api/event/')
            .then(r => {
                var eventsData = [];
                r.data.forEach(e =>
                {
                    eventsData.push(new Event({
                        name: e.name,
                        description: e.description,
                        id: e.id,
                        src: e.src,
                        dateStart: e.dateStart,
                        dateEnd: e.dateEnd,
                    }))
                })

                this.events = eventsData;
            })
        },
        changeFile(file)
        {
            this.form.image = file;
        }
    }

}
</script>
<style  scoped>
.event
{
    margin: 30px 0;
}

.event-mobile
{
    margin: 4%;
}

header 
{
    font-size: 1.8em;
    margin: 20px;
    text-decoration: underline;
}

.addSlot
{
    margin-left: 20px;
    height: 50px;
    margin-top: 50px;
    margin-left: 10%;
    width: 80%;
}

</style>