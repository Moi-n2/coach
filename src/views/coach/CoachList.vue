<template>
  
  <main>
    <base-dialog :show="!!error" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
    <CoachFilter @change-filter="setFilter"></CoachFilter>

    <section class="base-card">
      <div class="function">
        <base-button mode="outline" @click="fetchCoaches">Refresh</base-button>
        <base-button link to="/auth?redirect=register" mode="filled" v-if="!hasToken">Login to Register as Coach</base-button>
        <base-button link to="/register" mode="filled" v-else-if="!isCoach">Register as Coach</base-button>
      </div>

      <base-spinner v-if="isLoading"></base-spinner>
      
      <ul v-else-if="coaches.length">
        <base-pannel v-for="coach in filterCoaches" :key="coach.id" :firstname="coach.firstName" :lastname="coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas"
        :id="coach.id">
        <div class="more">
              <base-button link :to="`/coaches/${coach.id}/contact`" mode="outline">Contact</base-button>
              <base-button link :to="`/coaches/${coach.id}`" mode="filled">View Details</base-button>
            </div>
        </base-pannel>
      </ul>

      <h2 v-else>No coaches found yet!</h2>
    </section>

  </main>
</template>

<script>
import CoachFilter from '@/components/coaches/CoachFilter.vue'
export default {
  components:{
    CoachFilter
  },
  data(){
    return {
      error:null,
      isLoading:false,
      activeFilter:{
        frontend:true,
        backend:true,
        career:true
      }
    }
  },

  created(){
    if(!this.$store.getters['coaches/shouldFetch']){
      return
    }
    this.fetchCoaches()
  },

  computed:{
    hasToken(){
      return this.$store.getters.hasToken
    },
    coaches(){
      return this.$store.getters['coaches/coaches']
    },
    filterCoaches(){
      return this.coaches.filter(coach=>{
        if(this.activeFilter.frontend && coach.areas.includes("frontend")){
          return true
        }
        if(this.activeFilter.backend && coach.areas.includes("backend")){
          return true
        }
        if(this.activeFilter.career && coach.areas.includes("career")){
          return true
        }
        return false
      })
    },
    isCoach(){
      return this.$store.getters['coaches/isCoach']
    }
  },
  methods:{
    handleError(){
      this.error = null
    },
    setFilter(updatedFilter){
      this.activeFilter = updatedFilter
    },
    async fetchCoaches(){

      this.isLoading = true
     try {
       await this.$store.dispatch('coaches/fetchCoaches')
     } catch (error) {
      this.error =error.message || 'Error happens, please try again later!'
     }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/base.scss';
main{
  margin-top: 10vh;
  padding: 5vh 20%;
  
  section{
    margin-bottom: 2rem;
    h2{
      font-size: large;
      font-weight: bolder;
      margin-bottom: 1.5rem;
    }
    .option{
      display: inline-block;
      margin-right: 1rem;
      input{
        vertical-align: middle;
        margin-right: 0.5rem;
      }
    }
    .function{
      display: flex;
      justify-content: space-between;

      margin-bottom: 1.5rem;

      // .btn-register{
      // background-color: $color-purple;
      // color: whitesmoke;
    }
    }
    ul{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .more{
  float:right;
  margin-top: 1.5rem;
  
  button,
  a{
    margin-left:1rem;
  }
}

</style>
