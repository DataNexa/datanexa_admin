<template>
    <AlertVue :alert="alert" />
    <FormVue @click_button="editar" :formdata="formData" :buttons="buttons"/>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import AlertVue from '@/components/AlertVue.vue';
import FormVue from '@/components/FormVue.vue';
import { request } from '@/model/libs/Request';

interface contatos_i {
    id:number,
    grupo_id:number,
    apelido:string,
    nome:string,
    whatsapp:string,
    email:string,
    instagram:string,
    twitter:string,
    facebook:string
}

export default defineComponent({

    props:{
        contato:{
            type: Object as () => contatos_i,
            required:true
        }
    },

    methods:{

        async editar(){
            
            this.disableForm(true)

            const req = await request({
                method:'post',
                route:'contatos/update'
            }, {
                grupo_id:this.contato.grupo_id,
                id:this.contato.id,
                nome:this.formData.inputs[0].text.value,
                apelido:this.formData.inputs[1].text.value,
                whatsapp:this.formData.inputs[2].text.value,
                facebook:this.formData.inputs[3].text.value,
                instagram:this.formData.inputs[4].text.value,
                twitter:this.formData.inputs[5].text.value,
                email:this.formData.inputs[6].text.value
            })

            if(req.code == 200){
                this.$emit('reload')
                this.$emit('close')
            } else {
                console.log(req.code);
                
            }

            this.disableForm(false)
        },

        async disableForm(status:boolean){
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
                            value:this.contato.nome
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Apelido',
                            type:'text',
                            placeholder:'',
                            value:this.contato.apelido
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {   
                        text:{
                            label:'Whatsapp',
                            type:'text',
                            placeholder:'+551199999999',
                            value:this.contato.whatsapp
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {   
                        text:{
                            label:'Facebook',
                            type:'text',
                            placeholder:'https://facebook.com/fulano',
                            value:this.contato.facebook
                        },
                        required:false
                    },
                    {   
                        text:{
                            label:'Instagram',
                            type:'text',
                            placeholder:'https://instagram.com/fulano',
                            value:this.contato.instagram
                        },
                        required:false
                    },
                    {   
                        text:{
                            label:'Twitter',
                            type:'text',
                            placeholder:'https://x.com/fulano',
                            value:this.contato.twitter
                        },
                        required:false
                    },
                    {   
                        text:{
                            label:'email',
                            type:'text',
                            placeholder:'fulano@gmail.com',
                            value:this.contato.email
                        },
                        required:false
                    }
                ]
            },

            buttons:[
                {
                    slug:'salvar',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Salvar Edição',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ]
        }
    },

})

</script>