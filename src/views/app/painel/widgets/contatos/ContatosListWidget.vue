<template>
    <AlertVue :alert="alert"/>
    <ModalDynamic v-if="openModal" @close_modal="openModal=false">
        <component :is="component" @changeToEditar="() => {
            openModal = false
            component = 'EditarContato'
            openModal = true
        }" @close="openModal=false" @deleteContato="deleteContato" @reload="$emit('reload')" :contato="contato"></component>
    </ModalDynamic>
    <div class="container-fluid">
        <div class="row">
            Contatos
        </div>
        <div class="row">
            <Widget col="12" :loading="false" v-for="contato of contatos">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <h5>{{ contato.nome }} {{ contato.apelido.trim() != '' ? `(${contato.apelido})` : '' }}</h5>
                        
                    </div>
                    <div class="col-12 col-md-3"><p><IconWhatsapp /> {{ contato.whatsapp }}</p></div>
                    <div class="col-12 col-md-2">
                        <p>
                        <IconEmail :scale="0.5" fill="black" v-if="contato.email.trim() != ''"/>
                        <IconFacebook  v-if="contato.facebook.trim() != ''"/>
                        <IconInstagram  v-if="contato.instagram.trim() != ''"/>
                        <IconTwitter  v-if="contato.twitter.trim() != ''"/>
                        <Icon v-if="contato.email.trim() != ''":icon="`IconEmail`" :size="30"/>
                        </p>
                    </div>
                    <div class="col-12 col-md-1">
                        <button @click="open(contato.id, 'ContatoSelected')" class="btn btn-sm btn-outline-primary d-block ms-auto">+</button>
                    </div>
                </div>
            </Widget>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue'
import Widget from '@/components/Widget.vue'
import ModalDynamic from '@/components/ModalDynamic.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import Icon from '@/components/Icon.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'

import ContatoSelected from './ContatoSelected.vue'
import EditarContato from './EditarContato.vue'
import { request } from '@/model/libs/Request'
import AlertVue from '@/components/AlertVue.vue'
import { App } from '@/model/Entidades/App';

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

export default defineComponent({

    components:{ ContatoSelected, AlertVue, EditarContato, Widget, ModalDynamic, IconWhatsapp, IconFacebook, IconTwitter, Icon, IconInstagram },

    methods: {
        open(contato_id:number, local:string){
            if(this.contatos)
            for(const contact of this.contatos){
                if(contact.id == contato_id){
                    this.contato = contact
                    this.component = local
                    this.openModal = true
                }
            } 
        },
        async deleteContato(){
            
            if(!this.contato){
                return 
            }

            const req = await request({
                method:'post',
                route:'contatos/delete'
            }, {
                grupo_id:this.contato.grupo_id,
                id:this.contato.id
            })

            if(req.code == 200){
                this.openModal = false
                this.alert.type = 'success'
                this.alert.text = 'Contato excluido com sucesso'
                this.alert.show = true
                setTimeout(() => {
                    this.$emit('reload')
                }, 1000)
            } else {
                this.alert.type = 'danger'
                this.alert.text = req.message ? req.message : 'Erro ao tentar exlcluir contato'
                this.alert.show = true
            }

        }
    },

    data() {
        return {
            openModal:false,
            component:"ContatoSelected",
            contato:{} as contatos_i,
            canEdit: App.userHasPermission('contatos@update_group'),
            canAddContato: App.userHasPermission('contatos@create'),
            canDelete: App.userHasPermission('contatos@delete_group'),
            alert:{
                text:'',
                show:false,
                type:'danger'
            }
        }
    },
    props:{
        contatos:{
            type: Object as () => Array<contatos_i>,
            required:false
        }
    }
})

</script>
