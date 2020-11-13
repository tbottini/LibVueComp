<template>
    <div
    :style="style" :class="container.type" >
        <template v-for="(child, index) in container.child">
            <Tile v-if="child.type == 'img'"
            :tile="child"
            :dir="container.type"
            :key="index"
            :edit="edit"
            :host="host"
            @append="append(index, $event)"
            @selection="selection(index, $event)"
            @suppr="deleteTile(index)"
           :activeRight="(container.type == 'row' && index != (container.child.length - 1)) ? container.child[index + 1] : null"
            :activeBottom="(container.type == 'col' && index != (container.child.length - 1)) ? container.child[index + 1] : null"
            />

            <Container v-else
            :key="index"
            :container="child"
            :edit="edit"
            :host="host"
            @append="append(index, $event)"
            @selection="selection(index, $event)"
            @deleteContainer="deleteContainer"
            :index="index"
            :activeRight="(container.type == 'row' && index != (container.child.length - 1)) ? container.child[index + 1] : null"
            :activeBottom="(container.type == 'col' && index != (container.child.length - 1)) ? container.child[index + 1] : null"
            />
        </template>
         <div class="over" v-if="edit">
            <div class="right" v-if="activeRight" @mousedown="mouseStart($event,activeRight)"> </div>
            <div class="bottom" v-if="activeBottom" @mousedown="mouseStart($event, activeBottom)"> </div>
        </div> 
    </div>
</template>
<script>
import Container from '~/assets/class/container';
import Tile from '~/assets/class/tile';

export default {
    name: 'Container',
    props: {
        container: {
            type: Object,
            required: true
        },
        activeLeft: {
            type: Object
        },
        activeTop: {
            type: Object
        },
        activeBottom: {
            type: Object
        },
        activeRight: {
            type: Object
        },
        index: {
            type: Number,
            required: true,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        host: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            //container.child: this.container.child,
            tileFocus: null,
            mousePos: {
                x: null,
                y: null,
            }
        }

    },
    computed: {
        style() {
            return {
                flex: this.container.flex + ' 0',
            }
        }
    },
    methods: {
        append(i, dir)
        {
            const type = this.container.type;

            if ((type == "row" && (dir == "left" || dir == "right"))
            || (type == "col" && (dir == "top" || dir == "bottom")))
            {
                if (dir == "right" || dir == "bottom")
                    i++;
                this.container.child.splice(i, 0, new Tile('', '100'));
            }
            else
            {
                var last = this.container.child[i];
                var newContainer = new Container(this.container.type == 'row' ? 'col' : 'row',
                    last.flex,
                    ((type == "row" && dir == "right") || (type == "col" && dir == "bottom")) ?
                    [
                        new Tile('', '100'), last
                    ] : 
                    [
                        last, new Tile('', '100'),
                    ]
                );
                this.container.child.splice(i, 1, newContainer);
            }
        },
        tileSelected(index, tileFocus)
        {
            this.tileIndexFocus = index;
            this.$emit('selection', this);
        },
        selection(index, containerFocus)
        {
            this.$emit('selection', containerFocus);
        },
        mouseStart(event, neighbourg)
        {
            this.$emit('selection', {origin: this.container, neighbourg});
        },
        deleteTile(index)
        {
            this.container.child.splice(index, 1);
            if (this.container.child.length == 0)
            {
                this.$emit('deleteContainer', this.index);
            }
            
        },
        deleteContainer(index)
        {
            this.container.child.splice(index, 1);
            if (this.container.child.length == 0)
            {
                this.$emit('deleteContainer', this.index);
            }
        }
    }
}
</script>
<style scoped>

.row
{
    display: flex;
    flex-direction: row;
    min-height: 0;
    min-width: 0;
    position: relative;
}

.col
{
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    min-width: 0;
    position: relative;
}

.over
{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.left{left: 0}
.right{right: 0}
.top{top: 0}
.bottom{bottom: 0}

.left, .right, .top, .bottom{
    opacity: 1;
    position: absolute;
    z-index: 8;
    transition: 0.2s;
}
.left:hover, .right:hover, .top:hover, .bottom:hover
{
    opacity: 1;
}
.left, .right{
    height: 100%;
    width: 10px;
    top:0;
    background-color: white;
}
.top, .bottom{
    width: 100%;
    height: 10px;
    left: 0;
    background-color: white;
}

</style>