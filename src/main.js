import { createApp,defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BasePannel from '@/components/BasePannel.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
// import BaseDialog from '@/components/BaseDialog.vue'

const BaseDialog = defineAsyncComponent(() => import('@/components/BaseDialog.vue'))


const app = createApp(App)

app.use(store).use(router)

app.component('base-pannel',BasePannel)
app.component('base-button',BaseButton)
app.component('base-badge',BaseBadge)
app.component('base-spinner',BaseSpinner)
app.component('base-dialog',BaseDialog)


app.mount('#app')