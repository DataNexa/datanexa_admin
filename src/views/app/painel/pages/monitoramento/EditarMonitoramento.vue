<template>
    <AlertVue :alert="alert"/>
    <Page :code="200">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconMonitoramento" :scale="0.7" fill="blue"/>
                    Editar Monitoramento</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                
            </div>
            
        </template>
        
        <template v-slot:corpo_page>
            <div class="container">
                <Widget :loading="loading">
                    <FormVue @click_button="editar" :formdata="formData" :buttons="buttons"/>
                </Widget>
            </div>
        </template>
    </Page>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Page from '@/components/Page.vue';
import Icon from '@/components/Icon.vue';
import FormVue from '@/components/FormVue.vue';
import type { input_i } from '@/components/interfaces/InputI';
import type { formdata_i } from '@/components/interfaces/FormDataI';
import Widget from '@/components/Widget.vue';
import { request } from '@/model/libs/Request';
import AlertVue from '@/components/AlertVue.vue';

export default defineComponent({
    
    created(){
        this.getData()
    },

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    components:{ Page, Icon, FormVue, Widget, AlertVue },

    methods: {

        async editar(){
            
            if(this.formData.inputsControl)
            this.formData.inputsControl.disable = true

            const resp = await request({
                method:'post',
                route:'monitoramento/update'
            }, {
                id:this.id,
                titulo:this.formData.inputs[0].text?.value,
                descricao: this.formData.inputs[1].text?.value,
                alvo:this.formData.inputs[2].text?.value,
                pesquisa:this.formData.inputs[3].text?.value,
                hashtags:this.formData.inputs[4].text?.value
            })

            if(resp.code == 200){
                if(this.formData.inputsControl)
                this.formData.inputsControl.disable = false
                this.showAlert('success', 'Dados alterados com sucesso!')
                this.buttons[0].loading = false
                return
            } else {
                this.showAlert('danger', (resp.message ? resp.message : 'Erro ao tentar fazer o update'))
            }

        },

        showAlert(type:string, message:string){
            this.alert.type = type 
            this.alert.text = message 
            this.alert.show = true
        },

        async getData(){

            const resp = await request({
                method:'post',
                route:'monitoramento/read'
            }, {
                id:this.id
            })

            if(resp.code != 200){
                return this.showAlert('danger', 'Erro ao tentar resgatar dados')
            }

            if(this.formData.inputs[0].text)
                this.formData.inputs[0].text.value = resp.body.titulo 
            if(this.formData.inputs[1].text)
                this.formData.inputs[1].text.value = resp.body.descricao 
            if(this.formData.inputs[2].text)
                this.formData.inputs[2].text.value = resp.body.alvo 
            if(this.formData.inputs[3].text)
                this.formData.inputs[3].text.value = resp.body.pesquisa 
            if(this.formData.inputs[4].text)
                this.formData.inputs[4].text.value = resp.body.hashtags.join(' ')

            this.loading = false

        }

    },

    data() {
        return {
            alert:{
                text:'',
                type:'danger',
                show:false
            },
            loading:true,
            formData:{
                inputsControl:{
                    disable:false
                },
                inputs:[
                    {
                        text:{
                            label:'Título:',
                            value:'',
                            type:'text',
                            placeholder:'O título do monitoramento que será realizado'
                        },
                        required:true,
                        messageError:'Campo obrigatório'
                    },
                    {
                        text:{
                            label:'Descrição:',
                            value:'',
                            type:'text',
                            placeholder:'Descreva o que o monitoramento está buscando'
                        },
                        required:true,
                        messageError:'Campo obrigatório'
                    },
                    {
                        text:{
                            label:'Alvo:',
                            value:'',
                            type:'text',
                            placeholder:'Nome da pessoa ou produto que será avaliado'
                        },
                        required:true,
                        messageError:'Campo obrigatório'
                    },
                    {
                        text:{
                            label:'Palavras-chave:',
                            value:'',
                            type:'text',
                            placeholder:'ex: DataNexa são+paulo'
                        },
                        required:true,
                        messageError:`
                            Campo obrigatório
                            `,
                        message:`
                            1 - Palavras com menos de 3 letras são ignoradas. <br>
                            2 - O sistema não faz distinções de letras maiúsculas e minusculas.<br>
                            3 - Use acentuação quando necessário! O sistema irá fazer pesquisas com as mesmas palavras sem acentuação para você.<br>
                            4 - O sistema busca resultados por combinações das palavras. Então, utilize palavras estritamente NECESSÁRIAS para não atrapalhar a pesquisa.<br>
                            5 - Usar o símbolo '+' agrega a palavra-chave. Escrever 'são+paulo' fará o sistema entender que 'São Paulo' é uma palavra-chave
                        `
                    },
                    {
                        text:{
                            label:'Hashtags:',
                            value:'',
                            type:'text',
                            placeholder:'ex: #datanexa #painel #layout'
                        },
                        required:true,
                        messageError:`
                            Campo obrigatório
                           `,
                        message:`
                            1 - Este campo direciona o BOT a buscar publicações nas redes sociais de forma mais direcionada. <br>
                            2 - Use quantas hashtags quiser. O BOT irá buscar publicações em todas elas.<br>
                            3 - Lembre-se, hashtags sem ter convergência com alvo pode atrapalhar os resultados do seu monitoramento. <br>
                        `
                    }
                ] as Array<input_i>
            } as formdata_i,

            buttons:[{
                slug:'salvar',
                text:'Salvar',
                css:'btn btn-primary',
                success:true,
                canLoad:true,
                loading:false,
                disable:false
            }]
        }
    },

})

</script>