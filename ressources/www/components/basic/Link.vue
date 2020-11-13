<template>
    <div id="links" :class="$mq == 'desktop' ? 'links-desktop' : 'links-mobile'">
        <a class="link" :href="instagram"><img :style="styleImg" src="~/assets/images/Logos2a.png"></a>
        <a class="link" :href="facebook"><img :style="styleImg" src="~/assets/images/Logos2b.png"></a>
        <a class="link" :href="mail"><img :style="styleImg" src="~/assets/images/Logos2c.png"></a>
    </div>
</template>
<script>
export default {
    props: {
        facebook: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
        mail: {
            type: String,
            required: false,
        },
        size: {
            type: String,
            default: "30px",
        }
    },
    computed: {
        styleImg(){
            return {
                width: this.size,
                height: this.size,
            }
        }
    }
}
</script>
<style scoped>

img{
    margin: 0 10px;
}
a{
    display: block;
}

div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-items: stretch;
}

.links-desktop
{
    justify-content: left;
    padding-left: 40px;
}

.links-desktop *:nth-child(1)
{
    margin-left: 0;
}

.links-mobile
{
    justify-content: center;
}

.link
{
   transition: 0.4s; 
}

.link:hover
{
    opacity: 1 !important;
}

#links:hover > *
{
    opacity: 0.5;
}

</style>