import User from "./User";
import Account from './Account'

enum system_type {
    LOGIN,
    CLIENT,
    ADMIN
}

/**
 * Esta entidade armazena todos os dados necessário para a aplicação funcionar
 * Ela também é responsável por alterar persistencia dos dados como cookies, sessões, tokens, etc
 */
class App {

    private static account?:Account
    private static user?:User
    private static system_type:system_type = system_type.LOGIN
    private static connected:boolean = false

    private constructor(){ }

    static setAccount(account:Account) {
        if(!App.account){
            App.connected = true
            App.account = account
        }
    }

    static isConnected(){
        return App.connected
    }

    static getNomeAccount(){
        return App.account?.getNome()
    }

    static getEmailAccount(){
        return App.account?.getEmail()
    }

    static setUser(user:User){
        if(!App.user){
            App.user = user
        }
    }

    static getUser(){
        return App.user
    }

    static havePagePermission(page:string){
        return App.user ? App.user.havePagePermission(page) : false
    }

    static refreshLocalSystem(){
        if (App.user) {
            if(App.user.getClientSlug() != 'DataNexa'){
                App.system_type = system_type.CLIENT
            } else {
                App.system_type = system_type.ADMIN
            }
        } else {
            App.system_type = system_type.LOGIN
        }       
    }

    /**
     * verifica se o usuário tem permissão para acessar um serviço na api
     */
    static userHasPermission(permission:string):boolean{
        if(App.user) 
            return App.user.havePermissions(permission, system_type[App.system_type])
        return false
    }

    static getTypeSystem():system_type {
        return App.system_type
    }

    static getUserJson():Object|undefined {
        return App.user?.getJson()
    }

}

export { system_type, App } 