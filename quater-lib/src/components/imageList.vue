<template>
    <div id="grid">
        <div
        class="case"
        v-for="(item, index) in items"
        :key="index"
        :style="styleComputed"
        >
                <div class="spacer" />
                
                <label>
                    {{ item[printKey] }}
                </label>
                <br>
                <slot v-bind:item="item">
                    
                </slot>
        </div>
    </div>
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
        },
        "pictureUrl": {
            type: String,
        },
        "columnNumber": {
            type: Number,
            default: 5
        },
    },
    computed: {
        styleComputed: function(){

            return (this.pictureUrl) ? {
                    "background": `url('${this.pictureUrl}') no-repeat center center`,
                } : {};
        }
    }
}

</script>
<style lang="sass" scoped>
@import '@/styles/variables.sass'

#grid
    display: grid
    grid-template-columns: repeat(5, 19%)
    grid-gap: 10px
    grid-auto-rows: 200px
    padding: 10px

.case
    background-color: #bbbbbb
    border-radius: 10px
    padding: 2px
    -webkit-background-size: cover
    -moz-background-size: cover
    -o-background-size: cover
    background-size: cover
    transition: 0.1s

.case:hover
    -moz-box-shadow: 0px 3px 5px 1px #330001
    -webkit-box-shadow: 0px 3px 5px 1px #330001
    -o-box-shadow: 0px 3px 5px 1px #330001
    box-shadow: 0px 3px 5px 1px #330001
    -moz-border-radius: 10px
    -webkit-border-radius: 10px
    border-radius: 10px


.spacer
    margin-bottom: 85%

</style>