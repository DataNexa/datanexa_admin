<template>
    <div class="container-fluid">
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <IconLogoQuadrado class="mx-auto d-block"/>
                    </div>
                </div>
                <div class="row justify-content-center pt-5">
                    <component :is="component" @redirectTo="onResponse" :email="emailChanged" :codeType="type_code"></component>
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

export default defineComponent({
    components:{ SendEmail, CheckCode, IconLogoQuadrado },
    async created(){
        if(this.email && this.checkcode){
            this.type_code = 'confirmation'
            const resp = await authService.sendCode(this.email, this.type_code)
            if(resp.status){
                this.component = 'CheckCode' 
            } else {
                this.component = 'SendEmail' 
            }
            return 
        }

        this.component = 'SendEmail' 
    },
    data() {
        return {
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
        onResponse(to:string){
            this.$emit('redirectTo', to)
        }
    }
})

</script>