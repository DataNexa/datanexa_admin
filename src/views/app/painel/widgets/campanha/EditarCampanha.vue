<template>
    <div class="container-fluid">
        <AlertVue :alert="alert"/>
        <div class="row">
            <div class="col-12">
                <FormVue v-if="!loading" :formdata="formData" :buttons="buttons" @click_button="onchange"/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { defineComponent } from 'vue'
import { request } from '@/model/libs/Request';
import FormVue from '@/components/FormVue.vue'; 
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({
    
    props:{
        id:{
            type:Number,
            required:true
        }
    },

    created() {
        // pegar informações basicas da companha pelo id
        this.getData()
    },

    components:{ FormVue, AlertVue },

    data() {
        return {
            loading:true,
            ativo:1,
            alert:{
                text:'sucesso',
                type:'success',
                show:false
            },
            formData:{
                title:'Editar Campanha',
                description:'',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Nome',
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
                    slug:'alterar',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Salvar Alterações',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ],
        }
    },

    methods: {
        async getData(){
            
            const req = await request({
                method:'post',
                route:'campanhas/unique'
            }, {
                id:this.id
            }) 

            if(req.code == 200){
                this.formData.inputs[0].text.value = req.body.nome
                this.formData.inputs[1].text.value = req.body.descricao
                this.ativo = req.body.ativo
                this.loading = false
            }

        },

        async onchange(){

            const exe = await request({
                method:'post',
                route:'campanhas/update'
            }, {
                id:this.id,
                ativo:this.ativo,
                nome:this.formData.inputs[0].text.value,
                descricao:this.formData.inputs[1].text.value
            })

            if(exe.code == 200){
                this.alert.text = 'Dados alterados com sucesso!'
                this.alert.type = 'success'
                this.alert.show = true
                this.buttons[0].loading = false
                this.$emit('reload')
            }

        },

        
    },

})

</script>