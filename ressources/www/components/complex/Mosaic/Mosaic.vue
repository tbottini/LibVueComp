<template>
    <div id="mosaic-office">
        <div v-if="edit" id="params">
            <Slider v-model="flexValue" color="#6655FF">SIZE</Slider>
            <Slider  v-model="mosaic.height" color="#0022dd">HEIGHT</Slider>
        </div>
        <div id="mosaic-v" :style="styleSize">
            <div ref="root" id="root">
                <Container
                :edit="edit"
                :index="0"
                :host="host"
                @selection="containerSelected($event)"
                @deleteContainer="reinit"
                style="height: 100%"
                :container="mosaic.container" />
            </div>
            <div id="zoneMouse"
            ></div>
            
        </div>
        <Button v-if="edit" style="width: 30%;" @click.native="$emit('save')">Save</Button>
    </div>
</template>
<script>
import Container from '~/assets/class/container';
import Tile from '~/assets/class/tile';
import Mosaic from '~/assets/class/Mosaic';
import axios from 'axios';

export default {
    props: {
        mosaic: {
            type: Object,
            required: true,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        host: {
            type: String,
            required: true,
        }
    },
    data()
    {
        return {
            objectSelect: null,
            flexSum: null,
            flexValue: '10',
        }
    },
    methods: {
        containerSelected(containerFocus)
        {
            this.objectSelect = containerFocus;
            this.flexSum = containerFocus.origin.flex + containerFocus.neighbourg.flex;
            this.flexValue = (containerFocus.origin.flex / this.flexSum * 100).toString();
        },
        newImage(file)
        {
            this.listImage.push({
                title: 'test',
                src: file
            })
        },
        reinit()
        {
            this.mosaic.container.child.push(new Tile(null, '100'))
        }

    },
    watch: {
        flexValue(newValue, oldValue)
        {
            if (this.objectSelect)
            {
                var {neighbourg, origin} = this.objectSelect;
                origin.flex = (newValue / 100) * this.flexSum;
                neighbourg.flex = (1 - newValue / 100) * this.flexSum;
            }

            return newValue;
        },
    },
    computed: {
        styleSize()
        {   
            return {
                "padding-bottom": (this.mosaic.height * 3).toString() + '%',
            }
        }
    }
}
</script>
<style scoped>

#mosaic-v
{
    position: relative;
    margin: 0 auto;
    width: 100%;
    padding-bottom: 100%;
}

#root
{
    background-color: #333;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

.row
{
    display: flex;
    flex-direction: row;
}

img
{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

#zoneMouse
{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
}

#params
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

#params *
{
    flex: 1;
}

#params-mosaic
{
    width: 30%;
}
</style>