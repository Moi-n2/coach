<template>
  <main>
    <div class="base-card not-found">
      Page not found, let's check 
      <router-link to="/coaches">'Coaches'</router-link>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>

.not-found{
  font-size:1.5rem;
  text-align: center;
  a{
    color:#5f3dc4;
    font-weight: 700;
  }
}


</style>
