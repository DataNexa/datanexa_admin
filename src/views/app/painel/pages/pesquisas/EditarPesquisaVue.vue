<template>
    <AlertVue :alert="alert"/>
    <ModalDynamic @close_modal="closeModal" v-if="showAddPergunta">
        <FormVue @click_button="responseFormPergunta" :formdata="formAddPergunta" :buttons="buttonsAddPergunta" />
    </ModalDynamic>
    <ModalDynamic @close_modal="closeModal" v-if="showAddPerfil">
        <FormVue @click_button="responseFormPerfil" :formdata="formAddPerfil" :buttons="buttonsAddPerfil" />
    </ModalDynamic>
    <ModalDynamic v-if="showModal" @close_modal="closeModal" :dont-close="false">
        <h5>Tem certeza que deseja excluir esta pesquisa?</h5>
        <p>Exluir a pesquisa fará com que todos os dados fiquem indisponíveis</p>
        <button v-if="pesquisa.ativo == 0" class="btn btn-outline-danger mx-2" @click="exluirPesquisa">SIM, quero excluir</button>
    </ModalDynamic>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <!-- <Icon icon="IconPesquisa" :scale="0.7" fill="blue"/>  -->
                Editar Pesquisa</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button v-if="pesquisa.ativo == 1" class="btn btn-outline-dark mx-2">Colocar como Rascunho</button>
                <button v-if="pesquisa.ativo == 0" @click="showModal = true" class="btn btn-outline-danger mx-2">Excluir Pesquisa</button>
                <button v-if="pesquisa.ativo == 1" class="btn btn-outline-success mx-2">Finalizar Pesquisa</button>

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
                            <FormVue @click_button="editarInfo" :formdata="formData" :buttons="buttons"/>
                        </Widget>
                    </div>

                    <div class="col-12 col-lg-8">
                        <Widget :loading="false">
                            <h3 class="text-center text-primary">Perfil</h3>
                            <button @click="showAddPerfil = true" class="btn btn-sm btn-primary d-block mx-auto w-auto">Adicionar Pergunta</button>
                            <PerguntaWidget 
                                @exluiu_pergunta="excluirPergunta"
                                v-for="pergunta of perfis"  
                                :id="pergunta.id"
                                :pergunta="pergunta.pergunta"
                                :tipo="pergunta.tipo"
                                :options="pergunta.options"
                            />
                        </Widget>
                    </div>

                    <div class="col-12 col-lg-8">
                        <Widget :loading="false">
                            <h3 class="text-center text-primary">Questionario</h3>
                            <button @click="showAddPergunta = true" class="btn btn-sm btn-primary d-block mx-auto w-auto">Adicionar Pergunta</button>
                            <PerguntaWidget 
                                @exluiu_pergunta="excluirPergunta"
                                v-for="pergunta of perguntas"  
                                :id="pergunta.id"
                                :pergunta="pergunta.pergunta"
                                :tipo="pergunta.tipo"
                                :options="pergunta.options"
                            />
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
import ModalDynamic from '@/components/ModalDynamic.vue';
import Data from '@/model/libs/Data';
import PerguntaWidget from '../../widgets/pesquisas/PerguntaWidget.vue';

export default defineComponent({

    created() {
        // seleciona informações da pesquisa
        // seleciona perguntas e opções da pesquisa
        this.getDataInfo()
        this.getDataPerfis()
        this.getDataPergunta()
    },

    components:{ Page, Icon, InputVue, LoadingSimple, FormVue, Widget, AlertVue, ModalDynamic, PerguntaWidget},
    props:{
        id:{
            type:Number,
            required:true
        }
    },
    data(){
        return {
            
            showModal:false,
            showAddPergunta:false,
            showAddPerfil:false,

            alert:{
                text:'',
                show:false,
                type:'danger'
            },
            
            pesquisa:{
                titulo:'',
                descricao:'',
                duration:'',
                ativo:0
            },

            perguntas:[] as Array<{id:number, pergunta:string, tipo:'questionario', options:Array<{id:number, valor:string}> }>,

            perfis:[] as Array<{id:number, pergunta:string, tipo:'perfil', options:Array<{id:number, valor:string}> }>,

            formAddPergunta:{
                title:'Adicionar Pegunta Questionario',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Pergunta',
                            type:'text',
                            placeholder:'digite a pergunta',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                ]
            },

            formAddPerfil:{
                title:'Adicionar Pegunta Perfil',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Pergunta',
                            type:'text',
                            placeholder:'digite a pergunta',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                ]
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
                    slug:'editar',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Editar',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ],

            buttonsAddPergunta:[
                {
                    slug:'adicionar_pergunta',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Adicionar',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ],

            buttonsAddPerfil:[
                {
                    slug:'adicionar_perfil',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Adicionar',
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
        
        async closeModal(){
            this.showModal = false
            this.showAddPerfil = false 
            this.showAddPergunta = false
        },

        async getDataPergunta(){
            const questQ = await request({
                method:'post',
                route:'pesquisas/perguntas_pesquisa/list'
            }, {
                pesquisa_id:this.id
            })

            if(questQ.code != 200){
                this.code = questQ.code 
                return 
            }

            let i = 0

            for(let row of questQ.body){
                
                const quest = row as any 
                let quest_temp:{id:number, pergunta:string, tipo:'questionario', options:Array<{id:number, valor:string}> } = {
                    id:quest.id,
                    pergunta:quest.pergunta,
                    tipo:'questionario',
                    options:[]
                } 

                for(let option of quest.options){
                    quest_temp.options.push({
                        valor:option.opcao_valor,
                        id:option.opcao_id
                    })
                }
                
                this.perguntas.push(quest_temp)
            }
            
            
        },

        async getDataPerfis(){
            const perfisQ = await request({
                method:'post',
                route:'pesquisas/perguntas_perfil_pesquisa/list'
            }, {
                pesquisa_id:this.id
            })

            if(perfisQ.code != 200){
                this.code = perfisQ.code 
                return 
            }

            let i = 0

            for(let row of perfisQ.body){
                
                const perfil = row as any 
                let perf_temp:{id:number, pergunta:string, tipo:'perfil', options:Array<{id:number, valor:string}> } = {
                    id:perfil.id,
                    pergunta:perfil.pergunta,
                    tipo:'perfil',
                    options:[]
                } 

                for(let option of perfil.options){
                    perf_temp.options.push({
                        valor:option.opcao_valor,
                        id:option.opcao_id
                    })
                }

                this.perfis.push(perf_temp)
                
            }
        },

        async editarInfo(){

            const resp = await request({
                method:'post',
                route:'pesquisas/update'
            }, {
                id:this.id,
                titulo:this.formData.inputs[0].text.value,
                descricao:this.formData.inputs[1].text.value,
                termino:this.formData.inputs[2].text.value ? this.formData.inputs[2].text.value : '',
                ativo:0
            })

            if(resp.code != 200){
                this.alert.text = resp.message ? resp.message : 'Erro ao tentar salvar'
                this.alert.type = 'danger'
                this.alert.show = true               
            } else {
                this.alert.text = 'Dados da Pesquisa alterado com sucesso'
                this.alert.type = 'success'
                this.alert.show = true           
            }

            this.buttons[0].loading = false

        },

        async exluirPesquisa(){
            
            const resp = await request({
                method:'post',
                route:'pesquisas/update'
            }, {
                id:this.id,
                titulo:this.formData.inputs[0].text.value,
                descricao:this.formData.inputs[1].text.value,
                termino:this.formData.inputs[2].text.value,
                ativo:3
            })

            if(resp.code == 200){
                this.$router.push(`/pesquisas`);
            } else {
                this.alert.text = resp.message ? resp.message : 'Erro ao tentar excluir'
                this.alert.type = 'danger'
                this.alert.show = true
            }

        },

        async getDataInfo(){

            this.loading = true
            const req = await request({
                method:'post',
                route:'pesquisas/unique'
            },{
                id:this.id
            })
            
            if(req.code == 200){
                this.pesquisa = req.body
                this.genFields()
            }
            
            this.loading = false

        },

        async responseFormPergunta(){

            const pergunta = this.formAddPergunta.inputs[0].text.value

            const req = await request({
                method:'post',
                route:'pesquisas/perguntas_pesquisa/create'
            }, {
                pesquisa_id:this.id,
                pergunta:pergunta
            })

            if(req.code == 200){
                this.perguntas.push({
                    id:parseInt(req.body),
                    pergunta:pergunta,
                    tipo:'questionario',
                    options:[]
                })
                this.formAddPergunta.inputs[0].text.value = ''
                this.showAddPergunta = false
            } else {
                this.alert.text = req.message ? req.message : 'Erro ao tentar criar nova pergunta de questionário'
                this.alert.type = 'danger'
                this.alert.show = true
            }

        },

        async responseFormPerfil(){
            
            const pergunta = this.formAddPerfil.inputs[0].text.value

            const req = await request({
                method:'post',
                route:'pesquisas/perguntas_perfil_pesquisa/create'
            }, {
                pesquisa_id:this.id,
                pergunta:pergunta
            })

            if(req.code == 200){
                this.perfis.push({
                    id:parseInt(req.body),
                    pergunta:pergunta,
                    tipo:'perfil',
                    options:[]
                })
                this.formAddPerfil.inputs[0].text.value = ''
                this.showAddPerfil = false
            } else {
                this.alert.text = req.message ? req.message : 'Erro ao tentar criar nova pergunta de perfil'
                this.alert.type = 'danger'
                this.alert.show = true
            }

        },

        async excluirPergunta(tipo:string, id:number){
            console.log(tipo, id);
            
            if(tipo == 'perfil')
            for (let i = 0; i < this.perfis.length; i++) {
                if(this.perfis[i].id == id){
                    this.perfis.splice(i, 1);
                    return
                }
            }
            if(tipo == 'questionario')
            for (let i = 0; i < this.perguntas.length; i++) {
                if(this.perguntas[i].id == id){
                    this.perguntas.splice(i, 1)
                    return
                }
            }
        },

        async genFields(){
            this.formData.inputs[0].text.value = this.pesquisa.titulo
            this.formData.inputs[1].text.value = this.pesquisa.descricao
            this.formData.inputs[2].text.value = (new Data(this.pesquisa.duration)).toEn()
        }

    }
})
</script>