<template>
    <div class="bg-white text-start rounded col-11 col-md-9 col-lg-6 py-3">
        <AlertVue :alert="alertObj"/>
        <h2>Recuperação de Conta</h2>
        
        <InputVue
            :input=input
        />
        <ButtonVue 
            @click="on_click"
            :button="button"
        />
        
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import InputVue from '@/components/InputVue.vue';
import ButtonVue from '@/components/ButtonVue.vue';
import authService from '@/model/services/auth.service';
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({
    components:{ InputVue, ButtonVue },
    data(){
        return {
            alertObj:{
                type:'danger',
                text: 'msg',
                show:false
            },
            button:{
                slug:'enviar',
                css:'btn btn-outline-primary d-block ms-auto',
                text:'enviar código ➔',
                canLoad:true,
                loading:false
            },
            input:{
                slug:"email",
                required:true,
                messageError:"E-mail inválido",
                showError:false,
                readonly:false,
                validate:false,
                text:{
                    label:"E-mail",
                    type:"email",
                    regex:"email",
                    icon:"✉️",
                    value:''
                }
            }
        }
    },
    methods:{

        onLoadData(status:boolean){
            this.$emit('statusChange', status)
        },

        async on_click(){
            
            this.button.loading = this.input.validate
            
            if(this.input.validate){

                this.input.readonly = true
                const resp = await authService.sendCode(this.input.text.value, 'recover')
                
                if(!resp.status){
                    this.input.messageError = resp.message
                    // this.input.messageError = "Este e-mail não existe no nosso banco de dados!\nCrie uma conta."
                    this.input.showError = true
                    this.button.loading = false
                    this.input.readonly = false
                    return
                }

                this.$emit('redirectTo', 'CheckCode', this.input.text.value) 
            
            }
            
        },

    }
})

</script>