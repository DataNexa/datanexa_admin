<template>
    <div class="bg-white text-start rounded col-11 col-md-9 col-lg-6 py-3">
        <AlertVue :alert="alertObj"/>
        <h3>Um código foi enviado para o e-mail:</h3>
        <h5><i>{{  email }}</i></h5>
        <p>copie e cole o código abaixo:</p>
        <p class="text-danger" v-if="errorMsg != ''">{{ errorMsg }}</p>
        <p class="text-primary" v-if="infoMsg != ''">{{ infoMsg }}</p>
        <InputVue 
            @onTypingEvent="onChange"
            :input="input"
            v-if="!isCheckingCode"
        />
        <LoadingSimple v-if="isCheckingCode"/>
        <ButtonVue 
            @click="onClick"
            :button="button"
            v-if="!isCheckingCode"
        />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import InputVue from '@/components/InputVue.vue';
import ButtonVue from '@/components/ButtonVue.vue';
import LoadingSimple from '@/components/LoadingSimple.vue';
import authService from '@/model/services/auth.service';
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({
    
    components: { InputVue, ButtonVue, LoadingSimple, AlertVue },

    props:{
        email:{
            required:true,
            type:String
        },
        codeType:{
            required:true,
            type:String
        }
    },

    data() {
        return {
            alertObj:{
                type:'success',
                text: this.codeType == 'confirmation' ? 
                'Seu e-mail foi confirmado com sucesso' :
                'Recuperação de conta realizada com sucesso',
                show:false
            },
            isCheckingCode:false,
            errorMsg:'',
            infoMsg:'',
            input:{
                slug:"codigo",
                required:true,
                text:{
                    type:"text",
                    placeholder:"CÓDIGO",
                    value:'',
                    icon:'📝'
                }
            },
            button:{
                slug:"resend",
                text:"solicitar novo código",
                css:"btn btn-link d-block mx-auto",
            }
        }
    },

    methods:{

        async cleanMsg(){
            this.errorMsg = ''
            this.infoMsg  = ''
            this.isCheckingCode = false
        },

        async verifyEmail(input:HTMLInputElement){
            return await authService.confirmEmail(this.email, input.value)
        },

        async recover(input:HTMLInputElement){
            return await authService.recover(this.email, input.value)
        },

        onLoadData(status:boolean){
            this.$emit('statusChange', status)
        },

        async onChange(e:Event){
           
            const input = e.target as HTMLInputElement;
            this.cleanMsg()

            if(input.value.length == 6){

                this.onLoadData(true)
                this.isCheckingCode = true
                let resp = undefined

                if(this.codeType == 'confirmation'){
                    resp = await this.verifyEmail(input)
                } else {
                    resp = await this.recover(input)
                }

                if(resp && resp.status && this.codeType == 'confirmation'){
                    this.input.text.value = ''
                    this.alertObj.show    = true
                    setTimeout(() => {
                        this.$emit('redirectTo', 'AuthLogin')
                    }, 1000)
                } else
                if(resp && resp.status && this.codeType == 'recover'){
                    setTimeout(() => {
                        this.$emit('redirectTo', 'ChangePass')
                    }, 1000)
                } else {
                    this.isCheckingCode = false
                    this.errorMsg       = resp.message
                    this.onLoadData(false)
                }

            }

        },
        async onClick(){
            // envia novo cógido
            this.cleanMsg()
            this.isCheckingCode = true
            this.onLoadData(true)
            const resp = await authService.sendCode(this.email, this.codeType)

            if(!resp.status){
                this.errorMsg = resp.message
            } else {
                this.infoMsg = 'Foi enviado um novo código para seu e-mail'
            }

            this.onLoadData(false)
            this.isCheckingCode = false
        }
    }

})

</script>