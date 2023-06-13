<template>
  <li class="base-pannel">
          <div class="breif">
            <div class="name">
              {{name}}
            </div>
            <div class="rate">
              ${{rate}}/hour
            </div>
            <div>
              <base-badge 
              v-for="area in areas" :key="area"
              :text="area"></base-badge>
            </div>
            <slot></slot>
            
          </div>
        </li>
</template>

<script>
export default {
  props:["firstname","lastname","rate","areas","id"],
  computed:{
    name(){
      return this.firstname +' '+ this.lastname 
    },

  }

}
</script>

<style lang='scss' scoped>
// @import '../assets/scss/base.scss';


</style>