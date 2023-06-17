# coach

 [Live deploy](https://find-a-coach-629de.web.app/coaches)

### notes:
使用了vue2/3 +vue/cli + vue-router+vuex +sass + firebase:database/auth/host

1. 使用异步组件：
   ```
   const BaseDialog = defineAsyncComponent(() => import('@/components/BaseDialog.vue'))
   app.component('base-dialog',BaseDialog)
   ```

 2.注册登录
  调用firebase的auth接口，用户可通过邮箱注册为coach和登录验证，获取token和登录过期时间（过期失效通过settimeout设置）
  测试账号：test@test.com 密码：123123 可登入查看接收到的requests

 3.路由页面滚动位置控制
 配置路由scrollBehavior属性
   ```
   const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes,
     scrollBehavior(to, _, _2) { 
       if (to.path.includes('contact')) { 
         return {
           top: 300,
           behavior:'smooth'
         }
       }
       }
     }
   )
   ```
4. 使用路由守卫+routes设置meta属性拦截页面跳转
   ```
    router.beforeEach(function (to, from, next) { 
   if (to.meta.requiredAuth && !store.getters.hasToken) {
     next('/auth')
   } else if (to.meta.unRequiredAuth && store.getters.hasToken) {
     next('/coaches')
   } else { 
     next()
   }
 })


5.coachlist 选项过滤 filter筛选获取的数据

6.表单验证 通过设置valid属性和submit时执行validForm()验证表单，提示验证信息

  ```
    <template>
     <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">FirstName:</label>
            <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidate('firstName')">
            <p v-if="!firstName.isValid">FirstName can not be empty!</p>
          </div>
     ...
    </template>
          ...
    
     <script>
       clearValidate(input){
          this[input].isValid = true
        },
        validForm(){
          this.formValid= true
          if(!this.firstName.val){
            this.formValid = false
            this.firstName.isValid = false
          }
        ...
        }
    
       submitForm(){
          this.validForm()
          if (!this.formValid){
            return
          }
       ...
       }
     </script>
          
  ```

7.回复request 点击发件人邮箱打开系统邮箱
```
<a :href="`mailto:${req.email}`">{{req.email}}</a>
```

8.通过vuex保存request和coach信息，设置更新数据请求间隔为1min，减少向后台调用数据
```
getters:{
shouldFetch(state) { 
      return (Date.now() - state.fetchTime)> 60*1000
    }
}
```
