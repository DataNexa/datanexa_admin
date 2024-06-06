import User from "./User";

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

    private user:User
    private system_type:system_type = system_type.LOGIN
    private static app:App = new App()

    private constructor(){
        // resgatar as informações a partir dos cookies, tokens e sessões
        // gerar usuário com as informações
        // gerar o tipo de systema 'system_type' a partir das informações do usuário
        this.user = new User()
    }

    private static instance():App {
        return App.app
    }

    /**
     * verifica se o usuário tem permissão para acessar um serviço na api
     */
    userHasPermission(permission:string):boolean{
        // return this.user.getPermissions().contain(permission)
        return true
    }

    getTypeSystem():system_type {
        return this.system_type
    }

}

export { system_type, App } 