<template>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconMonitoramento" :scale="0.7" fill="blue"/>
                    Monitoramento</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button class="btn btn-outline-primary mx-2">Novo Monitoramento</button>
            </div>
            
        </template>
        
        <template v-slot:corpo_page>
            <div class="container-fluid" v-if="loading">
                <div class="row justify-content-center py-5">
                    <div class="col-6 py-5">
                        <LoadingSimple/>
                    </div>
                </div>
            </div>
            <div class="container-fluid py-3" v-if="!loading">
                <div class="row">
                    <div class="col-12 col-md-11">
                        <div class="row">
                            <Widget v-for="m of monitoramentos"  :loading="false" col="12" md="6" lg="4">
                                <h5>{{ m.titulo }}</h5>
                                <p>{{ m.descricao }}</p>
                                <hr>
                                <div class="row">
                                    <div class="col-12 col-md-6">
                                        <p><i><small>criado em: {{ tranformData(m.creatat) }}</small></i></p>
                                        <div class="form-check form-switch py-2">
                                            <input class="form-check-input" type="checkbox" role="switch" id="ativoCheckSwitch" :checked="m.ativo == 1 ? 'true' : 'false'">
                                            <label class="form-check-label" for="ativoCheckSwitch">{{ m.ativo == 1 ? 'Ativo' : 'Desativado' }}</label>
                                        </div>
                                        <div class="form-check form-switch py-2">
                                            <input class="form-check-input" type="checkbox" role="switch" id="repeatCheckSwitch" :checked="m.repetir == 1 ? 'true' : 'false'">
                                            <label class="form-check-label" for="repeatCheckSwitch">Repetição {{ m.repetir == 1 ? 'Ativa' : 'Desativada' }}</label>
                                        </div>
                                        <router-link :to="`monitoramento/${m.id}`">
                                            <button class="btn btn-outline-primary mt-4">+ detalhes</button>
                                        </router-link>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <ChartWidget
                                            titulo=""
                                            chartType="doughnut"  
                                            :chartData="{
                                                labels:[ 'negativos',  'positivos', 'neutros'],
                                                data:[
                                                    m.negativos,
                                                    m.positivos,
                                                    m.neutros
                                                ]
                                            }"
                                        />
                                    </div>
                                </div>
                            </Widget>
                        </div>
                    </div>
                    <div class="col-12 col-md-1" v-if="!showTasks">
                        <Widget :loading="carregandoTasks" col="12">
                            <div class="row">
                                <div class="col-12 py-2">
                                    <a href="#" @click="showTasks = true"><span><IconLeft /></span><span >fila</span></a>
                                </div>
                                <div class="col-12" v-if="taskStatus.totalRunning > 0">
                                    <h5><IconGear/> {{ taskStatus.totalRunning }}</h5>                                   
                                </div>
                                <div class="col-12" v-if="taskStatus.totalAwait > 0">
                                    <h5> <Icon icon="IconClock" :scale="0.5" /> {{ taskStatus.totalAwait }} </h5>
                                </div>
                            </div>
                        </Widget>
                    </div>
                </div>
            </div>
        </template>
    </Page>
</template>

<script lang="ts">

import {defineComponent} from 'vue'
import Page from '@/components/Page.vue';
import Icon from '@/components/Icon.vue';
import InputVue from '@/components/InputVue.vue';
import LoadingSimple from '@/components/LoadingSimple.vue';
import Widget from '@/components/Widget.vue';
import ListPesquisasWidget from '../widgets/pesquisas/ListPesquisasWidget.vue';
import { App } from '@/model/Entidades/App';
import ChartWidget from '@/views/app/painel/widgets/_includes/ChartWidget.vue'
import { request } from '@/model/libs/Request';
import Data from '@/model/libs/Data';
import IconGear from '@/components/icons/IconGear.vue';
import IconLeft from '@/components/icons/IconLeft.vue'

export default defineComponent({

    created() {
        this.loadData()
        this.loadTasks()
    },

    components:{Page, Icon, InputVue, LoadingSimple, ListPesquisasWidget, Widget, ChartWidget, IconGear, IconLeft},
    
    data(){
        return {
            code:App.havePagePermission("monitoramento") ? 200 : 401,
            loading:true,
            showTasks:false,
            carregandoTasks:true,
            monitoramentos:[] as Array<{
                id:number,
                client_id:number,
                titulo:string,
                descricao:string,
                ativo:number,
                repetir:number,
                creatat:string,
                pesquisa:string,
                alvo:string,
                negativos:number,
                positivos:number,
                neutros:number
            }>,
            tasks:[] as Array<{

            }>,
            taskStatus:{
                totalAwait:0,
                totalRunning:0,
                totalFinish:0
            }
        }
    },
    methods:{
        async loadData(){
            const resp = await request({
                method:'post',
                route:'monitoramento/list'
            })
            this.code = resp.code
            if(this.code == 200){
                this.monitoramentos = resp.body
            }
            this.loading = false
        },

        async loadTasks(){

            this.carregandoTasks = true

            const resp = await request({
                method:'post',
                route:'monitoramento/fila_list'
            })

            if(resp.code == 200){
                for(const task of resp.body){
                    if(task.task_status == 1){
                        this.taskStatus.totalAwait++
                    }
                    if(task.task_status == 2){
                        this.taskStatus.totalRunning++
                    }
                    if(task.task_status == 3){
                        this.taskStatus.totalFinish++
                    }
                    this.tasks.push(task)
                }
            }

            this.carregandoTasks = false
        },

        tranformData(data:string){
            return  (new Data(data)).toBr()
        }
    }
})
</script>
