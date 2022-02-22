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
convertDataToSpan = function (data) {
    function triangleVertical() {
      return "&#9656";
    }
    function triangleHorizontale() {
      return "&#9662";
    }
    function boutton(obj, span, tab = 20) {
      const tabContainer=tab+50
      const list = [];
      var limiter="__{"
      var symb="{...}"
      const prepare=(data)=>{
        if(Array.isArray(data)){
          symb =  `[ length: ${data.length} ]`
          limiter="__["
        }else{
          limiter="__{"
          symb="{...}"
        }
      }
      const change = function () {
        prepare(obj)
        if (this.dataset.position == "vert") {
          list.push(
            Domlib.createElement(`<span style="padding-left:${tab}px">${limiter}</span>`),
            Domlib.createElement("<br>")
          );
          this.innerHTML = triangleHorizontale();
          this.dataset.position = "hori";
          for (let at in obj) {
            prepare(obj[at])
            if (typeof obj[at] == "object" && obj[at]) {
              var minSpan = Domlib.createElement('<span></span>');
              var spn = Domlib.createElement(`<span style="padding-left:${tabContainer}px"></span>`);
              spn.append(
                boutton(obj[at], minSpan, tabContainer),
                `${at}: ${
                  obj[at] && obj[at].constructor
                    ? obj[at].constructor.name
                    : "Object"
                } ${symb}`
              );
              list.push(spn, Domlib.createElement('<br>'), minSpan);
            } else if (typeof obj[at] == "function") {
              list.push(
                Domlib.createElement(
                  `<span style="padding-left:${
                    tabContainer
                  }px">${at}:function()</span>`
                ),
                Domlib.createElement("<br>")
              );
            } else {
              list.push(
                Domlib.createElement(
                  `<span style="padding-left:${tabContainer}px">${at}: ${
                    obj[at]
                  } </span>`
                ),
                Domlib.createElement('<br>')
              );
            }
          }
          prepare(obj)
          list.push(
            Domlib.createElement(`<span style="padding-left:${tab}px">${limiter}</span>`),
            Domlib.createElement("<br>")
          );
          span.append(...list);
        } else {
          this.innerHTML = triangleVertical();
          this.dataset.position = "vert";
          span.innerHTML = "";
          list.splice(0, list.length);
        }
      };
      const btn = Domlib.createElement(`
      <span >${triangleVertical()}</span>
      `);
      btn.dataset.position = "vert";
      btn.onclick = change;
      return btn;
    }
    if (typeof data == "object") {
      const toSpan = (obj) => {
        let spanMain = Domlib.createElement('<span></span>');
        let span1 = Domlib.createElement('<span></span>');

        const stringMap = ["{"];
        var compteur = 0;
        for (let at in obj) {
          compteur++;
          if (compteur < 3) {
            stringMap.push(
              `${at}: ${
                typeof obj[at] == "object"
                  ? Array.isArray(obj[at])
                    ? `[${obj[at].toString()}]`
                    : "{...}"
                  : obj[at]
              }`
            );
          }
        }
        stringMap.push("...}");
        const span2 = Domlib.createElement('<span></span>');
        spanMain.append(
          boutton(obj, span2),
          obj.constructor.name,
          span1,
          Domlib.createElement('<br>'),
          span2
        );
        span1.append(stringMap);
        return spanMain;
      };
      return toSpan(data);
    } else if (typeof data == "function") {
      return Domlib.createElement(`<span>${data.name}: function()</span>`);
    } else {
      return Domlib.createElement(`<span>${data.constructor.name}: ${data}</span>`);
    }
  }
Singleton//  c'est une classe qui construit conformément un object et  garantie qu'il n'existe qu'une et une seule instance de l'object en mémoire
Abstract//  c'est une classe qui n'est pas instanciable. Elle sert de base à d'autres classes dérivées (héritées).
classProxy// c'est une class qui controle l'acces et modification  ses methodes et attributes
ExtendableProxy// ce classe faite excactement la meme chose de classProxy . la seul grande difference c'est que ce classe doit heriter du classe qu'elle doit controller il est plus pratique de l'heriter avec une class abstraite