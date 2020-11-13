<template>
    <div style="display: flex">
        <Menu v-model="openSidebarMenu" :dir="directions" home="/admin/manage" title="Espace Azurees" :width="sidebarWidth">
            <img class="logo" src="~/assets/images/Logo1.png" style="width: 100%" />
        </Menu>
        <div id="body-content" :style="bodyContentStyle">
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
export default {
    middleware: 'auth',
    mounted() {
        this.$store.dispatch('self');
    },
    data: function()
    {
        return {
            directions: [
                {
                    name: "Accueil",
                    path: "/admin/manage/"
                },
                {
                    name: "Artistes",
                    path: "/admin/manage/users",
                },
                {
                    name: "Evenements",
                    path: "/admin/manage/events",
                },
                {
                    name: "Message Contact",
                    path: "/admin/manage/contact",
                },
                {
                    name: "Personnal Account",
                    path: "/admin/manage/account",
                },
                {
                    name: "Site Accueil",
                    path: "/home"
                },
                {
                    name: "Mail",
                    path: "/admin/manage/mail",
                }
            ],
            openSidebarMenu: false,
            sidebarWidth: "25%",
        }
    },
    computed: {
        bodyContentStyle()
        {
            return {"margin-top": "6vh"};
        }
    },

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

p, body, input
{
    font-family: acumin, sans-serif;
    font-weight: 200;
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

#body-content
{
    width: 100%;
    margin: 4%;
}

</style>