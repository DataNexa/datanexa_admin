<template>
    <AlertVue :alert="alert" />
    <FormVue @click_button="salvar" :formdata="formData" :buttons="buttons"/>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import AlertVue from '@/components/AlertVue.vue';
import FormVue from '@/components/FormVue.vue';
import { request } from '@/model/libs/Request';

export default defineComponent({

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    methods:{
        async salvar(){
            this.disableForm()
            const req = await request({
                method:'post',
                route:'contatos/create'
            }, {
                grupo_id:this.id,
                nome:this.formData.inputs[0].text.value,
                apelido:this.formData.inputs[1].text.value,
                whatsapp:this.formData.inputs[2].text.value,
                facebook:this.formData.inputs[3].text.value,
                instagram:this.formData.inputs[4].text.value,
                twitter:this.formData.inputs[5].text.value,
                email:this.formData.inputs[6].text.value
            })

            if(req.code == 200){
                this.$emit('createContato')
                this.$emit('close')
                return
            } else {
                // mostra erro
                this.alert.text = req.message ? req.message : 'Erro ao tentar salvar'
                this.alert.type = 'danger'
                this.alert.show = true 
                this.disableForm(false)
            }
        },
        disableForm(status=true){
            if(status){
                this.buttons[0].loading = true
                this.formData.inputsControl.disable = true
            } else {
                this.buttons[0].loading = false
                this.formData.inputsControl.disable = false
            }
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
                title:'Criar Contato',
                description:'',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Nome',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Apelido',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {   
                        text:{
                            label:'Whatsapp',
                            type:'text',
                            placeholder:'+551199999999',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {   
                        text:{
                            label:'Facebook',
                            type:'text',
                            placeholder:'https://facebook.com/fulano',
                            value:''
                        },
                        required:false
                    },
                    {   
                        text:{
                            label:'Instagram',
                            type:'text',
                            placeholder:'https://instagram.com/fulano',
                            value:''
                        },
                        required:false
                    },
                    {   
                        text:{
                            label:'Twitter',
                            type:'text',
                            placeholder:'https://x.com/fulano',
                            value:''
                        },
                        required:false
                    },
                    {   
                        text:{
                            label:'email',
                            type:'text',
                            placeholder:'fulano@gmail.com',
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
                    text:'Adicionar',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ]
        }
    },

})

</script>