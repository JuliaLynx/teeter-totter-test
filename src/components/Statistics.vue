<template>
  <div class="stats">
    <div class="stats_row">
      <div class="stats_col">
        <p class="stats_text">Weight left</p>
        <p class="stats_number">{{figuresWeightLeft}}</p>
      </div>
      <div class="stats_col">
        <p class="stats_text">Weight right</p>
        <p class="stats_number">{{figuresWeightRight}}</p>
      </div>
      <div class="stats_col">
        <p class="stats_text">Number of figures</p>
        <p class="stats_number">{{figuresNumber + '/' +  maxFiguresNumber * 2}}</p>
      </div>
    </div>
    <div class="stats_row">
      <div class="stats_col">
        <p class="stats_text">Win</p>
        <p class="stats_number">{{winsCounter}}</p>
      </div>
      <div class="stats_col">
        <p class="stats_text">Defeat</p>
        <p class="stats_number">{{defeatsCounter}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'Statistics',
    computed: {
      ...mapState(['figureCounterRight', 'figureCounterLeft', 'maxFiguresNumber', 'winsCounter', 'defeatsCounter']),
      ...mapGetters(['figuresWeightLeft', 'figuresWeightRight']),
      figuresNumber(){
        return Math.max(this.figureCounterRight + this.figureCounterLeft, 0)
      }
    }
  }
</script>

<style scoped>
  .stats{
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    background-color: #fff;
    border: solid 1px #2196F3;
    border-radius: 5px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .stats_row{
    display: flex;
    flex-direction: row;
    justify-content: space-around
  }
  .stats_col{
    padding: 10px;
  }
  .stats_text{
    font-size: 12px;
    font-family: sans-serif;
    text-align: center;
    margin: 0;
  }
  .stats_number{
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }
</style>