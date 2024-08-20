<template>
    <Page :code="200">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    
                Home</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
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
                <!--<CampanhaHomeWidget/> -->
            </div>
        </template>
    </Page>
</template>

<script lang="ts">

import {defineComponent} from 'vue'
import Page from '@/components/Page.vue';
import CampanhaHomeWidget from '@/views/app/painel/widgets/campanha/CampanhaHomeWidget.vue'
import LoadingSimple from '@/components/LoadingSimple.vue'

export default defineComponent({
    components:{Page, CampanhaHomeWidget, LoadingSimple},
    data() {
        return {
            loading:false
        }
    }
})
</script>