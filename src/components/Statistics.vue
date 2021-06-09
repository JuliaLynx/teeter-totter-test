<template>
  <div class="stats">
    <div class="stats__row">
      <div class="stats__col">
        <p class="stats__text">Weight left</p>
        <p class="stats__number">{{figuresWeightLeft}}</p>
      </div>
      <div class="stats__col">
        <p class="stats__text">Weight right</p>
        <p class="stats__number">{{figuresWeightRight}}</p>
      </div>
      <div class="stats__col">
        <p class="stats__text">Number of figures</p>
        <p class="stats__number">{{figuresNumber + '/' +  maxFiguresNumber * 2}}</p>
      </div>
    </div>
    <div class="stats__row">
      <div class="stats__col">
        <p class="stats__text">Win</p>
        <p class="stats__number">{{winsCounter}}</p>
      </div>
      <div class="stats__col">
        <p class="stats__text">Defeat</p>
        <p class="stats__number">{{defeatsCounter}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';

  export default {
    name: 'Statistics',
    computed: {
      ...mapState(['figureCounterRight', 'figureCounterLeft', 'maxFiguresNumber', 'winsCounter', 'defeatsCounter']),
      ...mapGetters(['figuresWeightLeft', 'figuresWeightRight']),

      figuresNumber() {
        return Math.max(this.figureCounterRight + this.figureCounterLeft, 0);
      }
    }
  }
</script>

<style scoped lang="scss">
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
  .stats__row{
    display: flex;
    flex-direction: row;
    justify-content: space-around
  }
  .stats__col{
    padding: 10px;
  }
  .stats__text{
    font-size: 12px;
    font-family: sans-serif;
    text-align: center;
    margin: 0;
  }
  .stats__number{
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }
</style>