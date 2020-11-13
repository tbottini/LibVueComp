<template>
    <div id="img">
        <a :style="blockStyle" :href="src">
            <img :src="src"/>
        </a>
        <div id="btns" v-if="edit">
            <InputImage class="inputImg" @imagePick="changeImage"></InputImage>
            <Button v-if="modeEdition" class="button" @click.native="confirm()">Confirm</Button>
            <Button v-if="modeEdition" class="button" @click.native="reset()">Reset</Button>
            <Button class="button" @click.native="remove()">Remove</Button>
        </div>
    </div>
</template>
<script>
import editionModule from '~/mixins/editionModule.js';
import apiHandler from '~/assets/class/apiHandler.js';

export default {
    model: {
        prop: 'src',
        event: 'change',
    },
    props: {
        edit: {
            type: Boolean, 
            default: false,
        },
        src: {
            type: String,
            default: '#'
        },
        query: {

        },
        block: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            saveSrc: null,
            modeEdition: false,
            file: null,
        }
    },
    methods: {
        changeImage(imageUrl, file)
        {            
            if (!this.saveSrc)
                this.saveSrc = this.src;
            this.file = file;
            this.$emit('change', imageUrl);
            this.modeEdition = true;
        },
        reset()
        {
            this.$emit('change', this.saveSrc);
            this.modeEdition = false;
            this.file = null;
            this.saveSrc = null;
        },
        confirm()
        {
            this.saveSrc = null;
            this.modeEdition = false;
            if (this.query)
            {
                apiHandler.set(this.query.apiSection, this.query.id, this.query.attr, this.file)
                .then(r => {
                })
            }
        },
        remove()
        {
            this.saveSrc = this.src;
            this.src = '';
            this.file = null;
            this.$emit('change', '');
        }
    },
    computed: {
        blockStyle() { return { display: this.block ? 'block' : 'inline'}}
    }
}
</script>
<style scoped>

#img
{

}

img
{
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: zoom-in;
}

#btns
{
    display: flex;
    flex-direction: row;
}

.inputImg
{
    margin-right: 30px;
}

</style>