<template>
    <div>
        <Header>Users Management</Header>
        <div>
            <Table @changeElem="elemChange" :xtitle="['id', 'email', 'firstname', 'lastname', 'title']" url="/users" />
            <div style="margin: 0 4%" v-if="elem">
				<InputSetter :query="firstname" @update="updateElem" :text="elem.firstname" />
				<InputSetter :query="lastname" @update="updateElem" :text="elem.lastname" />
				<InputSetter :query="title" @update="updateElem" :text="elem.title" />
				<InputSetter :query="descr" @update="updateElem" :text="elem.descr" />
				<Img style="width: 50%;" :edit="true" :query="srcIcon" :src="'/api/static/' + elem.srcIcon"/>
			</div>
        </div>

    </div>
</template>
<script>

export default {
    data()
    {
        return {
			elem: null,
        }
	},
	methods: {
		elemChange(elem) {
			
			this.elem = elem
		},
		updateElem(elem) {
			Object.keys(elem).forEach(key =>
			{
				this.elem[key] = elem[key];
			})
		}
	},
    computed: {
        firstname()  {return {id: this.elem.id, apiSection: "users", attr: "firstname"}},
        lastname() {return {id: this.elem.id,apiSection: "users", attr: "lastname"}},
        title() {return {id: this.elem.id, apiSection: "users", attr: "title"}},
        descr() {return {id: this.elem.id, apiSection: "users", attr: "descr"}},
        srcIcon() {return {id: this.elem.id, apiSection: "users", attr: "srcIcon"}}        
    }
}
</script>