<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>

  <router-link v-else  :to="to" :class="mode">
    <slot></slot>
  </router-link>

</template>

<script>
export default {
  props:{
    to:{
      type:String,
      required: false,
      default:'/'
    },
    link:{
      type:Boolean,
      required:false,
      default:false
    },
    mode:{
      type:String,
      required:false,
      default:'outline'
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base.scss';
button,
a{
  cursor: hand;
  padding: 0.6rem 1rem;
  border-radius: 35px;
  border: 1px solid $color-black;
  font-size: 10px;
  &:hover{
    cursor: pointer;
    
  }
};
.filled{
  background-color: $color-purple;
  color: whitesmoke;
};
.outline{
  background-color: whitesmoke;
}


</style>