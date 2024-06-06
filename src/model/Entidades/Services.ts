

const addService = (service:Service):void => Services.instance().addService(service)
const getServices = ():service_i => Services.instance().getServices()

// key é o nome do serviço
interface service_i {
    [key:string]:Service[]
}

class Services {
    private services:service_i = {}
    private static services_instance:Services = new Services()
    private constructor(){}
    public static instance(){
        return Services.services_instance
    }
    addService(service:Service){
        if(!this.services[service.getNome()]){
            this.services[service.getNome()] = []
        }
        this.services[service.getNome()].push(service)
    }
    getServices():service_i{
        return this.services
    }
}

class Service {

    private nome:string
    private action:string
    private slug:string

    constructor(slug:string){
        // transforma a slug splitando o '@'
        const parts = slug.split('@')
        this.slug = slug
        if(parts.length != 2){
            this.nome = ""
            this.action = ""
            return
        }
        this.nome = parts[0]
        this.action = parts[1]
    }

    getNome(){
        return this.nome
    }

    getAction(){
        return this.action
    }

    getSlug(){
        return this.slug
    }

}