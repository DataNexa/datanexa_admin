<template>
    <AlertVue :alert="alert" />
    <FormVue @click_button="editar" :formdata="formData" :buttons="buttons"/>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import AlertVue from '@/components/AlertVue.vue';
import FormVue from '@/components/FormVue.vue';


export default defineComponent({

    methods:{
        editar(){

        }
    },

    components:{ AlertVue, FormVue },

    data() {
        return {
            alert:{
                type:'danger',
                text:'',
                show:false
            },
            formData:{
                title:'Criar Grupo',
                description:'',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Nome',
                            type:'text',
                            placeholder:'Nome do Grupo',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Descrição',
                            type:'text',
                            placeholder:'Descrição do Grupo',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {   
                        text:{
                            label:'Link Whatsapp',
                            type:'text',
                            placeholder:'https://',
                            value:''
                        },
                        required:false
                    }
                ]
            },
            buttons:[
                {
                    slug:'criar',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'criar',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ]
        }
    },

})

</script>