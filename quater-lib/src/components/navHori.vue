<template>
    <div>
        <div id="underlineBox">
            <div>
            
            <button v-for="(item, index) in items"
                :key='index'
                v-on:click="changeTab(index, item)">
                <slot>
                    <label>
                        {{ item }}
                    </label>
                </slot>
            </button>
            </div>
            <transition name="shift">
                <label id="underline" :style="paddingLeft"></label>
            </transition>
        </div>

    </div>
</template>
<script>
export default {
    name: "NavHori",
    props: {
        items: {
            type: Array,
            required: true
        },
        onChange: {
            type: Function,
            required: false,
        }
    },
    methods: {
        changeTab: function(newTab, valueTab)
        {
            this.tabSelected = newTab;
            if (this.onChange)
                this.onChange(this.tabSelected, valueTab);
        }
    },
    data: function(){
        return {
            tabSelected: 0
        }
    },
    computed: {
        paddingLeft() {
            return {left: `${( this.tabSelected) * 124 }px`};  
        }
    }
}
</script>
<style lang="sass" scoped>
@import '@/styles/variables.sass'

#underlineBox
    display: flex
    flex-direction: column

div
    display: flex
    flex-direction: row
    justify-content: center
    font-weight: bold
    font-size: 1.1em
    

button
    padding: 12px
    min-width: 100px
    background-color: white

button
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif
    text-decoration: none
    position: relative
    display: block
    padding: 16px 0
    margin: 0 12px
    letter-spacing: 1px
    font-size: 12px
    line-height: 16px
    font-weight: 900
    text-transform: uppercase
    transition: color 0.1s,background-color 0.1s,padding 0.2s ease-in
    color: #000
    border: none
    cursor: pointer


#underline
    content: ''
    display: block
    position: relative
    margin-left: 12px
    bottom: 0px
   
    height: 3px
    width: 100px
    background-color: black
    transform-origin: right top
    transform: scale(1,1)
    transition: 0.5s ease




</style>