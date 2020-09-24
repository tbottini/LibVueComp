<template>
    <header>
        <div id="top">
            <div id="before">
                </div>
            <h1>{{ title }}</h1>
            <div class="slot">
                <slot name="middle">
                    <SearchBar />
                </slot>
            </div>
            
            <div class="slot">
                <slot name="end">
                    
                </slot>
            </div>
        </div>
        <nav>
            <NavHori :items="['Home', 'Params', 'Search', 'Profile']"></NavHori>
            
            <slot name="secondLine"></slot>
        </nav>
        
    </header>
</template>
<script>

export default {
    name: "Header",
    components: {
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
@import '@/styles/colors.sass'

header
    height: 22vh
    color: white
    margin-bottom: 0px
    overflow: hidden
    margin: 0

#before
    flex: 0.2

nav
    background-color: white
    box-shadow: 0px 0px 3px 0px grey

h1
    font-size: 2em
    font-family: Arial, Helvetica, sans-serif
    align-self: center
    margin-right: 28px

#top
    display: flex
    flex-direction: row
    background-color: $purpleDark
    padding-top: 3px
    height: 12vh
    align-items: center


.slot
    flex: 1
    display: flex
    flex-direction: row
    justify-content: end
    align-items: center

.slot *
    margin-right: 20px
    

    
    

</style>