<template>

    <div id="content">
        
        <Menu v-model="openSidebarMenu" :dir="directions" home="/home" :width="sidebarWidth">
            <img class="logo" src="~/assets/images/Logo1.png" style="width: 100%" />
        </Menu>
        <div id="body-content" :style="($mq) ? '' : mobile-body-content">
            <AdminStatus v-if="isAdmin" />
            <div v-if="$mq == 'mobile'" style="position: relative;">
                <nuxt-link to="/home">
                    <img class="logo-home" src="~/assets/images/Logo1.png"/>
                </nuxt-link>
                <img v-if="$mq == 'mobile'" @click="openSidebarMenu = !openSidebarMenu" class="button-menu" src="~assets/menu.png"/>
            </div>

            <nuxt-child />
        </div>
        <InfoBox/>
    </div>
</template>
<script>
import adminStatus from '~/mixins/adminStatus.js';
export default {
    mounted()
    {
        this.$store.dispatch('self');
    },
    props: {
        directions: {
            type: Array,
            required: false,
        },
    },
    data()
    {
        return {
            sidebarWidth: "25%",
            openSidebarMenu: false,
        }
    },

    computed: {
        isAdmin()
        {
            return this.$store.state.user && this.$store.state.user.isAdmin;
        }
    },
    mixins: ['adminStatus']
}
</script>

<style>
@font-face {
    font-family: "acumin";
    src: url('~assets/fonts/acumin-pro/AcuminVariableConcept.otf') format('opentype');
}

@font-face {
    font-family: "Roboto";
    src: url('~assets/fonts/Roboto/Roboto-Medium.ttf') format('truetype');
}

::selection {
  background: #acbbcc;
  color: white; 
}

#content
{
    display: flex;
    flex-direction: row;
}

p, body, input
{
    font-family: acumin, sans-serif;
    font-size: 1.2sem;
    font-weight: 200;
}

header
{
    font-family: acumin, sans-serif;
    font-weight: 100;
    font-size: 3.6em;
}

#body-content
{
    width: 100%;
    margin: 4%;
    margin-bottom: 10%;
    z-index: 3;
    overflow: hidden;
    position: relative;
}

.button-menu
{
    position: absolute;
    left: 1%;
    top: 0.3%;
    width: 40px;
    height: 40px;
    cursor: pointer;
}

#mobile-body-content
{
    width: 100%;
    z-index: 3;
    overflow: hidden;
}

img
{
    width: 200px;
    height: auto;
}

.logo
{
    width: 100%;
    height: auto;
}

.logo-home
{
    width: 70%;
    margin: 0 15%;
    padding-top: 20px;
    position: relative;
}
</style>