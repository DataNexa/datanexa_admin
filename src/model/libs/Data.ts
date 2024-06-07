class Data {

    private data:Date
    private brdate:string = ""
    private time:boolean = false

    constructor(data:string){
        this.data = new Date(data)
    }

    public humanDate(){
        
    }

    public toBr(time:boolean = false){
        
        if(this.brdate != "" && this.time == time){
            return this.brdate
        }

        let  dia  = this.data.getDate().toString().padStart(2, '0'),
             mes  = (this.data.getMonth()+1).toString().padStart(2, '0'),
             ano  = this.data.getFullYear(),
        datafinal = `${dia}/${mes}/${ano}`

        if(time){
            let horas    = this.data.getHours(),
                minutos  = this.data.getMinutes(),
                segundos = this.data.getSeconds()
            datafinal   += ` ${horas}:${minutos}:${segundos}`
        }

        this.time = time
        this.brdate = datafinal

        return this.brdate
    }

    public timestamp(){
        return this.data.getTime()
    }
}

export default Data