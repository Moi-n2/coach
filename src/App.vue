<template>
  <the-header></the-header>

	<router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"> </component>
    </transition>
  </router-view>

</template>

<script>
import TheHeader from '@/components/Layout/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
  created(){
   this.$store.dispatch('tryLogin')
  }
}
</script>

<style lang='scss'>
@import './assets/scss/base.scss';

* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: inherit;
}

a {
  text-decoration: none;
  color: #222;
}

body {
  min-width: 320px;
  background-color: #f8f8fa;
  margin: 0 auto;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}



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
}
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

.invalid label,
.invalid p{
  color: #e03131;
}

.invalid input,
.invalid textarea{
  border:1px solid #e03131;
}

.route-enter-from{
  opacity: 0;
  transform: translateY(-20px);
}
.route-leave-to{
  opacity: 0;
  transform: translateY(20px);
}

.route-enter-active{
  transition: all 0.3s ease-out;
}

.route-leave-active{
  transition: all 0.3s ease-in;
}

.route-leave-from,
.route-enter-to{
  opacity: 1;
  transform: translateY(0);
}

</style>
