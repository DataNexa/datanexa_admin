import { request } from "../libs/Request"
import Session from "../libs/Session"
import { setToken } from "../libs/TokenManager"

interface response_err { status:boolean, message:string }

export default {

    async login(email:string, senha:string):Promise<response_err>{

        const resp = await request({
            route: 'account/login',
            method: 'post'
        }, {
            email:email,
            senha:senha
        })

        console.log(resp);
        
        if(resp.code != 200){
            return { status: false, message: resp.message ? resp.message : '' }
        }

        if(resp.body.token){
            setToken(resp.body.token)   
        }

        return { status: true, message: resp.message ? resp.message : '' }

    },

    async recover(email:string, codigo:string):Promise<response_err>{
        const resp = await request({
            route: 'account/recover',
            method:'post'
        }, {
            email:email,
            codigo:codigo
        })

        if(resp.body){
            Session.saveTempSession(resp.body.session_temp)
        }

        return { status: resp.code == 200, message: resp.message ? resp.message : ''}
    },

    async changePass(pass:string):Promise<response_err>{

        const resp = await request({
            sess_type:'SESSION_TEMP',
            route:'account/edit',
            method:'post'
        }, {
            senha:pass
        })

        return { status: resp.code == 200, message: resp.message ? resp.message : ''} 
    },

    async sendCode(email:string, type_code:string):Promise<response_err>{
        const resp = await request({
            route: 'account/sendMeCodeRecover',
            method:'post'
        }, {
            email:email,
            type_code:type_code
        })

        return { status: resp.code == 200, message: resp.message ? resp.message : ''}
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
    
    },

    async getAccountData(){

        const resp = await request({
            sess_type:'TOKEN',
            route:'account/getAccountData',
            method:'get'
        })

        return { status: resp.code == 200, body:resp.body, message: resp.message ? resp.message : ''}
    }

    

}