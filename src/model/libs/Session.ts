import { getToken, setSession, expireSession, expireToken } from "./TokenManager"
enum type_session { TOKEN, SESSION, SESSION_TEMP }

class Session {

    private type:type_session
    private value:string 

    private static logged:boolean = false
    private static session:Session|undefined
    private static session_temp:Session|undefined
    private static token:Session|undefined

    private constructor(type:type_session, value:string){
        this.value = value
        this.type = type
    }
    
    static recoverTokenValue():string|undefined {
        const token = getToken()
        if(!Session.token && token){
            Session.token = new Session(type_session.TOKEN, token)
        }
        return Session.token?.value
    }

    static saveTempSession(value:string) {
        Session.session_temp = new Session(type_session.SESSION_TEMP, value)
    }

    static saveSession(value:string, local:string) {
        console.log("salvou sessao: ", local);
        setSession(value)
        Session.logged  = true
        Session.session = new Session(type_session.SESSION, value)
    }

    static getTempSessionValue(){
        const temp = Session.session_temp?.value
        return temp
    }

    static getSessionValue(){      
        return Session.session?.value
    }

    static expireSessions(){
        expireSession()
        Session.logged = false
        Session.session = undefined
        Session.session_temp = undefined
    }

    static deleteToken(){
        expireToken()
        Session.token = undefined
    }

    static getAnSession(){
        let sess = Session.getTempSessionValue()
        if(sess){
            return sess
        }
        sess = Session.getSessionValue()
        if(sess){
            return sess
        }
        sess = Session.recoverTokenValue()
        if(sess){
            return sess
        }
        return false
    }

    static getSessionBy(type:string):string|undefined {
        if(['TOKEN', 'SESSION', 'SESSION_TEMP'].includes(type)){
            if(type_session[type_session.TOKEN] == type){
                return Session.recoverTokenValue()
            }
            if(type_session[type_session.SESSION] == type){
                return Session.getSessionValue()
            }
            if(type_session[type_session.SESSION_TEMP] == type){
                return Session.getTempSessionValue()
            }
        }
        return undefined
    }

    static isLogged(){
        return Session.logged
    }


}


export default Session