<template>

    <div class="row py-4">

        <div class="col-12 col-md-6 col-lg-4 d-block me-auto mt-5" v-if="loading">
            <Widget :loading="false">
                <LoadingSimple/>
            </Widget>
        </div>

        <div v-else v-for="pesquisa of listaPesquisas" class="col-12 col-md-6 col-lg-4">
            <router-link :to="`/pesquisas/${pesquisa.id}`">
                <Widget :loading="false">
                    <h5 class="text-center">{{ pesquisa.titulo }}</h5>
                    <p class="text-center text-dark">{{ pesquisa.descricao }}</p>
                    <hr>
                    <p class="text-dark"><small>Criado em: {{ transformData(pesquisa.createAt) }}</small><br>
                    <small>Finaliza em: {{ transformData(pesquisa.duration) }}</small></p>
                    <p class="text-dark"><b>{{ pesquisa.quantPerguntas }} perguntas<br>
                        {{ pesquisa.quantParticipantes }} participantes</b></p>
                    <p v-if="pesquisa.ativo == 1" class="text-primary">Ativa</p>
                    <p v-if="pesquisa.ativo == 0" class="text-dark"><i><small>Rascunho</small></i></p>
                    <p v-if="pesquisa.ativo == 2" class="text-success"><i><small>Finalizada</small></i></p>
                </Widget>
            </router-link>
        </div>
        
    </div>


</template>


<script lang="ts">

import Widget from '@/components/Widget.vue';
import { request } from '@/model/libs/Request';
import Data from '@/model/libs/Data';
import LoadingSimple from '@/components/LoadingSimple.vue';

import { defineComponent } from 'vue'

interface pesquisa { id:number, titulo:string, descricao:string, ativo:number, createAt:string, duration:string, quantPerguntas: number, quantParticipantes:number }

export default defineComponent({

    created() {
        this.listar()
    },

    components:{
        Widget, LoadingSimple
    },

    data():{
        listaPesquisas:pesquisa[],
        loading:boolean
    } {
        return {
            listaPesquisas:[ ],
            loading:true
        }
    },


    methods: {
        async listar(){
            this.loading = true
            const req = await request({
                method:'post',
                route:'pesquisas/list'
            })
            this.listaPesquisas = req.body
            this.loading = false
        },

        transformData(data:string){
            return (new Data(data)).toBr()
        }
    },
})

</script>