class Singleton{
    constructor(){
        if(Singleton.#Instance) return Singleton.#Instance
        Singleton.#Instance=this
    }
    static #Instance
}
class Abstract{
    constructor(){
        if(this.constructor===Abstract) throw "it's an abstract class, you can't make an instance of this class"
    }
}
class classProxy {
    constructor(){
        Object.setPrototypeOf(this,new Proxy({}, {
            set: function (target, key, value) {target;key;value},
            get:(target,key)=>{target;key}
        }))
    }
}
class ExtendableProxy {
    constructor() {
        this.age=45
        return new Proxy(this, {
            set: (object, key, value, proxy) => {
                object[key] = value;
                console.log(proxy.nom);
                return true;
            }
        });
    }
}
const createContructorSingleton=(prop)=>{
    if(typeof prop!='object') return
    return {
        ['Singleton:'+prop.constructor.name]:class {
            constructor(...args){
                const valueReturn=prop?.onInstance?.(...args)
                console.log(prop);
                return typeof valueReturn=='object'?valueReturn:prop
            }
        }}['Singleton:'+prop.constructor.name]
}
function is_constructor(f) {
    try {
      Reflect.construct(String, [], f);
    } catch (e) {
      return false;
    }
    return true;
}
function isConstructor(func) {
    return typeof func === 'function' && !!func.prototype && func.prototype.constructor === func;
  }  
createContructorSingleton
Singleton//  c'est une classe qui construit conformément un object et  garantie qu'il n'existe qu'une et une seule instance de l'object en mémoire
Abstract//  c'est une classe qui n'est pas instanciable. Elle sert de base à d'autres classes dérivées (héritées).
classProxy// c'est une class qui controle l'acces et modification  ses methodes et attributes
ExtendableProxy// ce classe faite excactement la meme chose de classProxy . la seul grande difference c'est que ce classe doit heriter du classe qu'elle doit controller il est plus pratique de l'heriter avec une class abstraite