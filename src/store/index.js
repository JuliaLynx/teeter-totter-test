import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const colors = ['#feeeb3', '#c8e5c9', '#b4e5fa', '#d1c4e0', '#f9bcd1'];
const forms = ['square', 'circle', 'triangle'];

export default new Vuex.Store({
  state: {
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

  getters: {
    /**
     * @param {object} state
     */
    figuresWeightLeft (state) {
      return state.itemsLeft.reduce(function(acc, currentValue) {
        return acc + currentValue.weight * (5 - currentValue.position);
      }, 0);
    },

    /**
     * @param {object} state
     */
    figuresWeightRight (state) {
      return state.itemsRight.reduce(function(acc, currentValue) {
        return acc + currentValue.weight * (5 - currentValue.position);
      }, 0);
    },

    /**
     * @param {object} state
     */
    figuresWeightLeftWithoutLast (state) {
      return state.itemsLeft.reduce(function(acc, currentValue) {
        let weight = currentValue.id === state.figureCounterLeft - 1 ? 0 : currentValue.weight;
        return acc + weight * (5 - currentValue.position);
      }, 0);
    }
  },

  actions: {
    /**
     * @param {function} commit
     * @param {object} state
     */
    addLeftFigure ({commit, state}) {
      const data  = {
        id: state.figureCounterLeft,
        weight: Math.floor(Math.random() * 10 ) + 1,
        position: Math.floor(Math.random() * 5 ),
        color: colors[Math.floor(Math.random() * 5 )],
        form: forms[Math.floor(Math.random() * 3)]
      }

      commit('updateLeftFigure', data);
    },

    /**
     * @param {function} commit
     * @param {object} state
     */
    addRightFigure ({commit, state}) {
      const data  = {
        id: state.figureCounterRight,
        weight: Math.floor(Math.random() * 10 ) + 1,
        position: Math.floor(Math.random() * 5 ),
        color: colors[Math.floor(Math.random() * 5 )],
        form: forms[Math.floor(Math.random() * 3)]
      }

      commit('updateRightFigure', data);
    },

    /**
     * @param {function} getters
     * @param {function} commit
     * @param {function} dispatch
     * @param {object} state
     */
    plankBalance ({getters, commit, dispatch, state}) {
      let angle = ((getters.figuresWeightRight - getters.figuresWeightLeft) * 100 / getters.figuresWeightRight) / 2

      if(angle >= 30) {
        angle = 30;
        dispatch('gameEnd');
      }

      if(angle <= -30) {
        angle = -30;
        dispatch('gameEnd');
      }

      commit('updateAngle', angle);

      if(state.figureCounterLeft === state.maxFiguresNumber) {
        dispatch('gameWin');
      }
    },

    /**
     * @param {function} dispatch
     * @param {object} state
     */
    async fallNewFigure({dispatch, state}) {
      await dispatch('plankBalance');

      if(state.isWin) {

        return
      }

      if(!state.isEnd) {
        await dispatch('addRightFigure');
        await dispatch('addLeftFigure');
      }
    },

    /**
     * @param {function} commit
     * @param {object} itemData
     */
    addNewPosition ({commit}, itemData) {
      commit('updatePosition', itemData);
    },

    /**
     * @param {function} commit
     * @param {boolean} value
     */
    addPause ({commit}, value) {
      commit('updatePause', value);
    },

    /**
     * @param {function} commit
     */
    resetSesion ({commit}) {
      commit('updateSesion');
      commit('updateAngle', 0);
    },

    /**
     * @param {function} commit
     */
    gameEnd ({commit}) {
      commit('updateEnd');
    },

    /**
     * @param {function} commit
     */
    gameWin ({commit}) {
      commit('updateWin');
    },

    /**
     * @param {function} commit
     * @param {function} dispatch
     */
    async tryAgain ({commit, dispatch}) {
      commit('updateEnd', false);
      commit('updateWin', false);
      await dispatch('resetSesion');
      await dispatch('fallNewFigure');
    },

    /**
     * @param {function} commit
     * @param {boolean} value
     */
    autoMode ({commit}, value) {
      commit('updateMode', value);
    }
  },

  mutations: {
    /**
     * @param {object} state
     * @param {object} data
     */
    updateLeftFigure (state, data) {
      state.itemsLeft.push(data);
      state.figureCounterLeft++;
      state.isStart = true;
    },

    /**
     * @param {object} state
     * @param {object} data
     */
    updateRightFigure (state, data) {
      state.itemsRight.push(data);
      state.figureCounterRight++;
    },

    /**
     * @param {object} state
     * @param {number} data
     */
    updateAngle (state, data) {
      state.plankAngle = data;
    },

    /**
     * @param {object} state
     * @param {object} itemData
     */
    updatePosition (state, itemData) {
      state.itemsLeft.map(
        function (item) {
          return item.id === itemData.id ? item.position = itemData.position : item;
        }
      );
    },

    /**
     * @param {object} state
     * @param {boolean} value
     */
    updatePause (state, value) {
      state.isPause = value;
    },

    /**
     * @param {object} state
     */
    updateSesion (state) {
      state.itemsLeft = [];
      state.itemsRight = [];
      state.isStart = false;
      state.isPause = false;
      state.figureCounterLeft = 0;
      state.figureCounterRight = 0;
    },

    /**
     * @param {object} state
     * @param {boolean} value
     */
    updateEnd (state, value = true) {
      state.isEnd = value;
      state.isPause = value;
      value ? state.defeatsCounter++ : state.defeatsCounter;
    },

    /**
     * @param {object} state
     * @param {boolean} value
     */
    updateWin (state, value = true) {
      state.isWin = value;
      state.isPause = value;
      value ? state.winsCounter++ : state.winsCounter;
    },

    /**
     * @param {object} state
     * @param {boolean} value
     */
    updateMode (state, value = true) {
      state.isAuto = value;
    }
  }
});
