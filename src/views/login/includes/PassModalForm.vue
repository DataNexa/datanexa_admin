<template>
    <ModalVue 
        @close_modal="$emit('close_modal')"
        @click_button="checkAndSaveData"
        :buttons="buttons"
        :formdata="formdata"
    />
    <AlertVue :alert="alert_ERROR" />
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ModalVue from "@/components/ModalForm.vue"
import type { formdata_i } from "@/interfaces/FormDataI"
import type { button_i } from "@/interfaces/ButtonI"
import { alert_type, type alert_i } from "@/interfaces/AlertI"
import AlertVue from "@/components/AlertVue.vue"
interface data {
    formdata:formdata_i,
    buttons:button_i[],
    alert_ERROR:alert_i,
}

export default defineComponent({

    components:{ ModalVue, AlertVue },
    methods:{
        checkAndSaveData(slug:string){
            if(slug == 'cancel'){
                this.$emit('close_modal')
            }
            
        }
    },
    data():data{
        return {
            alert_ERROR:{
                type:alert_type.DANGER,
                text:'Senha incorreta! Tente novamente ou faça a recuperação de senha.'
            },
            buttons:[
                {
                    slug:'recuperacao',
                    text:'esqueci minha senha',
                    css:'btn btn-link'
                },
                {
                    slug:'salvar',
                    text:'entrar',
                    css:'btn btn-outline-primary ms-auto d-block',
                    success:true,
                    canLoad:true
                }
            ],
            formdata:{
                description:'Digite sua senha abaixo:',
                inputs:[
                    {
                        text:{
                            type:"password",
                            label:"senha:",
                            icon:"&#128274;",
                        },
                        required:true,
                        messageError:'O campo senha não pode estar vazio.'
                    }
                    
                ],
            }
        }
    }
})
</script>

