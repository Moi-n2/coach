let timer= ''

export default {

  state() {
    return {
      userId: '',
      token: '',
      tokenExpiresIn: '',
    }
  },

  getters: {
    userId(state) {
      return state.userId
    },
    hasToken(state) { 
      return !!state.token
    },
    token(state){
      return state.token
    }
  },

  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId
      state.token = payload.token
    },
    logout(state) { 
      state.userId = ''
      state.token = ''
      state.tokenExpiresIn = ''

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiresIn')

      clearTimeout(timer)
    }
  },

  actions: {

    async auth(context, data) {
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVU703NlQWQGj0XxjBlaTMFOcIm5R9H90'

      let errorMessage= 'Fail to set user!'

      if (data.mode === 'Login') { 
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVU703NlQWQGj0XxjBlaTMFOcIm5R9H90'
        errorMessage= 'Fail to login'
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password:data.password,
          returnSecureToken: true
        })
      })

      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage )
        throw error
      }

      const user = {
        userId: responseData.localId,
        token: responseData.idToken,
      }
      
      const expiresIn = responseData.expiresIn * 1000
      const tokenExpiresIn = expiresIn + Date.now()


      localStorage.setItem('token',user.token)
      localStorage.setItem('userId',user.userId)
      localStorage.setItem('tokenExpiresIn',tokenExpiresIn)
  
      context.commit('setUser', user)

      timer = setTimeout(function () { 
        context.commit('logout')
      }, expiresIn)

    },

    tryLogin(context) { 
      
      const tokenExpiresIn = localStorage.getItem('tokenExpiresIn')

      const expiresIn = +tokenExpiresIn - Date.now()
      
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      
      if (expiresIn < 0 || !token || !userId) { 
        return
      }

      context.commit('setUser', {
        token,
        userId
      })

      timer = setTimeout(function () { 
          context.commit('logout')
        }, expiresIn)
    }
  },

}