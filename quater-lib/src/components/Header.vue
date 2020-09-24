<template>
    <header>
        <div class="line">
            <div class="spacer" style="flex: 1"/>
            <h1>{{ title }}</h1>
            <div class="slot">
                <slot name="firstLine">
                    
                </slot>
            </div>
        </div>
        <div class="line">
            <NavHori :items="['Home', 'Params', 'Search', 'Profile']"></NavHori>
            
            <slot name="secondLine"></slot>
        </div>
        
    </header>
</template>
<script>
import NavHori from "./NavHori.vue";

export default {
    name: "Header",
    components: {
        NavHori,
    },
    props: {
        title: {
            type: String, 
            required: true,
        },
    },
}
</script>
<style scoped lang="sass">
@import '@/styles/variables.sass'

header
    height: 20vh
    background-color: $blueDark1
    color: white
    padding-top: 3px
    margin-bottom: 0px
    overflow: hidden

h1
    font-size: 1.6em
    font-family: Arial, Helvetica, sans-serif

.line:nth-child(1)
    display: flex
    flex-direction: row

h1
    flex: 1

.slot
    flex: 1
    display: flex
    flex-direction: row
    justify-content: end
    align-items: center

.slot *
    margin-right: 20px
    

    
    

</style>