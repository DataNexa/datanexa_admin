<template>
    <Page>
        <template v-slot:header_page>
            <div class="col-12 col-md-9">
                <span class="h5 me-2"><Icon icon="IconCampanha" :scale="0.7" fill="blue"/> Campanhas</span>
                <a href="#">
                    <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/>
                </a>
                <a href="#">
                    <Icon icon="IconLogs" :scale="0.7" fill="blue"/>
                </a>
                <button class="btn btn-outline-primary mx-2">Nova Campanha</button>
            </div>
            <div class="col-12 col-md-3">
                <InputVue :input="input" @input_change_value="search" @input_searching="load"/> 
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
                <div class="row">
                    <ListCampanhaWidget :list="[
                {
                    title:'um titulo qualquer para ver como fica 1',
                    description:'uma descricao qualquer 1',
                    cards:[
                        {
                            id:1,
                            name:'uma cartao com titulo grande aqui',
                            state:'ativo',
                            description:'uma descricao qualquer',
                            criadoEm:'2024-01-20 00:00:00',
                            date:'2024-03-15 00:00:00'
                        },
                        {
                            id:2,
                            name:'uma cartao com titulo grande aqui 2',
                            state:'cancelado',
                            description:'uma descricao qualquer 2',
                            criadoEm:'2024-01-20 00:00:00',
                            modificadoEm:'2024-01-19 00:00:00'
                        },
                        {
                            id:3,
                            name:'uma cartao com titulo grande aqui 3',
                            state:'finalizado',
                            description:'uma descricao qualquer 3',
                            criadoEm:'2024-01-20 00:00:00',
                        },
                        {
                            id:4,
                            name:'uma cartao com titulo grande aqui 4',
                            state:'ativo',
                            description:'uma descricao qualquer 4',
                            criadoEm:'2024-01-20 00:00:00',
                            modificadoEm:'2024-01-19 00:00:00'
                        },
                        {
                            id:5,
                            name:'uma cartao com titulo grande aqui 5',
                            state:'ativo',
                            description:'uma descricao qualquer 5',
                            criadoEm:'2024-01-20 00:00:00',
                            modificadoEm:'2024-01-19 00:00:00'
                        }
                    ]
                },
                {
                    title:'um titulo qualquer para ver como fica 2',
                    description:'uma descricao qualquer 2',
                    cards:[
                        {
                            id:1,
                            name:'uma cartao com titulo grande aqui',
                            state:'ativo',
                            description:'uma descricao qualquer',
                            criadoEm:'2024-01-20 00:00:00',
                            date:'2024-03-15 00:00:00'
                        },
                        {
                            id:2,
                            name:'uma cartao com titulo grande aqui 2',
                            state:'ativo',
                            description:'uma descricao qualquer 2',
                            criadoEm:'2024-01-20 00:00:00',
                            modificadoEm:'2024-01-19 00:00:00'
                        },
                        {
                            id:3,
                            name:'uma cartao com titulo grande aqui 3',
                            state:'ativo',
                            description:'uma descricao qualquer 3',
                            criadoEm:'2024-01-20 00:00:00',
                        },
                        {
                            id:4,
                            name:'uma cartao com titulo grande aqui 4',
                            state:'ativo',
                            description:'uma descricao qualquer 4',
                            criadoEm:'2024-01-20 00:00:00',
                            modificadoEm:'2024-01-19 00:00:00'
                        },
                        {
                            id:5,
                            name:'uma cartao com titulo grande aqui 5',
                            state:'ativo',
                            description:'uma descricao qualquer 5',
                            criadoEm:'2024-01-20 00:00:00',
                            modificadoEm:'2024-01-19 00:00:00'
                        }
                    ]
                }
            ]"/>
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
import type { input_i } from '@/interfaces/InputI';
import ListCampanhaWidget from '../widgets/campanha/ListCampanhaWidget.vue';

interface data {
    input:input_i,
    loading:boolean
}
export default defineComponent({
    components:{Page, Icon, InputVue, LoadingSimple, ListCampanhaWidget},
    data():data{
        return {
            input:{
                text:{
                    type:'search',
                    placeholder:'Buscar Campanhas'
                },
                slug:'search'
            },
            loading:false
        }
    },
    methods:{
        load(){
            this.loading = true
        },
        getData(search?:string){

        },
        search(){
            this.loading = false
            this.getData(this.input.text?.value)
            console.log(this.input.text?.value);
        },
    }
})
</script>