<script lang="ts">

import {defineComponent} from "vue"
import LoadingFull from "./components/LoadingFull.vue"
import Main from "./views/app/Main.vue"
import MainLogin from "./views/login/MainLogin.vue"
import Session from "./model/libs/Session"
import { App } from "./model/Entidades/App"

export default defineComponent({
	created() {
		// verificar se existe uma session 
		// se nao existir exibir a tela de login
		this.loadingData()
	},
	components:{ LoadingFull, Main, MainLogin },
    data(){
        return {
			loading:false,
			component:"LoadingFull",
			keyLoading:1,
			percentLoading:1,
			innerModule:''
        }
    },
	methods:{
		async loadingData(){

			let token = Session.getSessionBy('TOKEN')

			if(!token || !App.isConnected()) {	
				return this.component = "MainLogin"
			}

			if(App.isConnected()){
				return this.component = "Main"
			}
		}
	}
})

</script>

<template>
	<div v-if="loading">
		<LoadingFull :percent="percentLoading"/>
	</div>
	<div v-else>
		<component :is="component" :innerModule="innerModule" @changeArea="loadingData"/>
	</div>
	
</template>
 
