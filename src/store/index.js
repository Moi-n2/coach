import { createStore } from 'vuex'

import coaches from './coaches'
import requests from './requests'
import auth from './auth'

export default createStore({

  modules: {
    coaches,
    requests,
    auth

  },


})
