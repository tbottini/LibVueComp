<template>
    <div>
        <div class="pageblock"
            v-for="i in n"
            :key="i"
        >
            {{index}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        start: {
            type: Number,
            default: 0
        },
        nbitems: {
            type: Number,
            default: 4,
        },
    },
    data()
    {
        return {
            
        }
    }
}
</script>
<style scoped>
.pageblock
{
    border-bottom: 1px solid black;
    border-radius: 10px;
    font-size: 0.8em;
    padding: 2px;
    text-decoration: none;
    text-align: center;
}



</style>