<template>
    <AlertVue :alert="alert" />
    <Widget :loading="false">
        <FormVue @click_button="criar" :formdata="formData" :buttons="buttons"/>
    </Widget>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import FormVue from '@/components/FormVue.vue';
import Widget from '@/components/Widget.vue';
import { request } from '@/model/libs/Request';
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({
    
    components:{ FormVue, Widget, AlertVue },

    methods: {
        async criar(){
            const req = await request({
                method:'post',
                route:'grupos/create'
            },{
                titulo:this.formData.inputs[0].text.value,
                descricao:this.formData.inputs[1].text.value,
                link:this.formData.inputs[0].text.value,
                ativo:1
            })
            if(req.code == 200){
                this.$emit('reload')
                this.$emit('close')
            } else {
                this.alert.type = 'danger'
                this.alert.text = req.message ? req.message : 'Erro ao tentar criar grupo'
                this.alert.show = true
            }
            this.buttons[0].loading = false
        }
    },

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