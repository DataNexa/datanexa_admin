<template>
    <div class="container-fluid p-0 m-0 bg-blue" style="position:fixed; width: 100%; height: 100%; overflow-y: auto; overflow-x: hidden;r">
        <div class="row p-0">
            <div class="col-12">
                <div v-if="loading">
                    <LoadingFull :percent="percent"></LoadingFull>
                </div>
                <div v-else>
                    <component :is="component" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LoadingFull from '@/components/LoadingFull.vue';
import OptionsUser from './Token/OptionsUser.vue';

export default defineComponent({
    components:{LoadingFull, OptionsUser},
    created() {
        
    },
    data() {
        return {
            percent:1,
            loading:false,
            component:"OptionsUser"
        }
    },
    methods:{
        init(){

        }
    }
})

</script>