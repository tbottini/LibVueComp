<template>
    <div>
        <p style="margin-left: 20px;">ListImage</p>
        <ul>
            <li v-for="(elem, index) in items" :key="index">
                <img :src="elem.src" />
                <P>{{elem.title}}</P>
                <Button>delete</Button>
            </li>
        </ul>
        <InputFile @change="changeFile">Add</InputFile>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            required: true
        },
        
    },
    methods: {
        changeFile(file)
        {
            this.$emit('addFile', file);
        }
    }
}
</script>
<style scoped>
li
{
    display: flex;
    flex-direction: row;
    list-style: none;
    font-size: 1em;
    border-left: 1px solid black;
    margin-bottom: 3px;
    height: 50px;
}

img
{
    height: 100%;
    margin-right: 20px;
}
</style>