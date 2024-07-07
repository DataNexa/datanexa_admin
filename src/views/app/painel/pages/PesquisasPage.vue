<template>
    
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconPesquisas" :scale="0.7" fill="blue"/>
                Pesquisas</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <router-link v-if="canAdd" to="/pesquisas/adicionar">
                    <button class="btn btn-outline-primary mx-2">Nova Pesquisa</button>
                </router-link>
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
            <div class="container-fluid" v-if="!loading">
                <ListPesquisasWidget/>
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

import ListPesquisasWidget from '@/views/app/painel/widgets/pesquisas/ListPesquisasWidget.vue';
import { App } from '@/model/Entidades/App';

export default defineComponent({
    components:{ Page, Icon, InputVue, LoadingSimple, ListPesquisasWidget },
    data(){
        return {
            code:App.havePagePermission("pesquisas") ? 200 : 401,
            canAdd:App.userHasPermission('pesquisas@create'),
            loading:false
        }
    },
    methods:{
        load(){
            this.loading = true
        },
        getData(search?:string){

        },
    }
})
</script>