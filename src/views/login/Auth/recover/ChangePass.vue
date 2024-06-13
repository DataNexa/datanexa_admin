<template>
    <div class="container-fluid">
        <AlertVue :alert="alert_ERROR" />
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 bg-white py-3 rounded">
                <FormVue 
                    @click_button="checkAndSaveData"
                    :buttons="buttons"
                    :formdata="formdata"
                />
            </div>
        </div>
    
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import { alert_type, type alert_i } from "@/components/interfaces/AlertI"
import AlertVue from "@/components/AlertVue.vue"
import FormVue from "@/components/FormVue.vue"
import authService from "@/model/services/auth.service"
import Session from "@/model/libs/Session"

export default defineComponent({

    components:{ FormVue, AlertVue },
    
    methods:{
        async checkAndSaveData(){
            if( this.formdata.inputs[0].text?.value != this.formdata.inputs[1].text?.value ){
                this.formdata.inputs[1].showError    = true 
                this.formdata.inputs[1].messageError = 'A valor da confirmação de senha não é igual ao da senha'
                this.buttons[0].loading = false
                return
            }
            if(this.formdata.inputs[0].text.value){
                const resp = await authService.changePass(this.formdata.inputs[0].text?.value)
                if(resp.status){
                    this.$emit('redirectTo', 'AuthLogin')
                }
            }
                
        }
    },
    data(){
        return {
            alert_ERROR:{
                type:alert_type.DANGER,
                text:'Senha incorreta! Tente novamente ou faça a recuperação de senha.'
            },
            buttons:[
                {
                    slug:'salvar',
                    text:'salvar senha',
                    css:'btn btn-outline-primary ms-auto d-block',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ],
            formdata:{
                description:'Crie sua nova senha abaixo:',
                inputs:[
                    {
                        text:{
                            type:"password",
                            label:"senha:",
                            icon:"&#128274;",
                            regex:"senha",
                            value:""
                        },
                        required:true,
                        messageError:'O campo senha não pode estar vazio.',
                        showError:false,
                    },
                    {
                        text:{
                            type:"password",
                            label:"confirme sua senha:",
                            icon:"&#128274;",
                            value:""
                        },
                        required:true,
                        messageError:'O campo de confirmação de senha não pode estar vazio.',
                        showError:false
                    }
                    
                ],
            }
        }
    }
})
</script>

