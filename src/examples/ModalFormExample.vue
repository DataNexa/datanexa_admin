<template>
    <ModalVue 
        @close_modal="$emit('close_modal')"
        @click_button="checkAndSaveData"
        :buttons="buttons"
        :formdata="formdata"
    />
</template>

<script lang="ts">
import {defineComponent} from "vue"
import ModalVue from "@/components/ModalVue.vue"
import type { formdata_i } from "@/interfaces/FormDataI"
import type { button_i } from "@/interfaces/ButtonI"

interface data {
    formdata:formdata_i,
    buttons:button_i[]
}

export default defineComponent({

    components:{ ModalVue },
    methods:{
        checkAndSaveData(slug:string){
            for(const input of this.formdata.inputs){
                if(!input.validate){
                    return 
                }
            }
            this.$emit('close_modal')
            
        }
    },
    data():data{
        return {
            buttons:[{
                slug:'salvar',
                text:'Salvar',
                css:'btn btn-outline-primary ms-auto d-block'
            }],
            formdata:{
                title:'titulo',
                description:'testes para ver como fica o formulario',
                inputs:[
                    {
                        radio:{
                            label:'Escolha um poder',
                            name:'test_name',
                            options:[
                                {
                                    label:'magica',
                                    value:'abra cadabra'
                                },
                                {
                                    label:'sonoro',
                                    value:'UUUUuuuuuaaaaaahhhhh'
                                }
                            ]
                        }
                    },
                    {
                        checkbox:{
                            switch:true,
                            checked:true,
                            text:`Aceito os termos de uso descritos na 
                            <a target=\"_blank\" href=\"https://google.com\">política de privacidade </a>`
                        },
                        required:true,
                        messageError:'Você precisa aceitar este campo para continuar',
                    },
                    {
                        checkbox:{
                            checked:false,
                            text:'quero receber novidades por e-mail'
                        },
                    },
                    {
                        text:{
                            icon:'&#129493;',
                            label:'nome',
                            type:'text',
                            placeholder:'digite seu nome completo', 
                        },
                        required:true,
                        messageError:'Este campo não pode estar vazio',
                    },{
                        text:{
                            placeholder:'fulano@email.com',
                            regex:'email',
                            icon:'✉',
                            label:'e-mail',
                            type:'text',
                        },
                        messageError:'O e-mail não é válido'
                    },{
                        text:{
                            icon:'&#128274;',
                            label:'senha',
                            type:'password',
                            placeholder:'******',
                            regex:'senha',
                        },
                        messageError:'Senha precisa conter ao menos 8 caracteres com letras e números',
                        message:'Senha precisa conter ao menos 8 caracteres com letras e números'
                    },{
                        text:{
                            icon:'&#128441;',
                            label:'CPF',
                            type:'text',
                            placeholder:'xxx.xxx.xxx-xx',
                            regex:'cpf',
                        },
                        messageError:'Este documento não é válido.',
                    }
                ],
            }
        }
    }
})
</script>

