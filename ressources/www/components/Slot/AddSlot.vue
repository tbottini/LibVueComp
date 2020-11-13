<template>
    <div>
        <p>+</p>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>

div
{
    
    box-shadow: 2px 5px 5px 0px #999;
    transition: 0.8s;
    margin: 5px;
    min-width: 100px;
    min-height: 60px;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
}

div:hover
{
    background-color: #666;
    color: white;
    /*box-shadow: 1px 3px 5px 0px grey;*/
}

p
{
    display: block;
    margin: auto;
    font-size: 3em;
}


</style>