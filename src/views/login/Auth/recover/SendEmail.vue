<template>
    <div class="bg-white text-start rounded col-11 col-md-9 col-lg-6 py-3">
        <h2>Recuperação de Conta</h2>
        <p></p>
        <InputVue
            @change_value="on_change"
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

export default defineComponent({
    components:{ InputVue, ButtonVue },
    data(){
        return {
            button:{
                slug:'enviar',
                css:'btn btn-info d-block ms-auto',
                text:'enviar código ➔',
                canLoad:true,
                loading:false
            },
            input:{
                slug:"email",
                required:true,
                messageError:"E-mail inválido",
                showError:false,
                text:{
                    label:"E-mail",
                    type:"email",
                    regex:"email",
                    validate:false
                }
            }
        }
    },
    methods:{
        on_click(){
            this.input.messageError = "Este e-mail não existe\nCrie uma conta"
            this.input.showError = true
            this.button.loading = this.input.text.validate
            if(this.input.text.validate){
                // usa serviço de envio de email para a 
                // API solicitando envio de codigo
                // de recuperação de conta
            }
        },
        on_change(slug:string, status:boolean){
            console.log("status:", status);
            this.input.text.validate = status
            
        }
    }
})

</script>