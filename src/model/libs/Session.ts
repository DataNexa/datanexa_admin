
enum type_session { TOKEN, SESSION, SESSION_TEMP }

class Session {

    private type:type_session
    private value:string 

    private static session:Session|undefined
    private static session_temp:Session|undefined
    private static token:Session|undefined

    private constructor(type:type_session, value:string){
        this.value = value
        this.type = type
    }
    
    static recoverTokenValue():string|undefined {
        // verifica se existe um cookie com 
        if(!Session.token){
            Session.token = new Session(type_session.TOKEN, "")
        }
        return Session.token.value
    }

    static saveTempSession(value:string) {
        this.session_temp = new Session(type_session.SESSION_TEMP, value)
    }

    static saveSession(value:string) {
        this.session = new Session(type_session.SESSION, value)
    }

    static getTempSessionValue(){
        const temp = Session.session_temp?.value
        Session.session_temp = undefined
        return temp
    }

    static getSessionValue(){
        return Session.session?.value
    }

    static expireSessions(){
        this.session = undefined
        this.session_temp = undefined
    }

    static deleteToken(){
        // deletar cookie
        this.token = undefined
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

    static getSessionBy(types:string):string|undefined {
        if(['TOKEN', 'SESSION', 'SESSION_TEMP'].includes(types)){
            if(type_session[type_session.SESSION] == 'TOKEN'){
                return Session.recoverTokenValue()
            }
            if(type_session[type_session.SESSION] == 'SESSION'){
                return Session.getSessionValue()
            }
            if(type_session[type_session.SESSION] == 'SESSION_TEMP'){
                return Session.getTempSessionValue()
            }
        }
        return undefined
    }


}


export default Session