<script>
import axios from 'axios';

export default {
    render(h)
    {
        var cells = [];
        if (this.xtitle)
        {
            this.xtitle.forEach((val, i) =>
            {
                cells.push(h(
                    'div',
                    {
                        domProps: {
                            innerHTML: val,
                        },
                        class: {
                            xtitle: true,
                        },
                        key: i,
                    },
                ));
            });

            if (this.data && !this.data.error)
            {
                this.data.forEach((val, i) =>
                {
                    for(var i = 0; i < this.xtitle.length; i++)
                    {
                        cells.push(h(
                            'div',
                            {
                                class: {
                                    'cell': true,
                                    'selected': val["id"] == this.idSelect,
                                },
                                on: {
                                        click: e => {
                                            this.idSelect = val["id"];
                                            this.$emit('changeElem', val)
                                        },
                                    },
                            },
                            [
                                h('p',
                                {
                                    domProps: {
                                        innerHTML: val[this.xtitle[i]],
                                    },
                                    class: {
                                        'cell-paragraph': true
                                    }
                                })
                            ]
                        ))
                    }
                })
            }
        }

        var styleTable = (this.xtitle) ? {
            'grid-template-columns': `repeat(${this.xtitle.length}, ${'1'}fr)`,
        } : {};

        return h(
            'div',
            {
                class: {
                    table: true,
                },
                style: styleTable,
            },
            cells.concat([
                h('div',[
                    h('div',
                        {
                            class: {
                                'actions': true,
                            }
                        },
                        [
                            /*h('button', 'delete'),
                            h('button', 'create')*/
                    ]),

                ])
            ]),
        );
    },
    mounted()
    {
        axios.get('/api' + this.url)
        .then(r =>
        {
            this.data = r.data;
        })
    },
    data()
    {
        return {
            data: null,
            idSelect: null,
        }
    },
    props: {
        url: {
            type: String,
            default: '/users/'
        },
        xtitle: {
            type: Array,
            required: false,
        },
        id: {

        }
    },
    methods: {
        select(id) {
            this.idSelect = id;
            this.$emit('changeElem', this.data[id]);

        }
    },

}
</script>
<style scoped>
.table
{
    display: grid;
}

.xtitle
{
    background-color: #333;
    color: white;
    text-transform: uppercase;
    font-size: 1.2em;
    padding: 4px;
}

.cell-paragraph
{
    padding: 4px;
    font-size: 1.2em;
}

.cell
{
    word-wrap: anywhere;
    cursor: pointer;
}

.selected
{
    background-color: black;
    color: white;
}

</style>