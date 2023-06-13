<template>
  <teleport to="body">

    <div v-if="show" class="backdrop" @click="tryClose"></div>

    <transition name="dialog">

      <dialog open v-if="show">

        <header>
          <slot name="header">
            <h2>{{title}}</h2>
          </slot>
        </header>

        <section>
          <slot></slot>
        </section>

        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>

      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits:['close'],
  props:{
    show:{
      type:Boolean,
      required:true
    },
    title:{
      type:String,
      default:'Something went wrong!'
    },
    fixed:{
      type:Boolean,
      default:false,
    }
  },
  methods:{
    tryClose(){
      if(this.fixed){
        return;
      }
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/base.scss';

.backdrop{
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba($color: #000000, $alpha: 0.75);
  z-index: 10;
  backdrop-filter: blur(4px);
}

dialog{
  position: fixed;
  top:20vh;
  margin: 0 auto;
  max-width: inherit;
  width: 90%;
  z-index: 100;

  border-radius: 1.2rem;
  border:0.3rem solid $color-purple;

  header{
  display: flex;
  background: $color-purple;
  padding: 1.6rem;
  h2{
    color: white;
  }
 }

 section {
	padding: 1.6rem;
	margin: 0;
	margin-top: 1.6rem;
}

menu {
	padding: 1.6rem;
	display: flex;
	justify-content: flex-end;
	margin: 0;
}
}

.dialog-enter-from {
	opacity: 0;
	transform: scale(0.8) translateY(-40px);
}

.dialog-leave-to {
	opacity: 0;
	transform: scale(0.8) translateY(40px);
}

.dialog-enter-active {
	transition: all 250ms;
}

.dialog-leave-active {
	transition: all 250ms ease-in;
}



</style>