import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    items: []
  },

  mutations: {

    FETCH_ITEMS(state, items) {
      state.items = items
    }

  },

  actions: {

    fetchData({commit}) {
      fetch('http://localhost:3000/items')
      .then(res => { return res.text() })
      .then(data => { commit('FETCH_ITEMS', JSON.parse(data)) })
    },

    deleteItem({dispatch}, itemID) {
      fetch(`http://localhost:3000/items/${itemID}`, { method: 'DELETE'})
      .then(res => { return res.text() })
      .then(() => { dispatch('fetchData') })
    }

  }

})
