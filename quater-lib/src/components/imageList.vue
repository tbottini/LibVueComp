<template>
    <ul>
        <li v-for="(item, index) in items" :key="index">
            {{ item[printKey] }}
            <slot v-bind:item="item"></slot>
        </li>
    
    </ul>
</template>
<script>

export default {
    name: "ImageList",
    props: {
        "items": {
            type: Array,
            required: true
        },
        "printKey": {
            type: String,
            default: "name"
        }
    },
}

</script>
<style lang="sass" scoped>
@import '@/styles/variables.sass'

li
    color: $primary

</style>