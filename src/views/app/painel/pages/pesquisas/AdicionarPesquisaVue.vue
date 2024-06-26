<template>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <!-- <Icon icon="IconPesquisa" :scale="0.7" fill="blue"/>  -->
                Nova Pesquisa</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button class="btn btn-outline-primary mx-2"></button>
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
                <FormVue :formdata="formData" :buttons="buttons"/>
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
import FormVue from '@/components/FormVue.vue';

import { App } from '@/model/Entidades/App';

export default defineComponent({
    components:{Page, Icon, InputVue, LoadingSimple, FormVue},
    data(){
        return {
            formData:{
                title:'Criar ',
                description:'',
                inputsControl:{
                    disable:true,
                },
                inputs:[

                ]
            },
            buttons:[
                {
                    slug:'criar',
                    css:'d-block ms-auto',
                    text:'criar',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ],
            code:App.havePagePermission("pesquisas") && App.userHasPermission('pesquisas@responder') ? 200 : 401,
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