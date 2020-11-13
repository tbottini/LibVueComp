<template>
    <div>
        <nuxt-link to="/admin/manage/mail"><Button>RETURN</Button></nuxt-link>
        <template v-if="mail">
            <Header>{{mail.title}}</Header>
            <p>{{mail.author}}</p>
            <p>{{mail.date}}</p>
            <div id="mail-display">
                <iframe v-if="mail" :srcdoc="mail.content"></iframe>
            </div>
        </template>
    </div>
</template>
<script>
import axios from "axios";

export default {
    props: {
        mail: {
            type: Object,
            required: true,
        }
    }
}
</script>
<style scoped>
div
{
    
}

iframe
{
    width: 100%;
    height: 100%;
    border: none;
    zoom: 1.5;
    -moz-transform: scale(1.5);
    -moz-transform-origin: 0 0;
}

</style>