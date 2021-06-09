<template>
  <div id="app">
    <Game />
    <EndPopUp />
  </div>
</template>

<script>
  import Game from '@/components/Game';
  import EndPopUp from '@/components/EndPopUp';

  export default {
    name: 'App',
    components: {
      Game,
      EndPopUp
    }
  }
</script>

<style lang="scss">
  body{
    font-family: Arial, sans-serif;
  }
</style>
