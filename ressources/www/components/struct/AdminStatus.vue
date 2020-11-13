<template>
    <div v-if="show" id="statusBar">
        <p>ADMIN</p>
        <div id="endaction">
            <nuxt-link to="/admin/manage"><Button class="button">Gestion Panel</Button></nuxt-link>
            <nuxt-link to="/admin/manage/contact"><Button class="button">Contact</Button></nuxt-link>
            <Button @click.native="disconnect" class="button">disconnect</Button>
            <Button @click.native="$emit('change', false)">X</Button>
        </div>
    </div>
</template>
<script>
export default {
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        show: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        disconnect()
        {
            this.$store.dispatch("logout");
        }
    }
}
</script>
<style scoped>

a
{
    display: flex;
    text-decoration: none;
}

#statusBar
{
    display: flex;
    top: 0;
    width: 100%;
    height: 6vh;
    background: lightcoral;
    color: white;
    box-shadow: 0px 2px 1px 0px lightgrey;
    padding: 0;
}

p
{
    margin-left: 20px;
}

#endaction
{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;  
    flex: 1; 
    margin-right: 20px;
    flex-wrap: wrap;
}

.button
{
    color: black;
    margin: 3px;
    padding: 3px;
    font-size: 1em;
}

p
{
    justify-self: start;
    align-self: center;
    font-size: 1.2em;
}
</style>