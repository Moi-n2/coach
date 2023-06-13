<template>
 <header>
    <router-link to="/"><h1>Find a Coach</h1></router-link>
    
    <nav class="right">
      <router-link to="/coaches">All Coaches</router-link>
      <router-link to="/requests" v-if="hasToken">Requests</router-link>
      <router-link to="/auth" v-else>Login / Signup</router-link>
      <a class="logout" v-if="hasToken" @click="logout">Logout</a>
    </nav>

  </header>
</template>

<script>
export default {
  data(){
    return{
      show:false
    }
  },
  computed:{
    hasToken(){
      return this.$store.getters.hasToken
    }
  },
  methods:{
    logout(){
      this.$store.commit('logout')
      this.$router.replace('/coaches')
    }
  }
}
</script>

<style scoped lang="scss">
$color-black: #212529;
$color-purple:#5f3dc4;
$color-grape:#9c36b5;
$color-pink:#c2255c;
header{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-purple;
  height:10vh;
  padding: 3vh 6vw;
  width: 100%;
  h1{
  color: whitesmoke;
  }
  

 nav{
  // height: 100%;
  a{
    display: inline-block;
    color: whitesmoke;
    
    padding:0.8vh 1vw;
    margin-left: 1vw;
  } 
  a.active,
  a.hover,  
  a.router-link-active{

    border: 1px solid whitesmoke;
  }

  .logout{
    cursor: pointer;
  }
 }
}
</style>