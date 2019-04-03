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
    },

    editItem({dispatch}, data) {
      let item = data.item
      let newValue = data.newValue

      let payload = {
        id: item.id,
        name: item.name,
        description: newValue,
        date: item.date,
        amount: item.amount
      }

      fetch(`http://localhost:3000/items/${item.id}/`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(res => { return res.text() })
      .then(() => { dispatch('fetchData') })
    }

  }

})
