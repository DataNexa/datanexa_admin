<template>
    <div class="container-fluid">
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <IconLogoQuadrado class="mx-auto d-block"/>
                    </div>
                </div>
                <div class="row" v-if="showError.status">
                    <div class="col">
                        <p class="text-center bg-white text-danger">{{  showError.message }}</p>
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
            <BackToMain @redirectTo="$emit('redirectTo', 'AuthMain')" :disable="formdata.inputsControl.disable"/>
        </div>
    </div>
</template>

<script lang="ts">

import FormVue from '@/components/FormVue.vue';
import IconLogoQuadrado from '@/components/icons/IconLogoQuadrado.vue';
import { defineComponent } from 'vue'
import authService from '@/model/services/auth.service';
import BackToMain from '../BackToMain.vue';

export default defineComponent({

    components:{FormVue, IconLogoQuadrado, BackToMain},
    data(){
        return {
            showError:{
                status:false,
                message:'mensagem de erro'
            },
            buttons:[
                {
                    slug:'criar',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Salvar Dados ➔',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ],
            formdata:{
                inputsControl:{
                    disable:false
                },
                inputs:[
                    {
                        slug:'nome',
                        required:true,
                        text:{
                            icon:'🙂',
                            label:'Nome',
                            type:'text',
                            placeholder:'Seu nome completo',
                            value:''
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
                            placeholder:'Seu e-mail',
                            value:'',
                            icon:"✉️"
            
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
                            placeholder:'digite uma senha',
                            value:'',
                            icon:"🔒",
            
                        }
                    }
                ]
            }
        }
    },
    methods:{
        async on_click(){
            
            this.formdata.inputsControl.disable = true

            let nome  = this.formdata.inputs[0].text.value
            let email = this.formdata.inputs[1].text.value
            let senha = this.formdata.inputs[2].text.value

            let resp  = await authService.create(nome, email, senha)

            if(resp.status){
                return this.$emit('redirectTo', 'AuthRecover', email, true)
            }
            
            this.formdata.inputsControl.disable = false
        
            this.showError.status = true 
            this.showError.message = resp.message
            this.buttons[0].loading = false
        }
    }
})

</script>