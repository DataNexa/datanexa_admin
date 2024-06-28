<template>
    <AlertVue :alert="alert"/>
    <ModalDynamic @close_modal="showModal = false" v-if="showModal">
        <FormVue @click_button="saveOption" :formdata="formAddOptopm" :buttons="buttons"/>
    </ModalDynamic>
    <Widget :loading="loading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <hr>
                    <h5>{{ pergunta }} - <a v-if="options_list.length == 0" href="#" @click="excluirPergunta">excluir</a></h5>
                    <p v-for="option,k of options_list">• {{ option.valor }} - <a href="#" @click="excluirOption(option.id, k)">excluir</a></p>
                    <button @click="showModal = true" class="btn btn-outline-primary btn-sm">Adicionar Opção de Resposta</button>
                </div>
            </div>
        </div>
    </Widget>
</template>

<script lang="ts">

import {defineComponent} from 'vue'
import Widget from '@/components/Widget.vue';
import { request } from '@/model/libs/Request';
import ModalDynamic from '@/components/ModalDynamic.vue';
import FormVue from '@/components/FormVue.vue';
import AlertVue
 from '@/components/AlertVue.vue';
export default defineComponent({

    props:{
        id:{
            type:Number,
            required:true
        },
        pergunta:{
            type: String,
            required:true
        },
        tipo:{
            type: Object as () => 'perfil'|'questionario',
            required:true
        },
        options:{
            type: Object as () => Array<{id:number, valor:string}>,
            required:true
        }
    },

    components:{Widget, ModalDynamic, FormVue, AlertVue},

    data() {
        return {
            alert:{
                text:'',
                show:false,
                type:'danger'
            },
            loading:false,
            options_list: this.options,
            showModal:false,
            formAddOptopm:{
                title:'Adicionar Opção de Resposta',
                inputsControl:{
                    disable:false,
                },
                inputs:[
                    {
                        text:{
                            label:'Opção',
                            type:'text',
                            placeholder:'digite a opção de resposta à pergunta',
                            value:''
                        },
                        messageError:'Este campo não pode estar vazio',
                        required:true
                    },
                ]
            },
            buttons:[
                {
                    text:"Adicionar",
                    slug:'add',
                    css:'btn btn-outline-primary d-block ms-auto',
                    success:true,
                    canLoad:true,
                    loading:false
                }
            ]
        }
    },

    methods: {
        async excluirOption(option_id:number, key:number){
            
            const uri = this.tipo == 'perfil' ? 'opcoes_pergunta_perfil_pesquisa' : 'opcoes_pergunta_pesquisa'
            const typ = this.tipo == 'perfil' ? 'pergunta_perfil_pesquisa_id' : 'pergunta_pesquisa_id'

            const req = await request({
                method:'post',
                route:'pesquisas/'+uri+'/delete'
            }, {
                id:option_id,
                [typ]:this.id
            })
            if(req.code == 200){
                this.options_list.splice(key, 1)
            } else {
                this.alert.text = req.message ? req.message : 'Erro ao tentar criar nova pergunta de perfil'
                this.alert.show = true
            }
        },
        async excluirPergunta(){
            this.$emit('exluiu_pergunta',this.tipo,this.id)
        },
        async saveOption(){
            
            const uri = this.tipo == 'perfil' ? 'opcoes_pergunta_perfil_pesquisa' : 'opcoes_pergunta_pesquisa'
            const typ = this.tipo == 'perfil' ? 'pergunta_perfil_pesquisa_id' : 'pergunta_pesquisa_id'

            const req = await request({
                method:'post',
                route:'pesquisas/'+uri+'/create'
            }, {
                [typ]:this.id,
                valor:this.formAddOptopm.inputs[0].text.value
            })
            
            if(req.code == 200){
                this.options_list.push({
                    id:parseInt(req.body),
                    valor:this.formAddOptopm.inputs[0].text.value
                })
                this.formAddOptopm.inputs[0].text.value = ''
                this.showModal = false
            } else {
                this.alert.text = req.message ? req.message : 'Erro ao tentar criar nova pergunta de perfil'
                this.alert.show = true
            }
        }
    },

})

</script>