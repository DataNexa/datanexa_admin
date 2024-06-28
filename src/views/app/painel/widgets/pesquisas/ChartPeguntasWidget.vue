<template>

    <div class="container-fluid pt-5">
        <div class="row">
            <div class="col-12">
                <h5>{{ pergunta }}</h5>
            </div>
            <div v-for="option,k of options" class="col-12 py-2">
                <div class="bak border">
                    <div :class="`percent${option.success ? '-success': ''}`" :style="`width:${percents[k]}%`"></div>
                    <p class="ps-2 pt-3">{{ option.valor }} - <b>{{ percents[k] }}%</b></p>
                </div>
            </div>
        </div>
    </div>

</template>


<script lang="ts">

import { defineComponent } from 'vue'


export default defineComponent({

    created() {
        for(const op of this.options){
            let percent = Math.round((op.votos * 100) / this.total_votos)
            this.percents.push(percent)
        }
    },

    props:{
        pergunta:{
            type:String,
            required:true
        },
        options:{
            type:Object as () => { valor:string, votos:number, success:boolean }[],
            required:true
        }
    },

    data() {
        return {
            total_votos:this.options.reduce((acc, item) => acc + item.votos, 0),
            percents:[] as Array<number>
        }
    },

})

</script>

<style scoped>

.bak {
    width:100%;
    height:50px;
}

.percent-success {
    height: 100%;
    background-color: #d1ffbd;
}

.percent {
    height: 100%;
    background-color: #ededed;
}

.bak p {
    position:relative;
    top:-50px;
}

</style>