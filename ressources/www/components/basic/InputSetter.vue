<template>
    <div id="inputSetter">
        <p id="title" class="pres">
            {{ query.attr }}
        </p>
        <P :query="query" :edit="true" class="text" @update="$emit('update', $event)" :text="text"></P>
    </div>
</template>
<script>

export default {
    props: {
        text: {},
        query: {},
    },
}

</script>
<style scoped>
.text
{
    
}

.pres
{
    font-size: 1.6em;
    font-weight: 100;
    margin: 6px 0;
    text-transform: capitalize;
}

#inputSetter
{
    margin: 30px auto;
}
</style>