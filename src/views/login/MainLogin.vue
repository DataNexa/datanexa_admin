<template>
    <div class="container-fluid p-0 m-0" style="position:fixed; width: 100%; height: 100%; overflow-y: auto; overflow-x: hidden; background-color: #0052EC;">
        <div class="row p-0">
            <div class="col-12">
                <div v-if="loading">
                    <LoadingFull :percent="percent"></LoadingFull>
                </div>
                <div v-else>
                    <component 
                        :is="component" 
                        :email="email"
                        :checkcode="checkCode"
                        @redirectTo="redirect"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LoadingFull from '@/components/LoadingFull.vue'
import OptionsUser from './Token/OptionsUser.vue'
import AuthLogin from './Auth/AuthLogin.vue'
import AuthMain from "./Auth/AuthMain.vue"
import AuthCreateAccount from './Auth/AuthCreateAccount.vue';
import AuthRecover from './Auth/AuthRecover.vue';
import { getToken, getSession } from '@/model/libs/TokenManager';
import authService from '@/model/services/auth.service';
import Account from '@/model/Entidades/Account';
import { App } from '@/model/Entidades/App';
import Session from '@/model/libs/Session';
import userService from '@/model/services/user.service';

export default defineComponent({

    props:{
        innerModule:{
            type:String,
            required:false
        }
    },

    components:{ LoadingFull, OptionsUser, AuthMain, AuthLogin, AuthCreateAccount, AuthRecover },
    created() {
        this.checkToken()
    },
    data() {
        return {
            percent:50,
            loading:true,
            component:"AuthMain",
            email:'',
            checkCode:false
        }
    },
    methods:{

        async checkToken(){

            this.percent = 50

            this.loading = true
            const token = getToken()
            
            if(token == null){
                this.component = "AuthMain"
                this.loading = false
                return 
            }

            const accRepo = await authService.getAccountData()
            
            this.percent = 75

            if(accRepo.status && accRepo.body){
                const acc = new Account(accRepo.body.nome, accRepo.body.email)
                App.setAccount(acc)
            }

            const sess = getSession()
            
            if(sess && !App.getChange()){
                Session.saveSession(sess, 'MainLogin')
                await userService.setUserBySesson()
                this.percent = 100
                return this.redirect('system')
            }

            this.loading = false
            this.component = "OptionsUser"
        },

        redirect(to?:string, email?:string, checkCode?:boolean){
            if(to == 'system'){
                return this.$emit('changeArea', 'system')
            }
            this.email     = email ? email : ''
            this.checkCode = checkCode ? checkCode : false
            if(to) {
                this.component = to
                return
            }
            this.checkToken()
        }
    }
})

</script>