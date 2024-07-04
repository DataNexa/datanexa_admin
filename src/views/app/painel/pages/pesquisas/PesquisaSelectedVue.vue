<template>
    <AlertVue :alert="alert"/>
    <ModalDynamic v-if="showModal" @close_modal="showModal=false" :dont-close="false">
        <h5>Tem certeza que deseja publicar esta pesquisa?</h5>
        <p>Publicar a pesquisa impossibilitará de realizar edições.<br>Está ciente disso?</p>
        <button v-if="pesquisa.ativo == 0" class="btn btn-outline-success mx-2" @click="publicarPesquisa">SIM, estou ciente e quero publica-la</button>
    </ModalDynamic>
    <ModalDynamic v-if="showModalFinish" @close_modal="showModalFinish=false" :dont-close="false">
        <h5>Tem certeza que deseja finalizar esta pesquisa?</h5>
        <p>Finaliza a pesquisa impossibilitará de que novos participantes possam votar.<br>Está ciente disso?</p>
        <button v-if="pesquisa.ativo == 1" class="btn btn-outline-success mx-2" @click="finalizarPesquisa">SIM, estou ciente e quero finaliza-la</button>
    </ModalDynamic>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12" v-if="!loading">
                <span class="h5 me-2">
                    <Icon icon="IconPesquisas   " :scale="0.7" fill="blue"/>
                Pesquisa</span>
                <a href="#" v-if="!loading && pesquisa.ativo > 0">
                    <router-link :to="`/pesquisas/relatorio/${id}`">
                        <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/>
                    </router-link>
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button v-if="pesquisa.ativo == 0" @click="showModal=true" class="btn btn-primary mx-2">Publicar Pesquisa</button>
                <router-link :to="`/pesquisas/responder/${id}`"
                    v-if="!loading && pesquisa.ativo > 0 && pesquisa.ativo < 2 && canResponse">
                    <button class="btn btn-outline-primary mx-2">Responder Pesquisa</button>
                </router-link>
                <router-link :to="`/pesquisas/edit/${id}`"
                    v-if="!loading && pesquisa.ativo == 0 && canEdit">
                    <button class="btn btn-outline-primary mx-2">Editar Pesquisa</button>
                </router-link>
                <button v-if="pesquisa.ativo == 1" @click="showModalFinish=true" class="btn btn-success mx-2">Finalizar Pesquisa</button>
            </div>
        </template>
        <template v-slot:corpo_page>
            <div class="container-fluid">
                <div class="row py-5">
                    <PesquisaSelectedWidget @codePesquisaRequest="changeCode" :id="id"/>
                </div>
            </div>            
        </template>
    </Page>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Page from '@/components/Page.vue';
import Icon from '@/components/Icon.vue';
import PesquisaSelectedWidget from '@/views/app/painel/widgets/pesquisas/PesquisaSelectedWidget.vue';
import LoadingSimple from '@/components/LoadingSimple.vue';
import { App } from '@/model/Entidades/App';
import ModalDynamic from '@/components/ModalDynamic.vue';
import { request } from '@/model/libs/Request';
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({
    
    data(){
        return {
            showModalFinish:false,
            showModal:false,
            loading:true,
            code:200,
            canEdit: App.userHasPermission('pesquisas@edit'),
            canResponse: App.userHasPermission('pesquisas@responder'),
            alert:{
                text:'',
                type:'success',
                show:false
            },
            pesquisa:{
                ativo:0,
                duration:'',
                titulo:'',
                descricao:'',
            }
        }
    },

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    components:{ Page, Icon, PesquisaSelectedWidget, LoadingSimple, ModalDynamic, AlertVue },

    methods:{
        
        changeCode(code:number, pesquisa:any){
            this.pesquisa = pesquisa
            this.code = code
            this.loading = false
        },

        async finalizarPesquisa(){

            const resp = await request({
                method:'post',
                route:'pesquisas/update'
            }, {
                id:this.id,
                titulo:this.pesquisa.titulo,
                descricao:this.pesquisa.descricao,
                termino:this.pesquisa.duration ? this.pesquisa.duration : 'indeterminado',
                ativo:2
            })

            this.showModalFinish = false

            if(resp.code == 200){
                this.pesquisa.ativo = 2
                this.alert.show = true 
                this.alert.type = 'success'
                this.alert.text = 'Pesquisa finalizada com sucesso!'
            } else {
                this.alert.show = true 
                this.alert.type = 'danger'
                this.alert.text = resp.message ? resp.message : 'Ocorreu um erro ao tentar finalizar a pesquisa. Tente novamente mais tarde.'
            }

        },

        async publicarPesquisa(){

            const resp = await request({
                method:'post',
                route:'pesquisas/update'
            }, {
                id:this.id,
                titulo:this.pesquisa.titulo,
                descricao:this.pesquisa.descricao,
                termino:this.pesquisa.duration ? this.pesquisa.duration : 'indeterminado',
                ativo:1
            })

            this.showModal = false

            if(resp.code == 200){
                this.pesquisa.ativo = 1
                this.alert.show = true 
                this.alert.type = 'success'
                this.alert.text = 'Pesquisa publicada com sucesso!'
            } else {
                this.alert.show = true 
                this.alert.type = 'danger'
                this.alert.text = resp.message ? resp.message : 'Ocorreu um erro ao tentar publicar a pesquisa. Tente novamente mais tarde.'
            }


        }

    }

})


</script>