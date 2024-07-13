import Account from "../Entidades/Account"
import { App } from "../Entidades/App"
import User from "../Entidades/User"
import { request } from "../libs/Request"
import Session from "../libs/Session"

interface user {
    tipo_usuario:string,
    slug:string,
    accepted:boolean,
    client_slug:string,
    client_nome:string
}

interface response {
    status:boolean,
    message:string
}

enum type_user {
    ANONIMUS, GHOST, ADMIN, ADMIN_CLIENT, USER_CLIENT, BOT
}

export default {
    
    async getListUsers():Promise<{ status:boolean, list:user[] }>{

        const req = await request({
            sess_type:'TOKEN',
            route: 'account/listUsersAccount',
            method:'get'
        })

        console.log(req);
        
        return { status:req.code == 200, list:(req.body as user[]) }

    },

    async openSession(slug:string):Promise<response>{
        
        const req = await request({
            sess_type:'TOKEN',
            route:'user/openSession',
            method:'post'
        },{
            slug:slug
        })

        if(req.code != 200) 
            return { status: false, message: req.message?req.message:'' }

        const sess = req.body.session
        Session.saveSession(sess, 'user.service')
        const status_user = await this.setUserBySesson()

        return { status: status_user, message:""}
        
    },

    async setUserBySesson():Promise<boolean>{

        const req2 = await request({
            sess_type:'SESSION',
            route:'user/getDataUser',
            method:'get'
        })

        if(req2.code != 200)
            return false

        const userAPI = req2.body as {
            nome: string,
            email: string,
            slug: string,
            user_type: number,
            permissions: string[],
            client_nome:string,
            client_slug:string
        }

        const acc  = new Account(userAPI.nome, userAPI.email)
        const user = new User(userAPI.slug, type_user[userAPI.user_type])
        user.setPermissions(userAPI.permissions)
        user.setClientNome(userAPI.client_nome)
        user.setClientSlug(userAPI.client_slug)
        App.setUser(user)
        App.setAccount(acc)

        return true

    },

    async changeAccepted(slug:string, accepted:number){

        const req = await request({
            sess_type:'TOKEN',
            route:'user/acceptOrDeclineUser',
            method:'post'
        }, {
            slug:slug,
            accepted:accepted
        })

        return { status: req.code == 200, message: req.message ? req.message : ''}

    }

}