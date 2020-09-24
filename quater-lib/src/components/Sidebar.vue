<template>
    <div id="sidebar" :style="sidebarOpen">
        <div id="header" :style="headerStyle">
            <div id="cross-close" v-on:click="openState = !openState"><p>X</p></div>
            <slot name="header"><div style="flex: 1; padding-right: 50px"><p>Header</p></div></slot>
        </div>
        <div id="bodySidebar">
            <slot>
                <ul>
                    <a v-for="(item, index) in items"
                    :key="index"
                    :href="item.link">
                        <li>
                        {{ item.name }}
                        </li>
                    </a>
                </ul>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        open: {
            type: Boolean,
            required: true
        },
        items: {
            type: Array,
            required: false,
        },
        onChangeState: {
            type: Function,
            required: false
        },
        headerHeight: {
            type: String,
            default: "20vh"
        },
        sidebarWidth: {
            type: String,
            default: "25vw"
        }
    },
    data: function()
    {
        return {
            openState: this.open,
        }
    },
    computed: {
        sidebarOpen: function()
        {
            if (this.onChangeState)
            {
                this.onChangeState(this.openState)
            }
            return {
                width: (this.openState) ? this.sidebarWidth : "0",
            };
        },
        headerStyle()
        {
            return "height: " + this.headerHeight;
        }
    },
    watch: {
        open: function()
        {
            this.openState = !this.openState;
        }
    }
    
}
</script>
<style scoped lang="sass">
@import '@/styles/variables.sass'

#sidebar
    display: flex
    position: fixed
    flex-direction: column
    width: 20vw
    color: white
    height: 100vh
    transition: 0.5s ease
    list-style: none
    overflow: hidden
    background-color: $blueDark2

#header
    background-color: $blueDark1
    margin: 0
    padding: 0
    font-size: 1.3em
    display: flex
    flex-direction: row
    
ul
    padding-left: 0px

li
    list-style: none
    font-size: 1.3em
    padding: 12px
    text-align: left
    padding-left: 20px

li:hover
    background-color: $blueDark1

a
    text-decoration: none
    color: white

#cross-close
    width: 10px
    cursor: pointer
    margin-left: 20px
    margin-right: 20px


</style>