<template>
    
    <ModalDynamic v-if="openModal" @close_modal="openModal=false">
        <component :is="component"
            @createCampanha="onCreateCampanha"
            @createCard="onCreateCard"
            @changeTo="onChangeTo"
            @reload="list"
            @close="openModal=false"
            :id="campanhaId"
        ></component>
    </ModalDynamic>

    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12 col-md-9">
                <span class="h5 me-2"><Icon icon="IconCampanha" :scale="0.7" fill="blue"/> Campanhas</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/> -->
                </a>
                <button @click="() => {
                    component = 'NovaCampanha'
                    openModal = true
                }" class="btn btn-outline-primary mx-2">Nova Campanha</button>
            </div>
            <div class="col-12 col-md-3">
                <!-- <InputVue :input="input" @input_change_value="search" @input_searching="load"/>  -->
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
                    <ListCampanhaWidget 
                    :key="update"
                    @openInfo="(id) => {
                        campanhaId = id 
                        component  = 'InfoCampanha'
                        openModal  = true
                    }"
                    @createCard="(id) => {
                        campanhaId = id 
                        component  = 'NovoCard'
                        openModal  = true
                    }"
                    :list="campanhas"/>
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
import ListCampanhaWidget from '@/views/app/painel/widgets/campanha/ListCampanhaWidget.vue';
import { App } from '@/model/Entidades/App';
import ModalDynamic from '@/components/ModalDynamic.vue';
import NovaCampanha from '@/views/app/painel/widgets/campanha/NovaCampanha.vue'
import InfoCampanha from '@/views/app/painel/widgets/campanha/InfoCampanha.vue'
import EditarCampanha from '@/views/app/painel/widgets/campanha/EditarCampanha.vue'
import NovoCard from '@/views/app/painel/widgets/campanha/NovoCard.vue'
import { request } from '@/model/libs/Request';

interface tarefas {
    tarefa_id:number,
    tarefa:string,
    descricao:string,
    status:number,
    createAt:string,
    dataLimite:string
}

interface campanhas_i {
    id:number,
    nome:string,
    descricao:string,
    tarefas:tarefas[]
}

export default defineComponent({

    created() {
        this.list()
    },

    components:{Page, Icon, InputVue, LoadingSimple, ListCampanhaWidget, ModalDynamic, NovaCampanha, InfoCampanha, EditarCampanha, NovoCard},

    data(){
        return {
            update:1,
            code: App.havePagePermission("campanhas") ? 200 : 401,
            openModal:false,
            loading:true,
            component:'InfoCampanha',
            campanhaId:0,
            campanhas:[] as campanhas_i[]
        }
    },
    methods:{

        async list(){
            this.loading = true
            const resp = await request({
                method:'post',
                route:'campanhas/list'
            })
            this.code = resp.code
            if(resp.code == 200){
                this.campanhas = resp.body
            }
            this.loading = false
        },

        onCreateCampanha(campanha:campanhas_i){
            this.campanhas.push(campanha)
            this.openModal = false
        },

        onCreateCard(campanha_id:number, card:tarefas){
            for (let i = 0; i < this.campanhas.length; i++) {
                if(this.campanhas[i].id == campanha_id){
                    this.campanhas[i].tarefas.unshift(card)
                    this.openModal = false
                    this.update++
                    return
                }
            }
        },

        onChangeTo(change:string){
            this.component = change
        }

    }
})
</script>