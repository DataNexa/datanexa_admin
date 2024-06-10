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
                        <h2 class="text-center py-4">Crie sua Conta:</h2>
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

import FormVue from '@/components/FormVue.vue';
import IconLogoQuadrado from '@/components/icons/IconLogoQuadrado.vue';
import { defineComponent } from 'vue'

export default defineComponent({
    components:{FormVue, IconLogoQuadrado},
    data(){
        return {
            buttons:[
                {
                    slug:'criar',
                    css:'btn btn-info d-block ms-auto',
                    text:'Salvar Dados ➔',
                    canLoad:true
                }
            ],
            formdata:{
                inputs:[
                    {
                        slug:'nome',
                        required:true,
                        text:{
                            label:'Nome',
                            type:'text',
                            placeholder:'Seu nome completo'
                        }
                    },
                    {
                        slug:'email',
                        required:true,
                        messageError:'E-mail inválido',
                        text:{
                            label:'E-mail',
                            type:'email',
                            regex:'email',
                            placeholder:'Seu e-mail'
            
                        }
                    },
                    {
                        slug:'senha',
                        required:true,
                        messageError:'A senha tem que ter pelo menos 8 caracteres com letras e numeros',
                        text:{
                            label:'Senha',
                            type:'text',
                            regex:'senha',
                            placeholder:'digite uma senha'
            
                        }
                    }
                ]
            }
        }
    },
    methods:{
        on_click(){

        }
    }
})

</script>