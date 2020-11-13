<template>
    <div>
        <div>
            <Table @changeElem="elemChange" :xtitle="xtitle" :url="url" />
            <div style="margin: 0" v-if="elem">
                <div v-for="(attr, index) in inputs.attr"
                :key="index">
                    <InputSetter
                    v-if="attr.type == 'string'"
                    @update="updateElem"
                    :query="{id: elem.id, apiSection: inputs.section, attr: attr.name}"
                    :text="elem[attr.name]"
                    />
                    <DateSetter
                    v-else-if="attr.type == 'date'"
                    @update="updateElem"
                    :date="elem[attr.name]"
                    :query="{id: elem.id, apiSection: inputs.section, attr: attr.name}"
                    />
                    <ImgSetter v-else-if="attr.type == 'image'"
                    :query="{id: elem.id, apiSection: inputs.section, attr: attr.name}"
                    @update="updateElem"
                    :edit="true"
                    :src="'/api/static/' + elem[attr.name]" />
                </div>
			</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fields: {},
        xtitle: {},
        url: {}
    },
    data() {
        return {
            elem: null,
            inputs: this.fields
        }
    },
    methods: {
		elemChange(elem) {
			console.log(elem);
			this.elem = elem
		},
		updateElem(elem) {
			Object.keys(elem).forEach(key =>
			{
                console.log("updateelem", elem[key], this.elem[key]);
				this.elem[key] = elem[key];
			})
		}
	},

}
</script>