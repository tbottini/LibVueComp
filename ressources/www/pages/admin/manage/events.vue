<template>
    <div>
        <Header>Event Management</Header>
        <PageBackoffice
        :xtitle="['id', 'name', 'dateStart', 'description']" url="/event"
        :fields="inputs" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputs: {
                section: "event",
                attr: [
                    {name: "name", type: "string"},
                    {name: "dateStart", type: "date"},
                    {name: "dateEnd", type: "date"},
                    {name: "description", type: "string"},
                    {name: "src", type: "image"}
                ],
            },
        }
    },
}
</script>