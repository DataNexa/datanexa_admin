<template>
    <ModalDynamic v-if="openModal" @close_modal="openModal=false">
        <component :is="component"
            @changeTo="onChangeTo"
            @reload="list"
            @close="openModal=false"
            :id="grupoId"
        ></component>
    </ModalDynamic>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconContatos" :scale="0.7" fill="blue"/>
                Grupos de Contatos</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button v-if="canAddGrupo" class="btn btn-outline-primary mx-2" @click="openModal=true">Novo Grupo</button>
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
                <div class="row py-3">
                    <div class="col-12 col-md-6 col-lg-4" v-for="grupo of grupos">
                        <Widget col="12" :loading="false">
                            <h5 class="text-center">{{ grupo.titulo }}</h5>
                            <p class="text-center">{{ grupo.descricao }}</p>
                            <a v-if="grupo.link && grupo.link.trim() != ''" target="_blank" :href="grupo.link" class="text-center"><IconWhatsapp/> Grupo do WhatsApp</a>
                            <router-link :to="`contatos/${grupo.id}`">
                                <button style="width: 50%;" class="btn btn-outline-primary btn-sm d-block mx-auto mt-2"> + detalhes</button>
                            </router-link>
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
import ModalDynamic from '@/components/ModalDynamic.vue';
import AdicionarGrupo from '@/views/app/painel/widgets/contatos/AdicionarGrupo.vue'
import Widget from '@/components/Widget.vue';
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

import { App } from '@/model/Entidades/App';
import { request } from '@/model/libs/Request';

interface grupos_i {
    id:number,
    client_id:number,
    titulo:string,
    descricao:string,
    link:string,
    ativo:number
}

export default defineComponent({

    components:{ IconWhatsapp, Widget, Page, Icon, InputVue, LoadingSimple, ModalDynamic, AdicionarGrupo },

    created() {
        this.list()
    },

    data(){
        return {
            code:App.havePagePermission("contatos") ? 200 : 401,
            loading:false,
            openModal:false,
            grupoId:0,
            component:'AdicionarGrupo',
            grupos:[] as Array<grupos_i>,
            canAddGrupo:App.userHasPermission('contatos@create_group')
        }
    },
    methods:{

        async list(){
            
            this.loading = true 

            if(this.code != 200) return

            const req = await request({
                method:'post',
                route:'grupos/list'
            })

            if(req.code == 200){
                this.grupos = req.body as grupos_i[]
            } 

            this.loading = false

        },

        onChangeTo(){

        }
    }
})
</script>