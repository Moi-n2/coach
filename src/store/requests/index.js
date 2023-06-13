export default {
  namespaced: true,
  state() { 
    return {
      requests: [],
      fetchTime:''
    }
  },
  mutations: { 
    addRequest(state, payload) { 
      state.requests.push(payload)
    },

    fetchRequests(state, payload) {
      state.fetchTime = Date.now()
      state.requests = payload
    }
  },
  actions: { 
    async addRequest(context, data) { 
      const { coachId, email,message } = data

       const response = await fetch(`https://find-a-coach-629de-default-rtdb.firebaseio.com/requests/${coachId}.json`, {
        method: 'POST',
         body: JSON.stringify({
           email,
           message
         })
       })
      
      const responseData = response.json()

      if (!response.ok) { 
        const error = new Error(responseData.message || 'Failed to add request!')

        throw error
      }

      context.commit('addRequest', {
        id: responseData.name,
        ...data,
      })
    },

    async fetchRequests(context) { 
      const coachId = context.rootGetters.userId

      const token = context.rootGetters.token
      const response = await fetch(`https://find-a-coach-629de-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+ token)

      const responseData = await response.json()

      if (!response.ok) { 
        const error = new Error(responseData.message || 'Failed to fetch requests!')
        throw error
      }

      const requests = []

      for (let key in responseData) { 
        
          const request = {
            id:key,
            coachId,
            ...responseData[key]
          }
          requests.push(request)
        
      }
      context.commit('fetchRequests', requests)

    }
  },
  getters: { 
    requests(state, _,_2,_3) {
      return state.requests
    },
    shouldFetch(state) { 
      return (Date.now() - state.fetchTime)> 60*1000
    }
   }
}