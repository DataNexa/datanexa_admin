<template>
    <div class="container-fluid">
        <div class="row" v-if="!loading">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <IconLogoQuadrado class="mx-auto d-block"/>
                    </div>
                </div>
                <div class="row justify-content-center pt-5">
                    <component :is="component" @redirectTo="onResponse" @statusChange="(status:boolean) => disableBack = status" :email="emailChanged" :codeType="type_code"></component>
                </div>
            </div>
            <BackToMain @redirectTo="$emit('redirectTo', 'AuthMain')" :disable="disableBack"/>
        </div>
        <div class="row" v-if="loading">
            <div class="col">
                <IconLogoQuadrado class="mx-auto d-block"/>
            </div>
            <div class="row justify-content-center pt-5">
                <div class="col-12 col-lg-4 bg-white rounded">
                    <LoadingSimple/>
                    <p class="text-center">Aguarde, estamos verificando informações...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import SendEmail from './recover/SendEmail.vue'
import CheckCode from './recover/CheckCode.vue'
import IconLogoQuadrado from '@/components/icons/IconLogoQuadrado.vue';
import authService from '@/model/services/auth.service';
import BackToMain from '../BackToMain.vue';
import LoadingSimple from '@/components/LoadingSimple.vue';
import ChangePass from './recover/ChangePass.vue'

export default defineComponent({
    components:{ SendEmail, CheckCode, IconLogoQuadrado, BackToMain, LoadingSimple, ChangePass },
    async created(){

        if(this.email && this.checkcode){
            this.type_code = 'confirmation'
            const resp = await authService.sendCode(this.email, this.type_code)
            if(resp.status){
                this.component = 'CheckCode' 
            } else {
                this.component = 'SendEmail' 
            }
            this.loading = false
            return 
        }
        this.loading = false
        this.component = 'SendEmail' 
    },
    data() {
        return {
            loading:true,
            disableBack:false,
            type_code:'recover',
            emailChanged: this.email ? this.email : "",
            component: ''
        }
    },
    props:{
        checkcode:{
            required:false,
            type:Boolean
        },
        email:{
            required:false,
            type:String
        }
    },
    methods:{
        onResponse(to:string, email:string){
            if(to == 'ChangePass'){
                this.component    = 'ChangePass'
                return
            }

            if(to == 'CheckCode'){
                this.emailChanged = email
                this.component    = 'CheckCode'
                return 
            }
            this.$emit('redirectTo', to)
        }
    }
})

</script>