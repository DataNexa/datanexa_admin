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
                    <component :is="component" @response="onResponse" :email="emailChanged"></component>
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

export default defineComponent({
    components:{ SendEmail, CheckCode, IconLogoQuadrado },
    data() {
        return {
            emailChanged: this.email ? this.email : "",
            component: this.checkcode && this.email ? 'CheckCode' : 'SendEmail'
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
        onResponse(local:string, status:boolean){

        }
    }
})

</script>