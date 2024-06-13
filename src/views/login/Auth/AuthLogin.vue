<template>

    <div class="container-fluid">
        <AlertVue :alert="alert"/>
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <IconLogoQuadrado class="mx-auto d-block"/>
                    </div>
                </div>
                <div class="row justify-content-center pt-5">
                    <div class="bg-white text-start rounded col-11 col-md-9 col-lg-6 pt-3">
                        <FormVue 
                            @click_button="on_click"
                            :buttons="buttons"
                            :formdata="formdata"
                        />
                    </div>
                </div>
            </div>
            <BackToMain @redirectTo="$emit('redirectTo', 'AuthMain')" :disable="formdata.inputsControl.disable"/>
        </div>
    </div>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import FormVue from '@/components/FormVue.vue';
import IconLogoQuadrado from '@/components/icons/IconLogoQuadrado.vue';
import BackToMain from '../BackToMain.vue';
import authService from '@/model/services/auth.service';
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({
    components: { FormVue, IconLogoQuadrado, BackToMain, AlertVue },
    data(){
        return {
            alert:{
                type:"danger",
                text:"Erro msg",
                show:false
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
                inputsControl:{
                    disable:false
                },
                title:'Login',
                description:'Faça o Login com E-mail e Senha:',
                inputs:[
                    {
                        text:{
                            type:"email",
                            label:"e-mail",
                            icon:"✉️",
                            value:""
                        },
                        required:true,
                        messageError:'O campo de e-mail não pode estar vazio'
                    },
                    {
                        text:{
                            type:"password",
                            label:"senha:",
                            icon:"🔒",
                            value:""
                        },
                        required:true,
                        messageError:'O campo senha não pode estar vazio.'
                    }
                    
                ],
            }
        }
    },
    methods: {
        async on_click(slug:string){

            this.alert.show = false

            if(slug == 'recuperacao'){
                this.$emit('redirectTo', 'AuthRecover')
                return
            }

            this.formdata.inputsControl.disable = true

            const resp = await authService.login(
                this.formdata.inputs[0].text.value, 
                this.formdata.inputs[1].text.value
            )

            if(!resp.status){
                this.formdata.inputsControl.disable = false 
                this.alert.text = resp.message
                this.alert.type = 'danger'
                this.alert.show = true
                return
            }

            this.$emit('redirectTo')

        }
    },
})

</script>