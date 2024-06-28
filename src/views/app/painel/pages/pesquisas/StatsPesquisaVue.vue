<template>

    <Page :code="code">
        
        <template v-slot:header_page>

            <div class="col-12">

                <span class="h5 me-2">
                    <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/>
                    Relatorio de Pesquisa
                </span> 

                <button v-if="!loadingInfo" @click="imprimir" class="btn btn-outline-primary mx-2">Imprimir Relatório</button>

            </div>

        </template>

        <template v-slot:corpo_page>
            
            <Widget :loading="loadingInfo">
                <h5 class="text-center">{{ pesquisa.titulo }}</h5>
                <p class="text-center text-dark">{{ pesquisa.descricao }}</p>
                <hr>
                <p class="text-dark"><small>Criado em: {{ transformData(pesquisa.createAt) }}</small><br>
                <small>Finaliza em: {{ transformData(pesquisa.duration) }}</small></p>
                <p class="text-dark"><b>{{ pesquisa.quantParticipantes }} participantes</b></p>
                <p v-if="pesquisa.ativo == 1" class="text-primary">Ativa</p>
                <p v-if="pesquisa.ativo == 0" class="text-dark"><i><small>Rascunho</small></i></p>
                <p v-if="pesquisa.ativo == 2" class="text-success"><i><small>Finalizada</small></i></p>
            </Widget>

            <Widget :loading="loadingPerguntas" col="12">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="text-primary text-center pb-5">Perfil dos Participantes</h3>
                        </div>
                        <div v-for="chart of charts" class="col-12 col-md-6 col-lg-4">
                            <ChartWidget  
                                :titulo="chart.titulo"
                                :chartType="chart.type"  
                                :chartData="chart.data"
                            />
                        </div>
                    </div>
                </div>
            </Widget>

            <Widget :loading="loadingPerguntas" col="12">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="text-primary text-center pb-3">Questionário Aplicado</h3>
                        </div>
                        <ChartPesquisaWidget 
                            v-for="pergunta of perguntas"
                                :pergunta="pergunta.pergunta"
                                :options="pergunta.options"
                        />
                    </div>
                </div>
            </Widget>

        </template>

    </Page>
    
</template>

<script lang="ts">

import Page from '@/components/Page.vue';
import { defineComponent } from 'vue'
import Icon from '@/components/Icon.vue';
import Widget from '@/components/Widget.vue';
import { App } from '@/model/Entidades/App';
import Data from '@/model/libs/Data';
import ChartWidget from '@/views/app/painel/widgets/pesquisas/ChartWidget.vue'
import { request, download } from '@/model/libs/Request';
import ChartPesquisaWidget from '@/views/app/painel/widgets/pesquisas/ChartPeguntasWidget.vue'

interface chartDunut { titulo:string, type: 'bar' | 'line' | 'pie' | 'doughnut', data: { labels: string[], data: number[] } }
interface chartPerguntas { pergunta:string, options:{ valor:string, votos:number, success:boolean }[] }

export default defineComponent({
    
    components:{Page, Icon, Widget, ChartWidget,ChartPesquisaWidget},

    async created() {
        this.code = App.havePagePermission('pesquisas') && App.userHasPermission('pesquisas@relatorio') ? 200 : 401
        if(this.code == 200){
            await this.getPesquisa()
            await this.getRelatorio()
        } 
    },
    data() {
        return {
            charts: [] as Array<chartDunut>,
            perguntas:[] as Array<chartPerguntas>,
            code:200,
            loadingInfo:false,
            loadingPerguntas:false,
            pesquisa:{
                createAt:'',
                duration:'',
                titulo:'',
                descricao:'',
                quantPerguntas:0,
                quantParticipantes:0,
                ativo:0
            },
        }
    },
    props:{
        id:{
            type:Number,
            required:true
        }
    },
    methods: {
        async getPesquisa(){

            this.loadingInfo = true
            
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
            this.loadingInfo = false
            
        },

        async imprimir(){

            const req = await download({
                method:'post',
                route:'pesquisas/imprimir_relatorio'
            }, {
                id:this.id,
                name:'Relatorio: '+this.pesquisa.titulo
            })

        },

        async getRelatorio(){

            this.loadingPerguntas = true
            
            const req = await request({
                method:'post',
                route:'pesquisas/relatorio'
            }, {
                id:this.id
            })

            if(req.code != 200){
                this.code = req.code
                this.loadingPerguntas = false
                return
            }
            
            for(const p of Object.values(req.body['perfil'])){
                let perfil = p as any
                let labels = []
                let values = []
                for(const option of perfil.options){
                    labels.push(option.valor)
                    values.push(option.votos)
                }
                const objPerfil:chartDunut = {
                    titulo: perfil.pergunta,
                    type:'doughnut',
                    data:{
                        labels: labels,
                        data: values
                    }

                }
                this.charts.push(objPerfil)
            }
   
            
            for(const q of Object.values(req.body['questionario'])){
                
                let questionario = q as any

                const objQuest:chartPerguntas = {
                    pergunta: questionario.pergunta,
                    options:questionario.options
                }

                let maior = 0
                for(const option of questionario.options){
                    if(option.votos > maior){
                        maior = option.votos
                    }
                }

                for(const option of questionario.options){
                    option.success = option.votos == maior
                }

                this.perguntas.push(objQuest)
            
            }

            this.loadingPerguntas = false
            
        },

        transformData(data:string){
            return (new Data(data)).toBr()
        }
    },
})

</script>