<template>
  <div id="app">
    <nuxt-link to="/home">
      <Button class="button">ENTRER</Button>
    </nuxt-link>
    
  </div>
  
</template>

<script>
export default {
  name: 'EnterPanel',
  props: {
  },
  components: {
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  width: 100vw; 
  margin: 0;
  padding: 0;
  background: url("../assets/images/V1.png") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#enter:hover
{
  box-shadow: 0px 2px 20px 0px black;
}

a{
  text-decoration: none;
  color: white;
}

.button
{
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  height: 5vh;
  position: absolute;
  left: 0;
  right: 0;
  top: 65%;
  bottom: 0;
  min-height: 65px;

  font-family: 'acumin', sans-serif;
  font-weight: 300;
  font-size: 1.3em;
  color: black;
  background-color: #ffffff44;
}

</style>