<template>
    <button>
        <slot>
            button
        </slot>
    </button>
</template>
<script>
export default {
    name: "ToggleButton",
}
</script>
<style lang="sass" scoped>
@import '@/styles/colors.sass'


button
    background-color: $purpleDark
    border-radius: 7px
    border: 2px solid white
    color: white
    height: 40px
    min-width: 30px
    transition: 0.1s
    

button:hover
    box-shadow: 0px 1px 3px 0px  white

</style>