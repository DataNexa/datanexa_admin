<template>

    <ModalDynamic v-if="openModal" :dont-close="true">
        <FormVue 
            :formdata="formdata"
            :buttons="buttons"
            @click_button="getSessionTemp"
        />
    </ModalDynamic>
    <AlertVue v-if="!openModal" :alert="alertObj" />
   <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-8">
               
                <FormVue 
                    :formdata="formdata2"
                    :buttons="buttons2"
                    @click_button="saveData"
                />
            </div>
        </div>
   </div>

</template>

<script lang="ts">

import ModalDynamic from '@/components/ModalDynamic.vue';
import { defineComponent } from 'vue'
import Session from '@/model/libs/Session';
import FormVue from '@/components/FormVue.vue';
import { request } from '@/model/libs/Request';
import { App } from '@/model/Entidades/App';
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({

    created() {
        this.openModal = Session.getTempSessionValue() == undefined
    },

    components:{ ModalDynamic,FormVue,AlertVue },

    data() {
        return {
            openModal:false,
            showAlert:true,
            alertObj: {
                type:'warning',
                text:'Ao alterar os dados, você precisará logar-se novamente.',
                show:true
            },
            formdata:{
                description:'Digite sua senha abaixo:',
                inputs:[
                    {
                        text:{
                            type:"password",
                            label:"senha:",
                            icon:"&#128274;",
                            value:''
                        },
                        required:true,
                        messageError:'Este campo não pode estar vazio'
                    }
                    
                ],
            },
            formdata2:{
                description:'Alterar Dados:',
                inputs:[
                    {
                        text:{
                            type:"text",
                            label:"nome:",
                            value:App.getNomeAccount()
                        },
                        required:true,
                        messageError:'Este campo não pode estar vazio'
                    },
                    {
                        text:{
                            type:"password",
                            label:"senha:",
                            icon:"&#128274;",
                            value:''
                        },
                        required:true,
                        messageError:'Este campo não pode estar vazio'
                    }
                    
                ],
            },
            buttons:[
                {
                    slug:'enviar',
                    text:'enviar',
                    css:'btn btn-outline-primary ms-auto d-block',
                    success:true,
                    canLoad:true
                }
            ],
            buttons2:[
                {
                    slug:'salvar',
                    text:'salvar',
                    css:'btn btn-outline-primary ms-auto d-block',
                    success:true,
                    canLoad:true
                }
            ],
        }
    },

    methods:{
        
        async getSessionTemp(){
            const res = await request({
                route:'account/createSessionTemp',
                method:'post',
                sess_type:'TOKEN'
            }, {
                senha:this.formdata.inputs[0].text.value
            })
            if(res.code == 200){
                this.onSessionTempCreated(res.body.session_temp)
                this.openModal = false
            }
        },
        
        onSessionTempCreated(session_temp:string){
            Session.saveTempSession(session_temp)
        },

        async saveData(){

            const nome  = this.formdata2.inputs[0].text.value
            const senha = this.formdata2.inputs[1].text.value

            const res   = await request({
                method:'post',
                route:'account/edit',
                sess_type:'SESSION_TEMP'
            }, {
                nome,
                senha
            })

            if(res.code == 200){
                Session.deleteToken()
                Session.expireSessions()
                window.location.reload()
            } else {
                this.alertObj.text = res.message ? res.message : 'Erro ao tentar alterar dados'
                this.alertObj.type = 'danger'
                this.alertObj.show = true
            }

        }

    }

})

</script>