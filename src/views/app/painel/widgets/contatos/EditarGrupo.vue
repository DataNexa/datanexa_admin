<template>
    <AlertVue :alert="alert" />
    <FormVue @click_button="editar" :formdata="formData" :buttons="buttons"/>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import AlertVue from '@/components/AlertVue.vue';
import FormVue from '@/components/FormVue.vue';
import { request } from '@/model/libs/Request';

interface grupos_i {
    id:number,
    client_id:number,
    titulo:string,
    descricao:string,
    link:string,
    ativo:number
}

export default defineComponent({

    props:{
        grupo:{
            type: Object as () => grupos_i,
            required:true
        }
    },

    methods:{
        async editar(){
            const req = await request({
                method:'post',
                route:'grupos/update'
            }, {
                titulo:this.formData.inputs[0].text.value,
                descricao:this.formData.inputs[1].text.value,
                link:this.formData.inputs[2].text.value,
                ativo:this.grupo.ativo,
                id:this.grupo.id
            })

            let novoGrupo:grupos_i = {
                titulo:this.formData.inputs[0].text.value,
                descricao:this.formData.inputs[1].text.value,
                link:this.formData.inputs[2].text.value,
                ativo:this.grupo.ativo,
                id:this.grupo.id,
                client_id:this.grupo.client_id
            }

            if(req.code == 200){
                this.$emit('close')
                this.$emit('editedGrupo', novoGrupo)
            } else {
                this.alert.text = 'Erro ao tentar realizar alterações'
                this.alert.type = 'danger'
                this.alert.show = true
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
                            value:this.grupo.titulo
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Descrição',
                            type:'text',
                            placeholder:'Descrição do Grupo',
                            value:this.grupo.descricao
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {   
                        text:{
                            label:'Link Whatsapp',
                            type:'text',
                            placeholder:'https://',
                            value:this.grupo.link
                        },
                        required:false
                    }
                ]
            },

            buttons:[
                {
                    slug:'editar',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Salvar Alterações',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ]
        }
    },

})

</script>