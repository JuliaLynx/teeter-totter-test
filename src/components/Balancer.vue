<template>
    <div class="balancer">
      <div class="balancer__base"></div>
      <div class="balancer__plank" :style="`transform: rotate(${plankAngle}deg);`">
        <div class="balancer__left"></div>
        <div class="balancer__right"></div>
      </div>
      <div class="balancer__shapes" :style="`transform: rotate(${plankAngle}deg);`">
        <div class="balancer__shapes--left">
          <Shape
              v-for="item in itemsLeft" :key="item.id"
              :id="item.id"
              :weight="item.weight"
              :position="item.position"
              :color="item.color"
              :form="item.form"
              :isStatic="false"
          />
        </div>
        <div class="balancer__shapes--right">
          <Shape
              v-for="item in itemsRight" :key="item.id"
              :id="item.id"
              :weight="item.weight"
              :position="item.position"
              :color="item.color"
              :form="item.form"
              :isStatic="true"
          />
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Shape from '@/components/Shape';

  export default {
    name: 'Balancer',
    computed: {
      ...mapState(['itemsRight', 'itemsLeft', 'plankAngle'])
    },
    components: {
      Shape
    }
  }
</script>

<style scoped lang="scss">
  .balancer {
    width: 1000px;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 150px;
    margin: 0 auto;
  }
  .balancer__base {
    background-image: url('../assets/base.svg');
    background-position: center center;
    background-size: cover;
    width: 250px;
    height: 170px;
    margin: 0 auto;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      top: -33px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 50px;
      height: 50px;
      display: block;
      background-color: #fff;
      border: solid 5px #000000;
      border-radius: 50%;
      z-index: 10;
    }
  }
  .balancer__plank {
    display: flex;
    flex-direction: row;
    transition: all 1s ease;
  }
  .balancer__left{
    background-color: #000;
    width: 50%;
    height: 10px;
  }
  .balancer__right{
    background-color: #000;
    width: 50%;
    height: 10px;
  }
  .balancer__shapes {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    transition: all 1s ease;
    &--left {
      width: 50%;
      position: relative;
    }
    &--right {
      width: 50%;
      position: relative;
    }
  }
</style>



