<template>
  <main>
    <div class="base-card">
      <h2>Requests Received</h2>

      <base-spinner v-if="isLoading"></base-spinner>
         
        <div v-else-if="requests.length" class="request-item" v-for="req in requests" :key="req.id">
          <a :href="`mailto:${req.email}`">{{req.email}}</a>
          <p>
            {{req.message}}
          </p>
        </div>

      <div class="no-request" v-else>
        No request received yet!
      </div>
    </div>
  </main>
</template>

<script>
export default {
  created(){
    if(!this.$store.getters['requests/shouldFetch']){
      return
    }
    this.loadRequests()
  },

  data(){
    return{
      isLoading:false,
      error:null,
    }
  },
  
  computed:{
    requests(){
      return this.$store.getters['requests/requests']
    },
  },

  methods:{
    async loadRequests(){
      this.isLoading = true

      try {
        await this.$store.dispatch('requests/fetchRequests')
      } catch (error) {
        this.error = error.message
      }

      this.isLoading = false

  }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/base.scss';
.base-card{
  display: flex;
  flex-direction: column;
  align-items: center;

  h2{
    margin: 1rem auto;
  }
  
  .request-item{
    width: 100%;
    border: 1px solid $color-black;
    padding:1rem;
    margin: 1rem auto;

    a{
      margin:none;
      color: $color-purple;
      font-size:1.3rem;
      font-weight: 700;
    }

    a:hover,
    a:visited{
      color:$color-pink;
    }

    p{
      margin:0.5rem 0;
    }
  }
}

</style>