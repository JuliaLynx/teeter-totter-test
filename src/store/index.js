import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const colors = ['#feeeb3', '#c8e5c9', '#b4e5fa', '#d1c4e0', '#f9bcd1'];
const forms = ['square', 'circle', 'triangle'];

export default new Vuex.Store({
  state:{
    itemsLeft: [],
    itemsRight: [],
    figureCounterRight: 0,
    figureCounterLeft: 0,
    plankAngle: 0,
    isPause: false,
    isEnd: false,
    isWin: false,
    isStart: false,
    maxFiguresNumber: 10,
    winsCounter: 0,
    defeatsCounter: 0,
    isAuto: false
  },
  getters:{
    figuresWeightLeft(state){
      return state.itemsLeft.reduce(function(acc, currentValue) {
        return acc + currentValue.weight * (5 - currentValue.position);
      }, 0)
    },
    figuresWeightRight(state){
      return state.itemsRight.reduce(function(acc, currentValue) {
        return acc + currentValue.weight * (5 - currentValue.position);
      }, 0)
    },
    figuresWeightLeftWithoutLast(state){
      return state.itemsLeft.reduce(function(acc, currentValue) {
        let weight = currentValue.id === state.figureCounterLeft - 1 ? 0 : currentValue.weight;
        // console.log(currentValue.id, state.figureCounterLeft, weight * (5 - currentValue.position))
        return acc + weight * (5 - currentValue.position);
      }, 0)
    },
  },
  actions: {
    addLeftFigure({state, commit}){
      const data  = {
        id: state.figureCounterLeft,
        weight: Math.floor(Math.random() * 10 ) + 1,
        position: Math.floor(Math.random() * 5 ),
        color: colors[Math.floor(Math.random() * 5 )],
        form: forms[Math.floor(Math.random() * 3)],
      }
      commit('updateLeftFigure', data);
    },
    addRightFigure({state, commit}){
      const data  = {
        id: state.figureCounterRight,
        weight: Math.floor(Math.random() * 10 ) + 1,
        position: Math.floor(Math.random() * 5 ),
        color: colors[Math.floor(Math.random() * 5 )],
        form: forms[Math.floor(Math.random() * 3)],
      }
      commit('updateRightFigure', data);
    },
    plankBalance({getters, state, commit, dispatch}){
      let angle = ((getters.figuresWeightRight - getters.figuresWeightLeft) * 100 / getters.figuresWeightRight) / 2
      if(angle >= 30){
        angle = 30;
        dispatch('gameEnd')
      }
      if(angle <= -30){
        angle = -30;
        dispatch('gameEnd')
      }
      commit('updateAngle', angle);
      if(state.figureCounterLeft === state.maxFiguresNumber){
        dispatch('gameWin')
      }
    },

    async fallNewFigure({state, dispatch}){
      await dispatch('plankBalance');
      if(state.isWin){
        return
      }
      if(!state.isEnd){
        await dispatch('addRightFigure');
        await dispatch('addLeftFigure');
      }
    },
    addNewPosition({commit}, itemData){
      commit('updatePosition', itemData);
    },
    addPause({commit}, value){
      commit('updatePause', value);
    },
    resetSesion({commit}){
      commit('updateSesion');
      commit('updateAngle', 0)
    },
    gameEnd({commit}){
      commit('updateEnd');
    },
    gameWin({commit}){
      commit('updateWin');
    },
    async tryAgain({dispatch, commit}){
      commit('updateEnd', false);
      commit('updateWin', false);
      await dispatch('resetSesion');
      await dispatch('fallNewFigure');
    },
    autoMode({commit}, value){
      commit('updateMode', value);
    }
  },
  mutations: {
    updateLeftFigure(state, data){
      state.itemsLeft.push(data);
      state.figureCounterLeft++;
      state.isStart = true
    },
    updateRightFigure(state, data){
      state.itemsRight.push(data);
      state.figureCounterRight++;
    },
    updateAngle(state, data){
      state.plankAngle = data
    },
    updatePosition(state, itemData){
      state.itemsLeft.map(
          function(item){
            return item.id === itemData.id ? item.position = itemData.position : item
          }
      )
    },
    updatePause(state, value){
      state.isPause = value
    },
    updateSesion(state){
      state.itemsLeft = [];
      state.itemsRight = [];
      state.isStart = false;
      state.isPause = false;
      state.figureCounterLeft = 0;
      state.figureCounterRight = 0;
    },
    updateEnd(state, value = true){
      state.isEnd = value;
      state.isPause = value;
      value ? state.defeatsCounter++ : state.defeatsCounter
    },
    updateWin(state, value = true){
      state.isWin = value;
      state.isPause = value;
      value ? state.winsCounter++ : state.winsCounter
    },
    updateMode(state, value = true){
      state.isAuto = value;
    }
  }
})
