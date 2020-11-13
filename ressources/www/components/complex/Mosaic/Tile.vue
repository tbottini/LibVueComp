<template>
    <div  id="tile" :style="style">
        <img v-if="tile.src" :src="'/api/static/' + tile.src.src" />
        <div  id="editor" class="over" @mouseenter="active=true" @mouseleave="active=false">
            <div v-if="active && edit" >

                <div @click="$emit('append', 'left')"
                :class="'secondAction leftAction'">+</div>
                <div @click="$emit('append', 'right')"
                :class="'secondAction rightAction'">+</div>
                <div @click="$emit('append', 'bottom')"
                :class="'secondAction downAction'">+</div>
                <div @click="$emit('append', 'top')"
                :class="'secondAction topAction'">+</div>
                
                <button @click="deleteTile"
                class="btn" id="delete">delete</button>
                <input ref="fileinput" type="file" style="display: none;" @change="onFileChange">
                <button @click="selectImg"
                class="btn" type="file" id="select">select</button>
            </div>

            <div class="right" v-if="activeRight && edit" @mousedown="mouseStart($event,activeRight)"> </div>
            <div class="bottom" v-if="activeBottom && edit" @mousedown="mouseStart($event, activeBottom)"> </div>

        </div>
    </div>
</template>
<script>
import Tile from '~/assets/class/tile.js';
import axios from 'axios';

export default {
    props: {
        tile: {
            required: true,
        },
        dir: {
            type: String,
            default: 'row',
        },
        activeLeft: {
            type: Object
        },
        activeTop: {
            type: Object
        },
        activeBottom: {
            type: Object
        },
        activeRight: {
            type: Object
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
    data() {
        return {
            selected: false,
            active: false,
        }
    },
    computed: {
        style()
        {
            return {
                "flex": this.tile.flex + ' 0',
            }
        },
    
    },
    methods: {
        mouseStart(event, neighbourg)
        {
            this.$emit('selection', {origin: this.tile , neighbourg});
        },
        select()
        {
            
            this.selected = true;
            this.$emit('selected', this);
        },
        selectImg()
        {
            this.$refs.fileinput.click();
        },
        onFileChange(e) {
            const file = e.target.files[0];
            //const url = URL.createObjectURL(file);
            var bodyForm = new FormData();
            bodyForm.append('image', file);
            axios({
                url: '/api/users/artwork/post',
                method: 'post',
                data: bodyForm,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then(response =>
            {
                if (!response.data.error)
                {
                    if (this.tile.src)
                    {
                        //this.deleteArtwork(this.src.id);
                    }
                    this.tile.src = response.data;
                    console.log(this.tile.src);
                }
                else
                {
                    this.$store.commit("setMsgApi", response.data);
                }
            })
        },
        deleteTile(e)
        {
            this.$emit('suppr');
            //this.deleteArtwork(this.src.id);
        },
        deleteArtwork(id)
        {
            axios.get('/api/users/artwork/del/' + id)
            .then(data => {});
        }
    }
}
</script>
<style scoped>

#tile
{
    position: relative;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border: 1px solid white;
}

img
{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

#editor
{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 6;
}

#delete
{
    color: lightcoral;
    border: 1px solid lightcoral;
    left: 20%;
}
#delete:hover
{
    box-shadow: 0px 1px 1px 0px lightcoral;
}
#select
{
    color:  rgb(13, 216, 13);
    border: 1px solid rgb(13, 216, 13);
    left: 60%;
}
#select:hover
{
    box-shadow: 0px 1px 1px 0px  rgb(13, 216, 13);    
}
.btn
{
    position: absolute;
    top: 40%;
    z-index: 5;
    opacity: 1;
    border: none;
    color: #282870;
    background-color: #ffffff99;
    border-radius: 3px;
    font-size: 1.2em;
    padding: 2px;
    transition: 0.5s;
}

/* append container action */
.secondAction
{
    position: absolute;
    color: white;
    background: black;
    padding: 5px;  
    text-align: center;
    z-index: 6; 
}
.topAction, .downAction
{
    left: 40%;
    width: 20%;
}
.topAction
{
    top: 10px;
}
.downAction
{
    bottom: 10px;
}
.leftAction
{
    left: 10px;
    top: 40%;
    height: 20%;
}
.rightAction
{
    right: 10px;
    top: 40%;
    height: 20%;
}


/* border-box */
.over
{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.left{left: 0}
.right{right: 0}
.top{top: 0}
.bottom{bottom: 0}

.left, .right, .top, .bottom{
    opacity: 0.7;
    position: absolute;
    z-index: 8;
    transition: 0.2s;
}
.left:hover, .right:hover, .top:hover, .bottom:hover
{
    opacity: 1;
}
.left, .right{
    height: 100%;
    width: 10px;
    top:0;
    background-color: white;
}
.top, .bottom{
    width: 100%;
    height: 10px;
    left: 0;
    background-color: white;
}

</style>