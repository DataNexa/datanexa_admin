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
import { getToken } from '@/model/libs/TokenManager';

export default defineComponent({
    components:{ LoadingFull, OptionsUser, AuthMain, AuthLogin, AuthCreateAccount, AuthRecover },
    created() {
        this.component = getToken() == null ? "AuthMain" : "OptionsUser"
    },
    data() {
        return {
            percent:1,
            loading:false,
            component:"AuthMain",
            email:'',
            checkCode:false
        }
    },
    methods:{
        redirect(to:string, email?:string, checkCode?:boolean){
            this.email     = email ? email : ''
            this.checkCode = checkCode ? checkCode : false
            this.component = to
        }
    }
})

</script>