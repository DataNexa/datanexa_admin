<template>
    <div class="container-fluid">
        <div class="row">
            <FormVue :formdata="formData" :buttons="buttons" @click_button="salvar"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormVue from '@/components/FormVue.vue'
import { request } from '@/model/libs/Request';

interface tarefas {
    tarefa_id:number,
    tarefa:string,
    descricao:string,
    status:number,
    createAt:string,
    dataLimite:string
}

interface campanha_i {
    id:number,
    nome:string,
    descricao:string,
    tarefas:tarefas[]
}

export default defineComponent({

    components:{ FormVue },

    data() {
        return {
            formData:{
                title:'Adicionar Campanha',
                description:'',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'nome',
                            type:'text',
                            placeholder:'Nome da Campanha',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Descrição',
                            type:'text',
                            placeholder:'Descrição da Campanha',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
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

    methods: {
        async salvar(){
            // salvar e enviar evento de salvou

            let nome = this.formData.inputs[0].text.value
            let desc = this.formData.inputs[1].text.value

            const req = await request({
                method:'post',
                route:'campanhas/create'
            }, {
                nome:nome,
                descricao:desc,
                ativo:1
            })

            if(req.code == 200){

                let campanha:campanha_i = {
                    id:parseInt(req.body),
                    nome:nome,
                    descricao:desc,
                    tarefas:[]
                }

                this.$emit('createCampanha', campanha)

            } else {
                // TODO : mostrar erro alert
                this.buttons[0].loading = false
            }
            
        }
    },
})

</script>