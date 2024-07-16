<template>
    <ModalDynamic v-if="openModal" @close_modal="openModal=false">
    
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
                        </p>
                    </div>
                    <div class="col-12 col-md-1">
                        <button class="btn btn-sm btn-outline-primary d-block ms-auto">+</button>
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
import IconEmail from '@/components/icons/IconEmail.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'


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

    components:{ Widget,ModalDynamic, IconWhatsapp, IconFacebook, IconTwitter, IconEmail, IconInstagram },

    data() {
        return {
            openModal:false
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
