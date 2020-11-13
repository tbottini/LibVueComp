<template>
    <div id="slot">
        <h3
        id="wrapper"
        ref="paragraph"
        :class="{'h3-mobile': $mq == 'mobile'}"
        :contenteditable="edit"
         v-on:focus="activeEditable">
            <slot></slot>
        </h3>
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

h3
{
    font-size: 1.9em;
    font-weight: lighter;
    margin: 0;
}

.h3-mobile
{
    font-size: 5vw;
    margin-bottom: 3vw;
}

#slot
{
    display: flex;
    flex-direction: row;
    align-items: center;
}

</style>