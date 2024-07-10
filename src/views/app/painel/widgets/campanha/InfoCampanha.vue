<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <button @click="$emit('changeTo', 'EditarCampanha')" class="btn btn-outline-primary btn-sm">editar</button>
            </div>
            <div class="col-12">
                <h1>{{ nome }}</h1>
                <h5>{{ descricao }}</h5>
            </div>
            <div class="col-12 pt-5">
                <button @click="deletar" class="btn btn-outline-danger btn-sm d-block ms-auto">
                    deletar campanha
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { request } from '@/model/libs/Request';
import { defineComponent } from 'vue'

export default defineComponent({
    
    data() {
        return {
            nome:'',
            descricao:''
        }
    },

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

    methods:{
        async getData(){
            
            const req = await request({
                method:'post',
                route:'campanhas/unique'
            }, {
                id:this.id
            })

            if(req.code == 200){
                this.nome = req.body.nome
                this.descricao = req.body.descricao
            }

        },

        async deletar(){

            const req = await request({
                method:'post',
                route:'campanhas/delete'
            }, {
                id:this.id
            })

            if(req.code == 200){
                this.$emit('reload')
                this.$emit('close')
            }

        }
    }

})

</script>