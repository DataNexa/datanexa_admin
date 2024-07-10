<template>
    <div class="container-fluid">
        <div class="row">
            <FormVue :formdata="formData" :buttons="buttons" @click_button="salvar"></FormVue>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import FormVue from '@/components/FormVue.vue';
import { request } from '@/model/libs/Request';
import Data from '@/model/libs/Data'

interface tarefas {
    tarefa_id:number,
    tarefa:string,
    descricao:string,
    status:number,
    createAt:string,
    dataLimite:string
}

export default defineComponent({    

    components:{ FormVue },

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    methods: {
        async salvar(){
            
            let hoje = (new Data(new Date()))

            const req = await request({
                method:'post',
                route:'tarefas/create'
            }, {
                campanha_id:this.id,
                tarefa:this.formData.inputs[0].text.value,
                status:1,
                createAt:hoje.toEn(),
                descricao:this.formData.inputs[1].text.value,
                dataLimite:this.formData.inputs[2].text.value
            })

            if(req.code == 200){

                let tarefa:tarefas = {
                    tarefa_id: parseInt(req.body),
                    tarefa:this.formData.inputs[0].text.value,
                    status:1,
                    createAt:hoje.toBr(),
                    descricao:this.formData.inputs[1].text.value,
                    dataLimite:this.formData.inputs[2].text.value
                } 

                this.$emit('createCard', this.id, tarefa)
            } else {
                // TODO : mostrar erro alert
                this.buttons[0].loading = false
            }

        }
    },

    data() {
        return {
            formData:{
                title:'Adicionar Cartão de Tarefa',
                description:'',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Título',
                            type:'text',
                            placeholder:'Titulo da Tarefa',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Descrição',
                            type:'text',
                            placeholder:'Descrição da Tarefa',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Data Limite (opicional)',
                            type:'date',
                            value:''
                        },
                        message:'Data limite para o término da tarefa.',
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
            ],
        }
    },
})

</script>