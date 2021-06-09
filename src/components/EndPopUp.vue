<template>
  <div class="popup" v-if="isEnd || isWin">
    <div class="popup__container">
      <div class="popup__header">{{ isEnd ? 'Game over =(' : 'You win!!!' }}</div>
      <button @click="tryAgain" class="popup__button">Try Again</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'EndPopUp',
    computed: {
      ...mapState(['isEnd', 'isWin']),
    },
    methods: {
      ...mapActions(['tryAgain']),
    }
  }
</script>

<style scoped lang="scss">
  .popup {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
    transition: opacity 0.32s ease;
    z-index: 100;
    display: flex;
    align-items: center;
  }
  .popup__container {
    width: 350px;
    height: 100px;
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.40);
    margin: 0 auto;
    padding: 40px 30px;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .popup__header{
    margin-top: 0;
    color: #2196F3;
    text-align: center;
    font-size: 28px;
  }
  .popup__button {
    width: 150px;
    height: 30px;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #fff;
    border: solid 1px #2196F3;
    border-radius: 5px;
    font-size: 18px;
  }
</style>