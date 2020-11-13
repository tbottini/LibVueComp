<template>
    <div>
        <p ref="paragraph"
         :contenteditable="edit"
         v-on:focus="activeEditable"
         @input="onInput($event.target.innerText)"
         :class="{'p-mobile': $mq == 'mobile'}"
         >
            {{ test }}
        </p>
        <Button style="border: none" v-if="!modeEdition && edit" @click.native="activeEditable">Edit</Button>
        <div v-if="modeEdition && edit">
            <Button style="border: none" @click.native="deactiveEditable(true)">Confirm</Button>
            <Button style="border: none" @click.native="deactiveEditable(false)">Reset</Button>
        </div>
        
    </div>
</template>
<script>
import editionModule from '~/mixins/editionModule.js';

export default {
    mixins: [editionModule],
    props: {
        attr: {
            type: String,
        },
        urlAction: {
            type: String,
        }
    },
    computed: { test() { console.log(this.text);  return this.text; }}

}
</script>
<style scoped>
p
{
    font-size: 1.3em;
    margin-top: 0;
    overflow-wrap: anywhere;
    margin-bottom: 6px;

}

p:focus
{
    border-bottom: 2px solid lightblue;
    border-radius: 10px;
}

.p-mobile
{
    font-size: 4vw;
}

</style>