<template>
    <Page :code="code">
        
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconContatos" :scale="0.7" fill="blue"/>
                Lista de Contatos</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button class="btn btn-outline-primary mx-2" v-if="canAddGrupo">Novo Grupo</button>
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
                <h5>Nome do Grupo</h5>
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

// gerar a lista para ser reaproveitado no search
import ContatosListWidget from '@/views/app/painel/widgets/contatos/ContatosListWidget.vue'

import { App } from '@/model/Entidades/App';

export default defineComponent({
    
    components:{ Page, Icon, InputVue, LoadingSimple, ContatosListWidget },

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    data(){
        return {
            code:App.havePagePermission("user") ? 200 : 401,
            loading:false,
            canAddGrupo:App.userHasPermission('contatos@create_group')
        }
    },

    methods:{
        getData(){

        },
    }

})
</script>