<template>

    <Widget :loading="false">
        <div class="container-fluid border rounded" style="min-height:300px;">
            <div class="row" style="height:60px">
                <div class="col-12 col-md-1">
                    <IconInstagram v-if="local_pub == 'instagram'"/>
                    <IconFacebook  v-if="local_pub == 'facebook'"/>
                    <IconTwitter   v-if="local_pub == 'twitter'"/>
                    <IconYoutube   v-if="local_pub == 'youtube'"/>
                    <IconWeb       v-if="local_pub == 'web'"/>
                </div>
                <div class="col-12 col-md-11"><h5 class="ps-2"><b>{{ titulo }}</b></h5></div>
            </div>
            <div class="row" style="min-height:200px">
                <div class="col-12">
                    <p>{{ texto }}</p>
                </div>
            </div>
            <div class="row" style="min-height:40px">
                <div class="col-12 col-md-8">
                    <a :href="`${link}`" target="_blank" class="d-block me-atuo">link da publicação</a>
                </div>
                <div class="col-12 col-md-4 text-start text-md-end">
                    <span >
                        <IconLike v-if="avaliacao == 2"/>
                        <IconDeslike v-if="avaliacao == 0"/>
                        <IconNeutro v-if="avaliacao == 1" />
                    </span>
                </div>
            </div>
        </div>
    </Widget>

</template>

<script lang="ts">

import { defineComponent } from 'vue'

import Widget        from '@/components/Widget.vue'
import IconNeutro    from '@/components/icons/IconNeutro.vue'
import IconDeslike   from '@/components/icons/IconDeslike.vue'
import IconLike      from '@/components/icons/IconLike.vue'

import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconFacebook  from '@/components/icons/IconFacebook.vue'
import IconTwitter   from '@/components/icons/IconTwitter.vue'
import IconYoutube   from '@/components/icons/IconYoutube.vue'
import IconWeb       from '@/components/icons/IconWeb.vue'

export default defineComponent({

    components:{ Widget, IconNeutro, IconDeslike, IconLike, IconInstagram, IconFacebook, IconTwitter, IconYoutube, IconWeb },

    props:{
        titulo:{
            type:String,
            required:true 
        },
        texto:{
            type:String,
            required:true
        },
        avaliacao:{
            type:Number,
            required:true
        },
        link:{
            type:String,
            required:true
        },
        local_pub:{
            type:String,
            required:true
        },
        curtidas:{
            type:Number,
            required:true
        },
        visualizacoes:{
            type:Number,
            required:true 
        },
        compartilhamentos:{
            type:Number,
            required:true
        },
        data_pub:{
            type:String,
            required:true
        }
    }

})

</script>