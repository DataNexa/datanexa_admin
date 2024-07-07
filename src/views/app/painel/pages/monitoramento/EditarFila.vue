<template>
    <AlertVue :alert="alert"/>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconMonitoramento" :scale="0.7" fill="blue"/>
                    Fila de Execução dos Monitoramentos</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                
            </div>
            
        </template>
        
        <template v-slot:corpo_page>
            <Widget :loading="loading">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <p><b class="bg-warning p-2">Atenção: </b><br><i class="p-1"> A alteração da ordem na fila de monitoramento só será propagada após o termino de todos serviços da fila atual.</i></p>
                        </div>
                        <div class="col-12 col-md-6">
                            <button @click="saveChanges" class="btn btn-outline-primary d-block ms-auto" v-if="change">salvar alterações</button>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h5 class="text-center">Fila de Monitoramentos:</h5>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-8 border rounded my-1" v-for="monitoramento,k of monitoramentos" style="height:100px;" :key="k">
                            <div class="row py-2 p-lg-1" style="height:100%;">
                                <div class="col-10">
                                    <h5>{{ monitoramento.titulo }}</h5>
                                    <p>{{ monitoramento.descricao }}</p>
                                </div>
                                <div class="col-2 rounded border" style="height:100%;">
                                    <div class="row" style="height:100%;">
                                        <div @click="() => alterarPrioridade(monitoramento.prioridade, -1, k)" class="col-12 text-center btn-hover" style="height:50%;">
                                            <IconUp />
                                        </div>
                                        <div @click="() => alterarPrioridade(monitoramento.prioridade, 1, k)" class="col-12 text-center btn-hover" style="height:50%;">
                                            <IconDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Widget>
        </template>
    </Page>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Page from '@/components/Page.vue';
import Widget from '@/components/Widget.vue';
import IconUp from '@/components/icons/IconUp.vue'
import IconDown from '@/components/icons/IconDown.vue'
import { request } from '@/model/libs/Request';
import AlertVue from '@/components/AlertVue.vue';

interface monitoramento_simple_i{
    id:number,
    prioridade:number,
    titulo:string,
    descricao:string
}

export default defineComponent({

    created() {
        this.getList()
    },

    methods: {

        async saveChanges(){

            this.loading = true 

            const ids    = this.monitoramentos.map(e => e.id)

            const resp   = await request({
                method:'post',
                route:'monitoramento/fila_manager'
            }, {
                fila_ids:ids
            })

            if(resp.code == 200){
                this.alert.text = 'Alteração realizada com sucesso!'
                this.alert.type = 'success'
                this.alert.show = true
                this.change = false
            } else {
                this.alert.text = resp.message ? resp.message : 'Não foi possivel realizar a alteração na fila'
                this.alert.type = 'danger'
                this.alert.show = true
            }

            this.loading = false

        },

        async getList(){

            this.loading = true 

            const resp = await request({
                method:'post',
                route:'monitoramento/listPriority'
            })
            
            this.code = resp.code

            this.loading = false 

            if(resp.code == 200){
                this.monitoramentos = resp.body as monitoramento_simple_i[]
            }

        },

        alterarPrioridade(prioridadeAtual:number, soma:number, k:number){
            
            this.change = true

            const chaveVizinho = k + soma 
            const limit = this.monitoramentos.length - 1

            if(chaveVizinho < 0 || chaveVizinho > limit){
                return 
            }

            let monitoramentos_lista_final = []

            const vizinho = this.monitoramentos[chaveVizinho]
            const monitoramentoAlterar = this.monitoramentos[k]

            monitoramentoAlterar.prioridade = prioridadeAtual + soma 
            vizinho.prioridade = vizinho.prioridade - soma

            for (let i = 0; i < this.monitoramentos.length; i++) {
                if(i == chaveVizinho){
                    monitoramentos_lista_final.push(monitoramentoAlterar)
                } else if(i == k){
                    monitoramentos_lista_final.push(vizinho)
                } else {
                    monitoramentos_lista_final.push(this.monitoramentos[i])
                }
            }

            this.monitoramentos = monitoramentos_lista_final
            
        }

    },

    components:{ Page, Widget, IconDown, IconUp, AlertVue },
    data() {
        return {
            alert:{
                text:'',
                type:'danger',
                show:false
            },
            code:200,
            loading:true,
            change:false,
            monitoramentos:[
                {
                    id:1,
                    titulo:'Monitoramento 1',
                    prioridade:1,
                    descricao:'descricao monitoramento 1'
                },
                {
                    id:2,
                    titulo:'Monitoramento 2',
                    prioridade:2,
                    descricao:'descricao monitoramento 2'
                },
            ] as Array<monitoramento_simple_i>,
        }
    },
})

</script>

<style scoped>

.btn-hover {
    cursor:pointer;
    background-color:aliceblue;
    transition: 0.3s;
}

.btn-hover:hover {
    background-color:white;
}

</style>