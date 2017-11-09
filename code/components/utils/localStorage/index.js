 
 
 function LocalStorage(){
    this.localStorage = window.localStorage;
}

LocalStorage.prototype={
    set: function(key,value){
        var values='', 
        keys = key.toString();
        if(value instanceof Array){
            values = value.join(",")
        }else if(typeof(value) === "object"){
            values = JSON.stringify(value)
        }else{
            values = value
        }
       this.localStorage.setItem(keys,values);
    },
    get:function(key){
       var nowVlues =  this.localStorage.getItem(key);
        try{
            return JSON.parse(nowVlues);
        }catch(e){
            return nowVlues || undefined;
        }
    },
    remove:function(key){
        this.localStorage.removeItem(key);
    },
    clear:function(){
       this.localStorage.clear();
    }
}
function createsotrage(){
    return new LocalStorage();
}
export default createsotrage;