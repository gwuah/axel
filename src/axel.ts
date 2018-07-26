(function(global, local) {

  class Axel {

    name:string;
    database: object[] | any[];

    constructor(name: string) {
      if (!(this instanceof Axel)) {
        return new Axel(name)
      };

      if (!localStorage) {
        throw new Error('localstorage is not enabled on your system.')
      };

      this.name = name;
      this.database = JSON.parse(localStorage.getItem(this.name)) || [];
      
    }

    getById(id:string): object {
      var element:object;
      for (element of this.database) {
        if (element['_id'] == id) {
          return element
        }
      }
    }

    all():any[] | object[] {
      return this.database
    }

    updateDatabase():boolean {
     try {
      localStorage.setItem(this.name, JSON.stringify(this.database));
      return true
     } catch (e) {
       return false
     }
    }

    save(d: object|string|number|[object|string|number]):object | boolean {
      try {
        // this.database.push(d);
        if (this.updateDatabase()){
          return {d}
        }
        else {
          throw new Error('failed to save to database')
        }
      } catch (e){
        return false
      }

    }


  }
})(window, document)