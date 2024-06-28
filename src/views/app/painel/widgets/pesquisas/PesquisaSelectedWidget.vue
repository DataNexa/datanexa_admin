<template>
    <Widget :loading="loading" col="12">
        <h5 class="text-center">{{ pesquisa.titulo }}</h5>
        <p class="text-center text-dark">{{ pesquisa.descricao }}</p>
        <hr>
        <p class="text-dark" v-if="!dontShow || !dontShow.includes('data')"><small>Criado em: {{ transformData(pesquisa.createAt) }}</small><br>
        <small>Finaliza em: {{ transformData(pesquisa.duration) }}</small></p>
        <p v-if="!dontShow || !dontShow.includes('estatisticas')" class="text-dark"><b>{{ pesquisa.quantPerguntas }} perguntas<br>
            {{ pesquisa.quantParticipantes }} participantes</b></p>
        <div v-if="!dontShow || !dontShow.includes('status')">
            <p v-if="pesquisa.ativo == 1" class="text-primary">Ativa</p>
            <p v-if="pesquisa.ativo == 0" class="text-dark"><i><small>Rascunho</small></i></p>
            <p v-if="pesquisa.ativo == 2" class="text-success"><i><small>Finalizada</small></i></p>
        </div>
    </Widget>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Widget from '@/components/Widget.vue';
import Data from '@/model/libs/Data';
import { request } from '@/model/libs/Request';

export default defineComponent({
    created() {
        this.getData()
        console.log('created');
        
    },
    components:{ Widget },
    props:{
        id:{
            type:Number,
            required:true
        },
        dontShow:{
            type:Array<String>,
            required:false
        }
    },
    data() {
        return {
            code:200,
            loading:true,
            pesquisa:{
                createAt:'',
                duration:'',
                titulo:'',
                descricao:'',
                quantPerguntas:0,
                quantParticipantes:0,
                ativo:0
            }
        }
    },

    methods: {
        async getData(){
            this.loading = true
            const req = await request({
                method:'post',
                route:'pesquisas/unique'
            },{
                id:this.id
            })
            if(req.code == 200){
                this.pesquisa = req.body
            }
            this.code = req.code 
            this.loading = false
            this.onFinish()
        },

        transformData(data:string){
            return (new Data(data)).toBr()
        },

        onFinish(){
            this.$emit('codePesquisaRequest', this.code, this.pesquisa)
        }
    },
})

</script>