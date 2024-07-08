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
                            label:'Título',
                            type:'text',
                            placeholder:'Título da Pesquisa',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Descrição',
                            type:'text',
                            placeholder:'Descrição da Pesquisa',
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
        salvar(){
            // salvar e enviar evento de salvou
            // this.$emit('createCampanha', campanha)
        }
    },
})

</script>