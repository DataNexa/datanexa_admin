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
                    <div class="bg-white text-start rounded col-11 col-md-9 col-lg-6">
                        <FormVue 
                            @click_button="on_click"
                            :buttons="buttons"
                            :formdata="formdata"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import FormVue from '@/components/FormVue.vue';
import IconLogoQuadrado from '@/components/icons/IconLogoQuadrado.vue';
export default defineComponent({
    components: { FormVue, IconLogoQuadrado },
    data(){
        return {
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
                
                description:'Faça o Login:',
                inputs:[
                    {
                        text:{
                            type:"email",
                            label:"e-mail",
                            icon:"✉️"
                        },
                        required:true,
                        messageError:'O campo de e-mail não pode estar vazio'
                    },
                    {
                        text:{
                            type:"password",
                            label:"senha:",
                            icon:"🔒",
                        },
                        required:true,
                        messageError:'O campo senha não pode estar vazio.'
                    }
                    
                ],
            }
        }
    },
    methods: {
        on_click(slug:string){

        }
    },
})

</script>