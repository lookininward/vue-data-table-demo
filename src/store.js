import Vue from 'vue'
import Vuex from 'vuex'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from './graphql/mutations'
import * as queries from './graphql/queries'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    items: []
  },

  mutations: {

    FETCH_ITEMS(state, items) {
      state.items = items.data.listItems.items
    }

  },

  actions: {

    async fetchData({commit}) {
      const data = await API.graphql(
        graphqlOperation(queries.listItems, {
          limit: 200
        })
      )
      commit('FETCH_ITEMS', data)
    },

    async deleteItem({dispatch}, itemID) {
      await API.graphql(
        graphqlOperation(mutations.deleteItem, {
          input: {
            "id": itemID
          }
        })
      )

      dispatch('fetchData')
    },

    // batch deleteItem request or make new query
    async deleteSelectedItems({dispatch}, itemIDs) {
      itemIDs.forEach(itemID => {
        API.graphql(
          graphqlOperation(mutations.deleteItem, {
            input: {
              "id": itemID
            }
          })
        )
      })
      dispatch('fetchData')
    },

    async editItem({dispatch}, data) {
      const item = data.item
      const newValue = data.newValue

      await API.graphql(
        graphqlOperation(mutations.updateItem, {
          input: {
            "id": item.id,
            "name" : item.name,
            "description" : newValue,
            "date" : item.date,
            "amount" : item.amount
          }
        })
      )

      dispatch('fetchData')
    }

  }

})
