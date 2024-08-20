<template>

    <ModalDynamic v-if="openModal" :dont-close="true">
        <FormVue 
            :formdata="formdata"
            :buttons="buttons"
            @click_button="getSessionTemp"
        />
    </ModalDynamic>

</template>

<script lang="ts">

import ModalDynamic from '@/components/ModalDynamic.vue';
import { defineComponent } from 'vue'
import Session from '@/model/libs/Session';
import FormVue from '@/components/FormVue.vue';
import { request } from '@/model/libs/Request';

export default defineComponent({

    created() {
        this.openModal = Session.getTempSessionValue() == undefined
    },

    components:{ ModalDynamic,FormVue },

    data() {
        return {
            openModal:false,
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
            buttons:[
                {
                    slug:'enviar',
                    text:'enviar',
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
        }
    }

})

</script>