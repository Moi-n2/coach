<template>
  <main>
      <base-dialog :show="!!error" @close="handleError">
        <p>{{error}}</p>
      </base-dialog>
      <base-spinner v-if="isLoading"></base-spinner>
      <form  v-else class="base-card" @submit.prevent="submitform">

        <div class="form-control" :class="{invalid:!email.isValid}">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model.trim="email.val" @blur="clearValidate('email')">
          <p v-if="!email.isValid">Email  address is not valid!</p>
        </div>
        
        <div class="form-control" :class="{invalid:!password.isValid}">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model.trim="password.val" @blur="clearValidate('password')">
          <p v-if="!password.isValid">Password should be at least 6 characters</p>
        </div>

        <base-button mode="filled">{{mode}}</base-button>
        
        <p>Do no have an account ? <a @click="switchMode" class="switch-mode"> switch to {{mode==='Signup'?'Login':'Sinup'}}</a></p>
        

      </form>
   
  </main>
</template>

<script>
export default {
  data(){
    return{
      error:null,
      isLoading:false,
      formValid:true,
      email:{
        val:'',
        isValid:true
      },
      password:{
        val:'',
        isValid:true
      },
      mode:'Login'
    }
  },
   methods:{
    handleError(){
      this.error =null
    },
    switchMode(){
      this.mode = this.mode==='Login'?'Signup':'Login'
    },

     clearValidate(input){
      this[input].isValid = true
    },
    validateForm(){
      this.formValid=true
      if(!this.email.val || !this.email.val.includes('@')){
        this.email.isValid = false
        this.formValid=false
      }
      if(this.password.val.length < 6){
        this.password.isValid=false
        this.formValid = false
      }
    },
    async submitform(){
      this.validateForm()
      if(!this.formValid){
        return
      }
      const Data = {
        email:this.email.val,
        password:this.password.val,
        mode:this.mode
      }
        this.isLoading = true
      try {
        await this.$store.dispatch('auth',Data)
        const redirectURL = '/'+ (this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectURL)
        
      } catch (error) {
        this.error =error.message
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang='scss' scoped>

.switch-mode{
  display: inline-block;
  border:1px solid #212529;
  padding: 0.4rem 0.8rem;
  border-radius: 35px;
  font-size: 10px;
    &:hover{
    cursor: pointer;
  }
}

.invalid label,
.invalid p{
  color: #e03131;
}

.invalid input,
.invalid textarea{
  border:1px solid #e03131;
}
</style>