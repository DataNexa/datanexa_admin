<template>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <!-- <Icon icon="IconPesquisa" :scale="0.7" fill="blue"/>  -->
                Pesquisa:</span>
                <a href="#" v-if="!loading && pesquisa.ativo > 0">
                    <router-link :to="`/pesquisas/relatorio/${id}`">
                        <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/>
                    </router-link>
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <router-link :to="`/pesquisas/responder/${id}`"
                    v-if="!loading && pesquisa.ativo > 0 && canResponse">
                    <button class="btn btn-outline-primary mx-2">Responder Pesquisa</button>
                </router-link>
                <router-link :to="`/pesquisas/edit/${id}`"
                    v-if="!loading && pesquisa.ativo == 0 && canEdit">
                    <button class="btn btn-outline-primary mx-2">Editar Pesquisa</button>
                </router-link>
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
import PesquisaSelectedWidget from '../../widgets/pesquisas/PesquisaSelectedWidget.vue';
import LoadingSimple from '@/components/LoadingSimple.vue';
import { App } from '@/model/Entidades/App';

export default defineComponent({
    
    data(){
        return {
            loading:true,
            code:200,
            canEdit: App.userHasPermission('pesquisas@edit'),
            canResponse: App.userHasPermission('pesquisas@responder'),
            pesquisa:{
                ativo:0
            }
        }
    },

    props:{
        id:{
            type:Number,
            required:true
        }
    },
    components:{ Page, Icon, PesquisaSelectedWidget, LoadingSimple },

    methods:{
        changeCode(code:number, pesquisa:any){
            this.pesquisa = pesquisa
            this.code = code
            this.loading = false
        }
    }

})


</script>