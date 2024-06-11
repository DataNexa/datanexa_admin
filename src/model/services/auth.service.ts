import { request } from "../libs/Request"

interface response_err { status:boolean, message:string }

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
    },

    async sendCode(email:string, type_code:string){
        const resp2 = await request({
            route: 'account/sendMeCodeRecover',
            method:'post'
        }, {
            email:email,
            type_code:type_code
        })

        return { status: resp2.code == 200, message: resp2.message ? resp2.message : ''}
    },

    async create(nome:string, email:string, senha:string):Promise<response_err>{
        
        const resp = await request({
            route:'account/createAccount',
            method:'post'
        }, {
            nome:nome,
            email:email,
            senha:senha
        })

       return { status: resp.code == 200, message: resp.message ? resp.message : ''}

    },

    async confirmEmail(email:string, codigo:string):Promise<response_err>{
        const resp = await request({
            route:'account/confirmEmail',
            method:'post'
        }, {
            codigo:codigo,
            email:email
        })
        return { status: resp.code == 200, message: resp.message ? resp.message : ''}
    }

    

}