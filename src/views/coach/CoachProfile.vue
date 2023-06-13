<template>
<main>
  <base-dialog :show="!!error" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>

  <base-spinner v-if="isLoading"></base-spinner>

    <base-pannel 
    v-else-if="!!selectedCoach"
    class="base-card"
  :firstname="selectedCoach.firstName"
  :lastname="selectedCoach.lastName"
  :rate="selectedCoach.hourlyRate"
  :areas="selectedCoach.areas">
  
   <p>
    {{selectedCoach.description}}
  </p>
  
  <h2>
    Interested? Reach out Now!
  </h2>
  <base-button link :to="`/coaches/${id}/contact`" mode="filled">Contact</base-button>

  <!-- <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"> </component>
    </transition>
  </router-view> -->

  <router-view></router-view>

 </base-pannel>

 <h2 v-else>No coach found!</h2>
</main>
</template>

<script>
export default {
  props:['id'],
  data(){
    return{
      error:null,
      isLoading:false,
    }
  },
  created(){
    if(this.$store.getters['coaches/shouldFetch']){
      this.fetchCoaches()
    }
  },
  computed:{
    selectedCoach(){
      return this.$store.getters['coaches/coaches'].find(coach=>coach.id === this.id)
    }
  },
  methods:{
    async fetchCoaches(){

      this.isLoading = true
     try {
       await this.$store.dispatch('coaches/fetchCoachById')
     } catch (error) {
      this.error =error.message || 'Error happens, please try again later!'
     }
      this.isLoading = false
    }
  }

}
</script>

<style lang="scss" scoped>
.base-pannel{
  border:none;
}

  p{
  font-size: 1.5rem;
  display: block;
  margin-top:1rem;
}
h2{
   display: inline-block;
  margin: 1.5rem 0.5rem 1.5rem 0;
  button,
  a{
    display: inline-block;
  }
}
</style>