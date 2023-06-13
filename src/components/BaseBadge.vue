<template>
  <span class="bagel" :class="`bagel-${text}`">{{text.toUpperCase()}}</span>
</template>

<script>
export default {
  props:['text'],

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base.scss';

.bagel{
    padding: 5px 10px;
    border-radius: 15px;
    color: whitesmoke; 
    margin-right:0.5rem;
  }
  .bagel-frontend{
    background-color: $color-purple;
     
  }
  .bagel-backend{
    background-color: $color-grape;
  }
  .bagel-career{
    background-color: $color-pink;
  }
</style>