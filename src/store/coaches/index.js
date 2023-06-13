export default {
  namespaced: true,
  state() { 
    return {
      coaches: [],
      fetchTime: '',
      coachByID: {}
    }
  },
  mutations: { 
    registerCoach(state, payload) { 
      state.coaches.push(payload)
    },

    loadCoaches(state, payload) {
      state.fetchTime = Date.now()
      state.coaches= payload
    },

  },
  actions: { 
    async registerCoach(context, data) { 
      const userId = context.rootGetters.userId
      const coachData = {
        id: userId,
        ...data
      }
      const token = context.rootGetters.token
      await fetch(`https://find-a-coach-629de-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=`+ token, {
        method: 'PUT',
        body:JSON.stringify(coachData)
      })
      
      context.commit('registerCoach',coachData)
    },

    async fetchCoaches(context) { 

      const response = await fetch(`https://find-a-coach-629de-default-rtdb.firebaseio.com/coaches.json`)
      
      const responseData = await response.json()
      
      if (!response.ok) { 
        const error = new Error(responseData.message || 'Failed to fetch')
        throw error
      }
      
      const coaches = []

      for (let key in responseData) { 
        coaches.push(responseData[key])
      }

      context.commit('loadCoaches', coaches)
    },

    async fetchCoachById(context) { 
      return await context.dispatch('fetchCoaches')
    }
  },
  getters: { 
    coaches(state) { 
      return state.coaches
    },
    isCoach(state,getters,rootState,rootGetters) { 
      return getters.coaches.some(coach=>coach.id === rootGetters.userId)
    },
    shouldFetch(state) { 
      if (!state.fetchTime){
        return true
      } else {
        return (Date.now() - state.fetchTime)> 60*1000
      }
      
    }
  }
}