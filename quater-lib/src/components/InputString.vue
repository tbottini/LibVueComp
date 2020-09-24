<template>
    <input type="text" :placeholder="placeholder" /> 
</template>
<script>
export default {
    name: "InputString",
    props: {
        placeholder: {
            type: String,
            required: false,
        }
    }
}
</script>
<style lang="sass" scoped>

input
    outline: none
    border: none
    border-radius: 5px
    font-size: 1em

</style>