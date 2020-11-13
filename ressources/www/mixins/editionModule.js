import apiHandler from '~/assets/class/apiHandler.js';

export default {
    props: {
        text: {
            type: String,
            default: '',
        },
        edit: {
            type: Boolean,
            default: false,
        },
        query: {
            
        }
    },
    data()
    {
        return {
            modeEdition: false,
            saveText: "",
            p: this.text,
        }
    },
    computed: {
        inEdition() {
            return this.modeEdition && this.edit;
        }
    },
    methods: {
        activeEditable(){
            if (!this.modeEdition && this.edit)
            {
                this.saveTest = this.p
                this.modeEdition = true;
                this.$refs.paragraph.focus();
            }
        },
        deactiveEditable(save)
        {
            if (this.edit)
            {
                if (!save)
                {
                    this.p = this.saveTest;
                    
                    this.$refs.paragraph.innerText = this.saveTest;
                }
                else
                {
                    var content = this.p;
                    apiHandler.set(this.query.apiSection, this.query.id, this.query.attr, content)
                    .then(msg => {
                        
                        msg = msg.data;
                        if (!msg.error)
                        {
                            
                            this.$emit('update', msg)
                            
                            msg.msg = "edit successful";
                        }
                        this.$store.commit('setMsgApi', msg);
                    });
                }
                this.modeEdition = false;
            }
        },
        onInput(text)
        {
            
            this.p = text;
        }
    },

}