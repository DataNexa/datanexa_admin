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
                <p><IconEmail :scale="0.5" :fill="`black`"/> {{ contato.email }}</p>
                <button class="btn btn-sm btn-outline-primary">editar</button>
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
import IconEmail from '@/components/icons/IconEmail.vue'

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

    components:{ IconWhatsapp, IconFacebook, IconInstagram, IconTwitter, IconEmail },

    props:{
        contato:{
            type:Object as () => contatos_i,
            required:true
        }
    }

})

</script>