class Data {

    private data:Date

    constructor(data:string){
        this.data = new Date(data)
    }

    public toBr(){
        let dia  = this.data.getDate().toString().padStart(2, '0'),
            mes  = (this.data.getMonth()+1).toString().padStart(2, '0'),
            ano  = this.data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }

    public timestamp(){
        return this.data.getTime()
    }
}

export default Data