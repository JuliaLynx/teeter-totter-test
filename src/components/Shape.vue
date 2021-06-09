<template>
  <div>
    <div
        class="shape"
        :class="[`shape-${form}`]"
        :style="`left: ${positionLeft};
                  right: ${positionRight};
                  background-color: ${color};
                  width: calc(30px + ${weight * 3}px);
                  height: calc(30px + ${weight * 3}px);
                  border-color: transparent transparent ${color} transparent;
                  border-width: 0 calc((30px + ${weight * 3}px)/2) calc(30px + ${weight * 3}px) calc((30px + ${weight * 3}px)/2);
                  bottom: ${isStatic ? 0 : bottom}px;`"
    >
      <span
          :style="`bottom: calc(-1 * (30px + ${weight * 3}px)/2 - 15px);
                left: calc(-1 *(30px + ${weight * 3}px)/2);
                width: calc(30px + ${weight * 3}px);`"
      >
        {{`${weight} kg`}}
      </span>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';

  export default {
    name: 'Shape',

    props: ['id', 'weight', 'position', 'color', 'form', 'isStatic'],

    data: () => ({
      bottom: 400,
      positionX: 0,
      fallInterval: {},
    }),

    computed: {
      ...mapState(['isPause', 'isAuto', 'plankAngle']),
      ...mapGetters(['figuresWeightRight', 'figuresWeightLeft', 'figuresWeightLeftWithoutLast']),

      isFallen() {
        return this.bottom <= 0;
      },

      positionLeft() {
        return this.isStatic ? 'auto' : `${this.positionX * 20}%`;
      },

      positionRight() {
        return this.isStatic ? `${this.position * 20}%` : 'auto';
      }
    },

    methods: {
      ...mapActions(['fallNewFigure', 'addNewPosition']),

      fallAnimate() {
        if (this.isStatic) {

          return;
        }

        this.fallInterval = setInterval(() => {
          if(this.bottom > 0) {
            this.bottom = this.isPause ? this.bottom : this.bottom - 10;
          } else {
            clearInterval(this.fallInterval);

            this.fallNewFigure();
          }
        }, 600 / (this.id + 1));
      },

      /**
       * @param {object} e
       */
      changePosition(e) {
        if(this.isFallen || this.isPause || this.isStatic) {

          return;
        }

        if(!this.isAuto)  {

          if(e.keyCode === 37 && this.positionX > 0) {
            this.positionX--;
          }

          if(e.keyCode === 39 && this.positionX < 4) {
            this.positionX++;
          }
        }

        if(e.keyCode === 40 && this.bottom > 30) {
          this.bottom = this.bottom - 30;
        }

        this.addNewPosition({id: this.id, position: this.positionX});
      },

      autoPosition() {
        if(this.isAuto) {
          this.positionX = 5 - Math.round((this.figuresWeightRight - this.figuresWeightLeftWithoutLast) / this.weight);

          if(this.positionX >= 4) {
            this.positionX = 4;
          }

          if(this.positionX <= 0) {
            this.positionX = 0;
          }

          this.addNewPosition({id: this.id, position: this.positionX});
        }
      }
    },

    mounted() {
      this.fallAnimate();
      this.positionX = this.position;
      this.autoPosition();
    },

    created() {
      window.addEventListener('keydown', this.changePosition);
    },

    destroyed() {
      clearInterval(this.fallInterval);
    }
  }
</script>

<style scoped lang="scss">
  .shape{
    position: absolute;
    bottom: 0;
    opacity: 0.8;
    display: block;
    width: 30px;
    height: 30px;
    &-square{
      span{
        left: 0 !important;
        bottom: unset !important;
      }
    }
    &-circle{
       border-radius: 50%;
      span{
        left: 0 !important;
        bottom: unset !important;
      }
    }
    &-triangle{
       width: 0 !important;
       height: 0 !important;
       border-style: solid;
       background-color: rgba(0,0,0,0,) !important;
      span{
        top: auto !important;
        transform: none !important;
      }
    }
    span{
      font-size: 70%;
      color: #000;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin: 0 auto;
      transform: translate(0,-50%);
      display: block;
      text-align: center;
    }
  }
</style>