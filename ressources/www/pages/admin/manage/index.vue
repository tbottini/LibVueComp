<template>
    <div>
        <Button @click.native="disconnect" id="disconnect">disconnect</Button>
    </div>
</template>
<script>
export default {
    methods: {
        disconnect()
        {
            this.$store.dispatch("logout");
            this.$router.push('/home');
        }
    }
}
</script>
<style>

#disconnect
{
    background-color: red;
    border-color: red;
    color: white;
}

</style>