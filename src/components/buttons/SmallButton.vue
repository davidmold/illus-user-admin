<template>
  <div class="nav-button" v-on:click="handleClick" :class="{ large : large, sel: (sel || loading), brown: brown, lower: lower }">
    <div :class="{inviz: loading}" class="btn-slot"><slot></slot></div>
    <div class="loader-icon" v-show="loading" />
  </div>
</template>

<script>
export default {
  props: {
    large: Boolean,
    sel: Boolean,
    loading: Boolean,
    brown: Boolean,
    lower: Boolean
  },
  methods: {
    handleClick: function () {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
.inviz{
  opacity:0;
}
.nav-button{
    display:inline-block;
    border-radius:5px;
    background-color:#a7aba1;
    color:#fff;
    font-size:14px;
    line-height:14px;
    padding:5px 15px!important;
    margin-right:3px;
    cursor:pointer;
    transition:all 0.15s ease;
    position:relative;
    user-select: none;
    white-space: nowrap;
  }

  .btn-slot{
    padding:0;
  }

  .nav-button.lower{
    text-transform: lowercase;
  }

  .nav-button.brown:hover{
    background-color:#8b6f4b;
  }

  .nav-button.sel{
    background-color:#ce0e2d;
  }

  .nav-button:last-child{
    margin-right:0;
  }

  .nav-button.large{
    font-size:17px;
    line-height:20px;
    margin-left:5px;
  }

  .nav-button.large:first-child{
    margin-left:0;
  }

  .nav-button:hover{
    background-color:#ce0e2d;
  }

  .nav-button:active{
    background-color:#000;
  }

  .slot-holder.hidme{
    opacity:0;
  }

  .loader-icon{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    user-select: none;
    pointer-events: none;
    background-image:url('/admin/img/x-spinner.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 60%;
    animation: rotateme 1s infinite linear;
    display:block;
  }

  @keyframes rotateme {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

@media screen and (max-width:640px)
{
  .nav-button.hide-tiny{
    display:none;
  }

  .nav-button.large{
    margin-left:0;
    margin-right:5px;
    margin-bottom:5px;
  }
}
</style>
