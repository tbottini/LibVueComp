<template>
    <div id="header">
        <header :id="$mq == 'desktop' ? 'header-desktop' : 'header-mobile'" ref="paragraph" :contenteditable="edit"
         v-on:focus="activeEditable">
            <slot></slot>
        </header>
        <Button class="button" v-if="!modeEdition && edit" @click.native="activeEditable">Edit</Button>
        <div v-if="modeEdition && edit">
            <Button class="button" @click.native="deactiveEditable(true)">Confirm</Button>
            <Button class="button" @click.native="deactiveEditable(false)">Reset</Button>
        </div>
    </div>
</template>
<script>
import editionModule from '~/mixins/editionModule.js';

export default {
    mixins: [editionModule],
}
</script>
<style scoped>

#header
{
    display: flex;
    flex-direction: row;
    align-items: center;
}

header
{
    display: flex;
    flex-direction: row;
    text-decoration: none;
    margin-bottom: 30px;
    font-size: 3.6em;
    font-weight: 100;
    white-space: break-spaces;
}

header:focus
{
    border-bottom: 2px solid lightblue;
    border-radius: 10px;
}

#header-mobile
{
    font-size: 8vw;
    margin-bottom: 4vw;
}

</style>
