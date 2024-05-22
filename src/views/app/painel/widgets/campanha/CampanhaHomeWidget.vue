<template>
    <Widget col="12" md="6" :loading="loading" @reload="reload" :can-refresh="true">
        <template v-slot:header>
            <div class="col-12">
                <h5 class="text-primary"> 
                    Campanhas <span class="text-dark">(30)</span> 
                </h5>
            </div>
        </template>
        <div class="col-12">
            <div class="row">
                <div class="col-6">
                    lado esquerdo
                </div>
                <div class="col-6">
                    lado direito
                </div>
            </div>
        </div>
    </Widget>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Widget from '@/components/Widget.vue'

export default defineComponent({
    components:{Widget},
    data(){
        return {
            loading:true
        }
    },
    created() {
        setTimeout(() => {
            this.loading = false
        }, 1000)
    },
    methods:{
        reload(){
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        }
    }
})
</script>