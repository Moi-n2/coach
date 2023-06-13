<template>
  <form class="base-pannel" @submit.prevent="sendMessage">
    
    <div class="form-control" :class="{invalid: !email.isValid}">
        <label for="email">Your Email:</label>
        <input type="text" id="email" v-model.trim="email.val" @blur="clearValidate('email')">
        <p v-if="!email.isValid">Email  address is not valid!</p>
    </div>
    
    <div class="form-control" :class="{invalid: !message.isValid}">
        <label for="message">Message:</label>
        <textarea name="message" id="message"  rows="10" v-model.trim="message.val" @blur="clearValidate('message')"></textarea>
        <p v-if="!message.isValid">Message can not be empty!</p>
    </div>

    <base-button mode="filled">Send Message</base-button>

  </form>
  
</template>

<script>
export default {
  props:['id'],
  data(){
    return{
      formValid:true,
      email:{
        val:'',
        isValid:true
      },
      message:{
        val:'',
        isValid:true
      }
    }
  },
  methods:{
     clearValidate(input){
      this[input].isValid = true
    },
    validateForm(){
      this.formValid=true
      if(!this.email.val || !this.email.val.includes('@')){
        this.email.isValid = false
        this.formValid=false
      }
      if(!this.message.val){
        this.message.isValid=false
        this.formValid = false
      }
    },
    sendMessage(){
      this.validateForm()
      if(!this.formValid){
        return
      }
      console.log(this.$route.params.id);
      const formData = {
        coachId:this.$route.params.id,
        email:this.email.val,
        message:this.message.val
      }
      this.$store.dispatch('requests/addRequest',formData)
      this.$router.replace('/coaches')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/base.scss';

</style>