<template>
    <div ref="gridObj" id="grid">
        <div
        class="case"
        v-for="(item, index) in items"
        :key="index"
        :style="styleComputed"
        >
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
        "minCellSize": {
            type: Number,
            default: 180
        }
    },

    computed: {
        styleComputed: function(){

            return (this.pictureUrl) ? {
                    "background": `url('${this.pictureUrl}') no-repeat center center`,
                } : {};
        },

    }
}

</script>
<style lang="sass" scoped>
@import '@/styles/variables.sass'

#grid
    width: 100%
    padding: 10px 0

.case
    display: inline-block
    width: 200px
    height: 250px
    background-color: #bbbbbb
    border-radius: 10px
    padding: 2px
    -webkit-background-size: cover
    -moz-background-size: cover
    -o-background-size: cover
    background-size: cover
    transition: 0.1s
    margin: 7px
    overflow: hidden

.case:hover
    -moz-box-shadow: 0px 3px 5px 1px #330001
    -webkit-box-shadow: 0px 3px 5px 1px #330001
    -o-box-shadow: 0px 3px 5px 1px #330001
    box-shadow: 0px 3px 5px 1px #330001
    -moz-border-radius: 10px
    -webkit-border-radius: 10px
    border-radius: 10px


.spacer
    background-color: red


label
    white-space: nowrap
    width: inherit
    overflow: hidden
    text-overflow: ellipsis


</style>