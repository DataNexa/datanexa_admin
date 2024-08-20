<template>
    <div class="container-flud">
        <div class="row">
            <div class="col-12">
                <h5>{{ contato.nome }}</h5>
                <p>{{ contato.apelido }}</p>
                <p><IconWhatsapp/> {{ contato.whatsapp }}</p>
                <p><IconFacebook/> {{ contato.facebook }}</p>
                <p><IconInstagram/> {{ contato.instagram }}</p>
                <p><IconTwitter/> {{ contato.twitter }}</p>
                <p><Icon :icon="`IconEmail`" :size="30"/> {{ contato.email }}</p>
                <button v-if="canEdit" @click="$emit('changeToEditar')" class="btn btn-sm btn-outline-primary">editar</button>
                <button v-if="canDelete" @click="$emit('deleteContato')" class="btn btn-sm btn-outline-danger d-block ms-auto">excluir</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import Icon from '@/components/Icon.vue'
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

    components:{ IconWhatsapp, IconFacebook, IconInstagram, IconTwitter, Icon },

    props:{
        contato:{
            type:Object as () => contatos_i,
            required:true
        }
    },

    data() {
        return {
            canEdit: App.userHasPermission('contatos@update'),
            canDelete: App.userHasPermission('contatos@delete'),
        }
    },

})

</script>