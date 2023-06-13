<template>
  <main>
    <form class="base-card" @submit.prevent="submitForm">
      <h2>Register as a coach now!</h2>
      <div class="form-control" :class="{invalid: !firstName.isValid}">
        <label for="firstname">FirstName:</label>
        <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidate('firstName')">
        <p v-if="!firstName.isValid">FirstName can not be empty!</p>
      </div>

      <div class="form-control" :class="{invalid: !lastName.isValid}">
        <label for="lastname">LastName:</label>
        <input type="text" id="lastname" v-model.trim="lastName.val" @blur="clearValidate('lastName')">
        <p v-if="!lastName.isValid">LastName can not be empty!</p>
      </div>

      <div class="form-control" :class="{invalid: !description.isValid}">
        <label for="description">Description:</label>
        <textarea name="description" id="description"  rows="5" v-model.trim="description.val" @blur="clearValidate('description')"></textarea>
        <p v-if="!description.isValid">Description can not be empty!</p>
      </div>

      <div class="form-control" :class="{invalid: !hourlyRate.isValid}">
        <label for="hourlyrate">Hourlyrate:</label>
        <input type="text" id="hourlyrate" v-model.number="hourlyRate.val" @blur="clearValidate('hourlyRate')">
        <p v-if="!hourlyRate.isValid">Hourlyrate should be above 0!</p>
      </div>

      <div class="form-control" :class="{invalid: !areas.isValid}">
        <h4 for="areas">Areas of Expertise:</h4>

        <div class="option">
        <input type="checkbox" value="frontend" id="frontend" v-model="areas.val" @blur="clearValidate('areas')">
        <label for="frontend">Frontend Development</label>
        </div>

      <div class="option">
        <input type="checkbox" value="backend" id="backend" v-model="areas.val" @blur="clearValidate('areas')">
        <label for="backend">Backend Development</label>
      </div>

      <div class="option">
        <input type="checkbox" value="career" id="career" v-model="areas.val" @blur="clearValidate('areas')">
        <label for="career">Career Development</label>
      </div>
      <p v-if="!areas.isValid">Expertise shoule be at less one!</p>
      </div>

      <base-button mode="filled">Register</base-button>
    </form>
  </main>
</template>

<script>
export default {
  data(){
    return{
        formValid:true,
        firstName:{
          val:'',
          isValid:true
        },
        lastName:{
          val:'',
          isValid:true
        },
        areas:{
          val:[],
          isValid:true
        },
        description:{
          val:'',
          isValid:true
        },
        hourlyRate:{
          val:null,
          isValid:true
        },    
    }
  },
  methods:{
    clearValidate(input){
      this[input].isValid = true
    },
    validForm(){
      this.formValid= true
      if(!this.firstName.val){
        this.formValid = false
        this.firstName.isValid = false
      }
      if(!this.lastName.val){
        this.formValid = false
        this.lastName.isValid = false
      }
      if(!this.description.val){
        this.formValid = false
        this.description.isValid = false
      }
      if(!this.hourlyRate.val || this.hourlyRate.val<0){
        this.formValid = false
        this.hourlyRate.isValid = false
      }
      if(!this.areas.val.length){
        this.formValid = false
        this.areas.isValid = false
      }
      
    },
    submitForm(){
      this.validForm()
      if (!this.formValid){
        return
      }
      const formData = {
        firstName:this.firstName.val,
        lastName:this.lastName.val,
        areas:this.areas.val,
        description:this.description.val,
        hourlyRate:this.hourlyRate.val
      }
      this.$store.dispatch('coaches/registerCoach',formData)
      this.$router.replace('/coaches')
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/base.scss';
.form-control{
  margin: 1rem 0.6rem;
  display: flex;
  flex-direction: column;
  label{
    font-weight: bold;
    margin-bottom: 0.4rem;
  }

  textarea{
    font:inherit;
    border:1px solid #ccc;
  }

  input:focus,
  textarea:focus{
    background-color:#f8f0fc;
    outline: none;
    border:1px solid $color-purple;
  }

  input[type='checkbox']{
    border:none;
  }

  // input[type='checkbox']:focus{
  //   outline: $color-purple solid 1px;
  // }

  .option{
    input{
      vertical-align: middle;
      margin-right: 0.5rem;
    }
  }
}
  button,
  a{
    margin-left:0.6rem;
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
