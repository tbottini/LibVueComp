<template>
    <div>
        <p>
            <slot>Send</slot>
        </p>
        <br />
        <input
            :type="(hidden) ? 'password' : 'text'"
            @input="e => this.$emit('input', e.target.value)"
            :value="value" />
    </div>
</template>
<script>
export default {
    model: {
        prop: 'value',
        event: 'input'
    },
    data()
    {
        return {}
    },
    props: {
        hidden: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
        },
    }
}
</script>
<style scoped>
div
{
    margin-bottom: 25px;
}

p
{
    display: inline-block;
    margin: 2px;
    font-size: 1.1em;
    margin-bottom: 4px;
}

input
{
    border: none;
    border: 1px solid blue;
    background-color: #0000ff11;
    padding: 10px;
    transition: 0.1s;
    font-size: 0.9em;
    min-width: 0;
    width: 90%;
    border-radius: 2px;
}

input:focus
{
    background: none;
}
</style>