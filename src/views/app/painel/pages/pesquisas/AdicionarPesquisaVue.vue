<template>
    <AlertVue :alert="alert"/>
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
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-8">
                        <Widget :loading="false">
                            <FormVue @click_button="criar" :formdata="formData" :buttons="buttons"/>
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
import FormVue from '@/components/FormVue.vue';
import Widget from '@/components/Widget.vue';
import AlertVue from '@/components/AlertVue.vue';

import { App } from '@/model/Entidades/App';
import { request } from '@/model/libs/Request';

export default defineComponent({
    components:{Page, Icon, InputVue, LoadingSimple, FormVue, Widget, AlertVue},
    data(){
        return {
            alert:{
                text:'',
                show:false,
                type:'danger'
            },
            formData:{
                title:'',
                description:'',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Título',
                            type:'text',
                            placeholder:'Título da Pesquisa',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Descrição',
                            type:'text',
                            placeholder:'Descrição da Pesquisa',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                    {
                        text:{
                            label:'Data de Termino',
                            type:'date',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:false
                    }
                ]
            },
            buttons:[
                {
                    slug:'criar',
                    css:'btn btn-outline-primary d-block ms-auto',
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
        
        async criar(){

            const resp = await request({
                method:'post',
                route:'pesquisas/create'
            }, {
                titulo:this.formData.inputs[0].text.value,
                descricao:this.formData.inputs[1].text.value,
                termino:this.formData.inputs[2].text.value,
                ativo:0
            })

            if(resp.code != 200){
                this.alert.text = resp.message ? resp.message : 'Erro ao tentar salvar'
                this.alert.show = true
                this.buttons[0].loading = false
                return
            }

            this.$router.push(`/pesquisas/edit/${resp.body}`);

        },

        getData(search?:string){

        },
    }
})
</script>