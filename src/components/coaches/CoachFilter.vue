<template>
      <section class="section-choose base-card">
      <h2>Find Your Coach</h2>

      <div class="option">
        <input type="checkbox" name="frontend" id="frontend" @change="setfilter" checked>
        <label for="frontend">Frontend</label>
        </div>
      <div class="option">
        <input type="checkbox" name="backend" id="backend" @change="setfilter" checked>
        <label for="backend">Backend</label>
      </div>
       
      <div class="option">
        <input type="checkbox" name="career" id="career" @change="setfilter" checked>
        <label for="career">Career</label>
      </div>
        
      
    </section>
</template>

<script>
export default {
  emits:['change-filter'],
  data(){
    return{
      filter:{
        frontend:true,
        backend:true,
        career:true
      }
    }
  },
  methods:{
    setfilter(e){
      const inputId= e.target.id;
      const isActive = e.target.checked;

      this.filter= {
        ...this.filter,
        [inputId]:isActive
      };

      this.$emit('change-filter', this.filter)
    }
  }
}
</script>

<style>

</style>