<template>
    <div style="text-decoration: none;" :class="`text-center text-dark circle ${css} d-block ${floatcs}`" :style="`width: ${tam}px; height: ${tam}px;`">{{ value }}</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    created() {
        if(this.float)
        this.floatcs = this.float == 'right' ? 'ms-auto' : 'me-auto'
        
        if(this.size)
        this.tam = this.size

        switch (this.color) {
            case 'red':
                this.css = 'bg-red-super-light border border-danger'
                break;
            case 'green':
                this.css = 'bg-green-super-light border border-success'
                break;
            case 'blue':
                this.css = 'bg-blue-super-light border border-info'
                break;
            default:
                break;
        }
    },
    data(){
        return {
            css:'',
            floatcs:'mx-auto',
            tam:20
        }
    },
    props:{
        float:String,
        size:Number,
        value:Number||String||undefined,
        color:{
            type:String,
            required:true
        }
    }
})
</script>

<style scoped>
.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>