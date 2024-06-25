<template>
    <div class="container-fluid" v-if="loading">
        <div class="row justify-content-center py-5">
            <div class="col-6 py-5">
                <LoadingSimple/>
            </div>
        </div>
    </div>
    <Page v-else :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <!-- <Icon icon="IconPesquisa" :scale="0.7" fill="blue"/>  -->
                Pesquisa:</span>
                <a href="#">
                    <router-link :to="`/pesquisas/relatorio/${id}`">
                        <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/>
                    </router-link>
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button class="btn btn-outline-primary mx-2">Responder Pesquisa</button>
                <button class="btn btn-outline-primary mx-2">Editar Pesquisa</button>
            </div>
        </template>
        <template v-slot:corpo_page>
            <div class="container-fluid">
                <div class="row py-5">
                    <Widget :loading="false" col="12">
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
                </div>
            </div>            
        </template>
    </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Page from '@/components/Page.vue';
import Icon from '@/components/Icon.vue';
import Widget from '@/components/Widget.vue';
import Data from '@/model/libs/Data';
import { request } from '@/model/libs/Request';
import LoadingSimple from '@/components/LoadingSimple.vue';

export default defineComponent({
    
    created() {
        this.getData()
    },
    props:{
        id:{
            type:Number,
            required:true
        }
    },
    components:{Page, Icon, Widget, LoadingSimple},
    data() {
        return {
            code:200,
            loading:false,
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

    methods:{
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
        },
        
        transformData(data:string){
            return (new Data(data)).toBr()
        }
    }

})


</script>