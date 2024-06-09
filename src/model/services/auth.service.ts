import { request } from "../libs/Request"

export default {

    async login(email:string, senha:string){
        const resp = await request({
            route: 'account/login',
            method: 'post'
        }, {
            email:email,
            senha:senha
        })
        console.log(resp)
    }

}