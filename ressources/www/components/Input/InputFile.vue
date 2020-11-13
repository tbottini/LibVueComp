<template>
    <div>
        <input
        type="file" name="file" id="file" class="inputfile"
        accept="image/*"
        @change="onFileChange" />
        <label for="file" class="btn"><slot>Select File</slot></label>
        <label>{{url}}</label>
        <br>
        <div class="imgWrapper">
            <img width="300px" height="300px" v-if="url" :src="url" />
        </div>
    </div>
</template>
<script>
export default {
    model: {
        prop: 'url',
        event: 'change'
    },
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.$emit('change', URL.createObjectURL(file)); 
            this.$emit('changeFile', file);           
        }
    }
}
</script>
<style scoped>

img
{
    object-fit: contain;
}

div
{
    margin: 20px;
}

#file
{
    display: none;
}

.btn
{
    font-size: 1.2em;
    border-radius: 3px;
    padding: 10px;
    transition: 0.3s;
    margin: 10px;
    cursor: pointer;
    border: 1px solid blue;
    border-radius: 5px;
    display: block;
    min-width: 90px;
    color: black;
}

.btn:hover
{
    background-color: blue;
    color: white;
    
}

.imgWrapper
{
    
}

</style>