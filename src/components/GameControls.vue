<template>
  <div class="game-controls">
    <div class="game-controls__main">
      <div class="game-controls__btn">
        <button @click="addPause(!isPause)" :disabled="!isStart">{{ isPause ? 'Continue' : 'Pause' }}</button>
        <button @click="resetSesion" :disabled="!isStart">Reset</button>
      </div>
      <div class="game-controls__auto">
        <span  class="switch__label">Auto Mode</span>
        <label  class="switch">
          <input @change="autoMode(!isAuto)" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="game-controls__start">
      <button @click="fallNewFigure" :disabled="isStart">Start</button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'GameControls',
    computed: {
      ...mapState(['isPause', 'isStart', 'isAuto']),
    },
    methods: {
      ...mapActions(['fallNewFigure', 'addPause', 'resetSesion', 'autoMode']),
    }
  }
</script>

<style scoped lang="scss">
  .game-controls {
    display: flex;
    flex-direction: row;
    z-index: 10;
    position: relative;
    width: 70vw;
  }
  .game-controls__main{
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    button{
      min-width: 80px;
      height: 30px;
      margin-right: 10px;
      background-color: #fff;
      border: solid 1px #2196F3;
      border-radius: 5px;
      font-size: 16px;
    }
  }
  .game-controls__btn{
    margin-bottom: 10px;
  }
  .game-controls__start{
    button{
      width: 150px;
      height: 30px;
      background-color: #fff;
      border: solid 1px #2196F3;
      border-radius: 5px;
      font-size: 16px;
    }
  }
  .game-controls__auto{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .switch__label{
    margin-right: 10px;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  input:checked + .slider {
    background-color: #2196F3;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  .slider.round {
    border-radius: 34px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
</style>