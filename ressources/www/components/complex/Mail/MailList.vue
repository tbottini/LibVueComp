<template>
    <ul>
        <li v-for="(elem, index) in mails" :key="elem.id"
            :class="{active: elem.active}"
            @click="openMail(elem.id)"
        >
            <input type="checkbox" @click.stop="" @change.stop="$emit('mailAdd', $event.target.checked, elem.id, index)" />
            <div class="present">
                <p class="title">{{elem.title}}</p>
                <p class="from">{{elem.author}}</p>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        mails: {
            type: Array,
            required: true,
        },
        mailsSelected: {
            type: Object,
            required: true,
        }
    },
    data() {
        console.log(this.mails);

        return {
            mailOpen: null,
        };
    },
    methods: {

        openMail(index)
        {
            this.$emit('mailOpen', index);
            this.$router.push('/admin/manage/mail/' + index.toString());
        },

    }
}
</script>
<style scoped>

input
{
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

ul
{
    padding: 0;
}

li
{
    width: 100%;
    list-style: none;
    border-left: 3px solid #333;
    display: flex;
    flex-direction: row;
    padding: 5px 0;
    cursor: pointer;
}

.title
{
    font-size: 1.4em;
    margin: 4px;
}

.from
{
    font-size: 1.1em;
}

.present
{
    display: flex;
    flex-direction: column;
}

p
{
    margin: 4px;
    padding: 0;
}

.active
{
    background-color: #333;
    color: white;
}
</style>