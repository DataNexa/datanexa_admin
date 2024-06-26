<template>
    <AlertVue :alert="alert"/>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <!-- <Icon icon="IconPesquisa" :scale="0.7" fill="blue"/>  -->
                Responder Pesquisa</span>
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
                <div class="row">
                    
                </div>
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-7">
                        <Widget :loading="false">
                            <PesquisaSelectedWidget :dont-show="['status', 'estatisticas', 'data']" :id="id" />
                        </Widget>
                        <Widget :loading="false">
                            <FormVue @click_button="enviar" :formdata="formData" :buttons="buttons"/>
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
import PesquisaSelectedWidget from '../../widgets/pesquisas/PesquisaSelectedWidget.vue';
import AlertVue from '@/components/AlertVue.vue';

import { App } from '@/model/Entidades/App';
import { request } from '@/model/libs/Request';

interface option {
    label:string,
    value:string
}

interface radio {
    label:string,
    value:string,
    name:string,
    options:option[]
}

export default defineComponent({

    created() {
        this.loadPerguntas()
    },

    props:{
        id:{
            type:Number,
            required:true
        }
    },
    components:{Page, Icon, InputVue, LoadingSimple, FormVue, Widget, PesquisaSelectedWidget, AlertVue},
    data(){
        return {

            alert:{
                show:false,
                text:'',
                type:'success'
            },

            options_pesquisa_ids:[],
            options_perfil_ids:[],

            startQuestionarioPesquisaIndex:0,

            formData:{
                title:'Questionário:',
                description:'',
                inputsControl:{
                    disable:false,
                },
                inputs:[] as Array<{radio:radio}>
            },
            buttons:[
                {
                    slug:'enviar',
                    css:'btn btn-outline-primary d-block ms-auto',
                    text:'Enviar Resposta',
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

        async loadPerguntas(){

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
                const objFinal:radio = {
                    label:perfil.pergunta,
                    value:'',
                    name:`perfil_${perfil.id}`,
                    options:[]
                }
                for(let option of perfil.options){
                    objFinal.options.push({
                        label:option.opcao_valor,
                        value:option.opcao_id
                    })
                }

                this.formData.inputs.push({
                    radio:objFinal
                })

                i++
            }
            

            this.startQuestionarioPesquisaIndex = i

            const perguntasQ = await request({
                method:'post',
                route:'pesquisas/perguntas_pesquisa/list'
            }, {
                pesquisa_id:this.id
            })
            
            if(perguntasQ.code != 200){
                this.code = perfisQ.code 
                return 
            }
            
            for(let row of perguntasQ.body){
                
                const pergunta = row as any 
                const objFinal:radio = {
                    label:pergunta.pergunta,
                    value:'',
                    name:`pergunta_${pergunta.id}`,
                    options:[]
                }
                for(let option of pergunta.options){
                    objFinal.options.push({
                        label:option.opcao_valor,
                        value:option.opcao_id
                    })
                }

                this.formData.inputs.push({
                    radio:objFinal
                })
                
            }
            
        },

        cleanFields(){
            this.formData.inputs = []
            this.loadPerguntas()
            this.buttons[0].loading = false
        },
        
        async enviar(slug:string){
            // console.log(this.formData.inputs[0].radio.value);
            const options_questionario = []
            const options_perfil = []
            
            let i = 0
            
            for(const inp of this.formData.inputs){

                if(inp.radio.value == ''){
                    this.buttons[0].loading = false
                    // mostrar alert de erro
                    this.alert.text = 'Todos os campos devem ser preenchidos'
                    this.alert.type = 'danger'
                    this.alert.show = true
                    return
                }
                if(i >= this.startQuestionarioPesquisaIndex){
                    options_questionario.push(parseInt(inp.radio.value))
                } else {
                    options_perfil.push(parseInt(inp.radio.value))
                }

                i++
            }

            console.log(i, options_perfil, options_questionario);
            

            const resp = await request({
                method:'post',
                route:'pesquisas/responder'
            },{
                id:this.id,
                options_perfil:options_perfil,
                options_questionario:options_questionario
            })

            if(resp.code != 200){
                this.alert.text = resp.message ? resp.message : ''
                this.alert.type = 'danger'
                this.alert.show = true
                this.buttons[0].loading = false
            } else {
                this.alert.text = 'Resposta enviada com sucesso!'
                this.alert.type = 'success'
                this.alert.show = true
                this.cleanFields()
            }
            
        },
    }
})
</script>