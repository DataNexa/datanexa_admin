<template>
    
    <ModalDynamic v-if="openModal" @close_modal="openModal=false">
        <component :is="component" :id="id" @createContato="listContatos" @close="openModal=false"></component>
    </ModalDynamic>

    <Page :code="code">
        <template v-slot:header_page>

            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconContatos" :scale="0.7" fill="blue"/>
                Grupo:</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button class="btn btn-outline-primary mx-2" @click="openModal=true">Novo Contato</button>
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
                    <div class="col-12">
                        <Widget col="12" :loading="false">
                            <h3>{{ grupo.titulo }}</h3>
                            <h5>{{ grupo.descricao }}</h5>
                            <p>Total de Contatos: {{ total }}</p>
                            <a v-if="grupo.link && grupo.link.trim() != ''" target="_blank" :href="`${grupo.link}`">
                                <IconWhatsapp/> Grupo do WhatsApp
                            </a>
                        </Widget>
                    </div>
                </div>
                <div v-if="loadingContatos" class="row justify-content-center py-5">
                    <div class="col-6 py-5">
                        <LoadingSimple/>
                    </div>
                </div>
                <div v-if="!loadingContatos" class="row">
                    <div class="col-12">
                        <ContatosListWidget v-if="contatos.length > 0" :contatos="contatos" />
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
import LoadingSimple from '@/components/LoadingSimple.vue';
import ModalDynamic from '@/components/ModalDynamic.vue';
import Widget from '@/components/Widget.vue';
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import ContatosListWidget from '@/views/app/painel/widgets/contatos/ContatosListWidget.vue';
import { App } from '@/model/Entidades/App';
import { request } from '@/model/libs/Request';
import EditarGrupo from '@/views/app/painel/widgets/contatos/EditarGrupo.vue';
import AdicionarContato from '@/views/app/painel/widgets/contatos/AdicionarContato.vue';

interface contatos_i {
    id:number,
    grupo_id:number,
    apelido:string,
    nome:string,
    whatsapp:string,
    email:string,
    instagram:string,
    twitter:string,
    facebook:string
}

interface grupos_i {
    id:number,
    client_id:number,
    titulo:string,
    descricao:string,
    link:string,
    ativo:number
}

export default defineComponent({

    components:{ ContatosListWidget, AdicionarContato, EditarGrupo, IconWhatsapp, Widget, Page, Icon, LoadingSimple, ModalDynamic },

    created() {
        this.init()
    },

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    data(){
        return {
            code:App.havePagePermission("contatos") ? 200 : 401,
            loading:false,
            openModal:false,
            loadingContatos:false,
            contatoSelectedId:0,
            component:'AdicionarContato',
            grupo: {} as grupos_i,
            contatos:[] as Array<contatos_i>,
            total:0
        }
    },
    methods:{

        async init(){
            const status = await this.getDataGrupo()
            if(status){
                this.listContatos()
            }
        },

        async getDataGrupo():Promise<boolean>{

            this.loading = true 

            if(this.code != 200) return false

            const req = await request({
                method:'post',
                route:'grupos/unique'
            }, {
                id:this.id
            })

            if(req.code == 200){
                this.grupo = req.body as grupos_i
                this.loading = false
                return true
            }  else {
                this.code = req.code
                return false
            }
            
        },

        async listContatos(){
            
            this.loadingContatos = true 
            this.contatos = []

            if(this.code != 200) return

            const req = await request({
                method:'post',
                route:'contatos/list'
            }, {
                grupo_id:this.id
            })

            if(req.code == 200){
                this.contatos = req.body as contatos_i[]
            } 

            console.log(this.contatos);
            

            this.loadingContatos = false

        },

        async editar(){

        },
    }
})
</script>