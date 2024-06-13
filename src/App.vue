<script lang="ts">

import {defineComponent} from "vue"
import LoadingFull from "./components/LoadingFull.vue"
import Main from "./views/app/Main.vue"
import MainLogin from "./views/login/MainLogin.vue"
import authService from "./model/services/auth.service"
import Session from "./model/libs/Session"

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
			percentLoading:1
        }
    },
	methods:{
		async loadingData(){

			let token = Session.getSessionBy('token')
			if(!token) {
				return this.component = "MainLogin"
			}

			// authService.login('andreifcoelho@gmail.com', 'mushmush123')

			// verificar se existe o token_account
			// se nao existir exibir a tela de login

			/*
			// apenas para exibição
			const interval = setInterval(() => {
				this.percentLoading += 25
				if(this.percentLoading >= 100){
					this.percentLoading = 100
					setTimeout(() => {
						this.loading = false
						this.component = "Main"
					}, 1000);
					clearInterval(interval)
				}
			}, 1000)
			*/
		}
	}
})

</script>

<template>
	<div v-if="loading">
		<LoadingFull :percent="percentLoading"/>
	</div>
	<div v-else>
		<component :is="component"/>
	</div>
	
</template>
 
