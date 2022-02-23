// eslint-disable-next-line no-unused-vars
class Domlib {
  constructor(handler={el:undefined,data:{},methodes:{}}) {
    const {el,data,methodes}=handler
    delete handler.el
    delete handler.data
    delete handler.methodes
    const handlerTrap=new Domlib.TrapLib({
      ...handler,...data,...methodes
    })
    this;
    console.log(handlerTrap);
    (new Domlib.#Core).attachElement(el,handlerTrap)
    return handlerTrap
  }
  
  static #Core = class Core{
    constructor() {
      Domlib.#Core.#core ??= this;
      return Domlib.#Core.#core;
    }
    static TrapLib = class {
      constructor(target = {}, handler={},listExc = []) {
        if (!target) return target;
  
        if(target['$isTrapLib']) return target
        if (Core.isDomElement(target)) return target;
        if (Core.isDomText(target)) return target;
        if (Core.isDomFragment(target)) return target;
        if(typeof handler=='object'){
          Object.assign(this,handler)
        }
        this.onSet=(option,t,h)=>{
          handler?.onSet?.(option,t,h)
          if (typeof option.newValue == "object") {
            option.newValue = new this.constructor(option.newValue);
          }
        }
        const trap = target.$isTrap?target:  new Traper(target, this);
        Object.defineProperty(target,'$isTrapLib',{
          value:true,
          writable:false,
          configurable:false,
          enumerable:false
        })
        for (let at in trap) {
          if (typeof trap[at] == "object") {
            const index = listExc.indexOf(at);
            if (index == -1 && !trap[at]?.$isTrapLib) {
              trap[at] = new this.constructor(trap[at]);
            }
          }
        }
        return trap;
      }
    };
    ElConsole=class ElConsole {
      constructor(el, logName = "Pretty-Console", logTitle = "log-title") {
        this.el = Domlib.createElement(el.outerHTML);
        this.logName = logName;
        this.logTitle = logTitle;
      }
      colorAttrMessage = "gray";
      colorAttrExpression = "#BACCD8";
      colorAttrTarget = "red";
      colorLogMessage = "pink";
      colorEl = "#47A4E2";
      colorAttrName = "#98C7E6";
      colorAttrValue = "";
      colorInnerHTML = "gray";
      
      handler=null
      attr=null
      target=null
      lastState=null
      nameState=null

      attrName = "";
      attrNameOrValue = "name";
      attrExpression = "attrExpression ";
      attrMessage = "attrMessage";
      logMessage = "logMessage";
      message = {
        french: "Bonjour le Monde",
        english: "Hello World",
      };
      static restrictionExpression={
        isNoUndefined:(handler,target,attr)=>{
          if(target==undefined) return{
            logMessage:'Reference Error',
            attrExpression:`${handler.constructor.name}.${attr.value}=`,
            attrMessage:'undefined',
            message:{
              french:`'${handler.constructor.name}.${attr.value}': ne doit pas être null`,
              english:`'${handler.constructor.name}.${attr.value}':must not be null`
            },
            msgThrow:`In ${handler.localName}[${attr.name}='${attr.value}'] : '${attr.value}' is not defined `
          }
          return true
        },
        isTypeArray:(handler,target,attr)=>{
          if(!Array.isArray(target)) return{
            logMessage:'Reference Error',
            attrExpression:`Array.isArray(${handler.constructor.name}.${attr.value})->`,
            attrMessage:Array.isArray(target),
            message:{
              french:`'${handler.constructor.name}.${attr.value}': doit  être de type tableau`,
              english:`'${handler.constructor.name}.${attr.value}':must be  type array `
            },
            msgThrow:`In ${handler.localName}[${attr.name}='${attr.value}'] : '${attr.value}'is not type Array`
          }
          return true
        },
        isTypeObject:(handler,target,attr)=>{
          if(typeof target!='object') return{
            logMessage:'Type Error',
            attrExpression:`typeof ${handler.constructor.name}.${attr.value}->`,
            attrMessage:typeof target,
            message:{
              french:`'${handler.constructor.name}.${attr.value}': doit être type objet`,
              english:`'${handler.constructor.name}.${attr.value}':must be object type`
            },
            msgThrow:`'${handler.constructor.name}.${attr.value}' is not object type`
          }
          return true
        },
        isTypeFunction:(handler,target,attr)=>{
          if(typeof target!='function') return{
            logMessage:'Type Error',
            attrExpression:`typeof ${handler.constructor.name}.${attr.value}->`,
            attrMessage:typeof target,
            message:{
              french:`'${handler.constructor.name}.${attr.value}': doit être type fonction`,
              english:`'${handler.constructor.name}.${attr.value}':must be function type`
            },
            msgThrow:`'${handler.constructor.name}.${attr.value}' is not function type`
          }
          return true
        },
      }
      getLogByRule(rule){
        const restriction=ElConsole.restrictionExpression[rule]
        if(!restriction){
          console.warn(`rule '${rule}' is no valid`)
          console.log('list rule valid are:',Object.keys(ElConsole.restrictionExpression))
          throw `rule '${rule}' is no valid`
        }
        
        const result=restriction?.(this.handler,this.lastState?.[this.nameState],this.attr)
            if(result!==true){
              return [[
                ...this.getLogFull({
                  attrNameOrValue:'value',
                  ...result
                })
                ],result?.msgThrow]
            }
            return false
      }
      get styleInnerHTML() {
        return [`color:${this.colorInnerHTML}`];
      }
      get styleEl() {
        return [`color:${this.colorEl}`];
      }
      get styleAttr() {
        return [
          `color:${this.colorAttrName}`,
          `color:${this.colorEl}`,
          `color:${this.colorAttrValue}`,
          `color:${this.colorEl}`,
        ];
      }
    
      logMessage = "";
      get startEl() {
        return `%c<${this.el.localName}`;
      }
      get endEl() {
        return `%c>%c...%c</${this.el.localName}>`;
      }
      get attributes() {
        const list = [];
        for (let attr of this.el.attributes) {
          list.push(`%c${attr.name}%c="%c${attr.value}%c"`);
        }
        return list;
      }
      _listStyleAttr(len) {
        const list = [];
        for (let index = 0; index < len; index++) {
          list.push(...this.styleAttr);
        }
        return list;
      }
      get outerHTML() {
        const outerHTML = [this.startEl];
        outerHTML.push(...this.attributes);
        outerHTML.push(this.endEl);
        return outerHTML.join(" ");
      }
      get listStyleEl() {
        
        return [
          ...this.styleEl,
          ...this._listStyleAttr(this.el.attributes.length),
          ...this.styleEl,
          ...this.styleInnerHTML,
          ...this.styleEl,
        ];
      }
    
      _stringLogAtt(
        attrName,
        attrNameOrValue = "name",
        attrExpression = "expression ",
        attrMessage = "message"
      ) {
        if (this.el.getAttribute(attrName)==undefined) {
          const msg = `this element don't have attribute named '${attrName}'`;
          console.warn(msg);
          console.log(this.el.attributes);
          throw msg;
        }
        const bonus = attrNameOrValue == "name" ? 0 : attrName.length + 2;
        const strAttr = this.outerHTML.slice(
          0,
          this.outerHTML.indexOf(
            `${attrName}%c="%c${this.el.getAttribute(attrName)}%c"`
          )
        );
        const len_ = strAttr.split("%c").length - 1;
        const spaceLamba=attrNameOrValue == "name"
        ? 0
        : this.el.getAttribute(attrName).length ?0:-1
        const len = strAttr.length - len_ * 2 + bonus+spaceLamba;
        return `\n${" ".repeat(len)}%c${"^".repeat(
          attrNameOrValue == "name"
            ? attrName.length
            : this.el.getAttribute(attrName).length||2
        )}%c(%c${attrExpression}%c${attrMessage}%c)\n`;
      }
    
      get styleLogAttr() {
        return [
          `color:${this.colorAttrTarget}`,
          `color:${this.colorInnerHTML}`,
          `color:${this.colorAttrExpression}`,
          `color:${this.colorAttrMessage}`,
          `color:${this.colorInnerHTML}`,
        ];
      }
      getLogEl = function () {
        return [this.outerHTML, ...this.listStyleEl];
      }.bind(this);
      logEl = function () {
        console.log(...this.getLogEl());
      }.bind(this);
      getLogAttr = function (
        attrName,
        attrNameOrValue = "name",
        attrExpression = "expression ",
        attrMessage = "message"
      ) {
        const logAt = this._stringLogAtt(
          attrName,
          attrNameOrValue,
          attrExpression,
          attrMessage
        );
        return [this.outerHTML + logAt, ...this.listStyleEl, ...this.styleLogAttr];
      }.bind(this);
      logAttr = function (
        attrName,
        attrNameOrValue = "name",
        attrExpression = "expression ",
        attrMessage = "message"
      ) {
        console.log(
          ...this.getLogAttr(attrName, attrNameOrValue, attrExpression, attrMessage)
        );
      }.bind(this);
      getLogFull = function ({
        attrName = this.attrName,
        attrNameOrValue = this.attrNameOrValue,
        attrExpression = this.attrExpression,
        attrMessage = this.attrMessage,
        logName = this.logName,
        logTitle = this.logTitle,
        logMessage = this.logMessage,
        message = this.message,
      }) {
        const head = `\n%c(%c${logName}%c)%c[%c${logTitle}%c] %c${logMessage}\n\n`;
        const styleHead = [
          ...this.styleInnerHTML,
          `color:${this.colorEl};border-bottom:1px dotted white`,
          ...this.styleInnerHTML,
          `color:${this.colorAttrExpression}`,
          `color:${this.colorAttrMessage}`,
          `color:${this.colorAttrExpression}`,
          `color:${this.colorLogMessage}`,
        ];
        var stringMessage = "\n";
        const styleMsg = [
          ...this.styleInnerHTML,
          `color:${this.colorAttrExpression}`,
        ];
        var styleMessage = [];
        for (let [nameMessage, valueMessage] of Object.entries(message)) {
          stringMessage += `%c${nameMessage}:%c${valueMessage}\n`;
          styleMessage.push(...styleMsg);
        }
        const body =
          head +
          this.outerHTML +
          this._stringLogAtt(
            attrName,
            attrNameOrValue,
            attrExpression,
            attrMessage
          ) +
          stringMessage;
        return [
          body,
          ...styleHead,
          ...this.listStyleEl,
          ...this.styleLogAttr,
          ...styleMessage,
        ];
      }.bind(this);
      logFull = function ({
        attrName = this.attrName,
        attrNameOrValue = this.attrNameOrValue,
        attrExpression = this.attrExpression,
        attrMessage = this.attrMessage,
        logName = this.logName,
        logTitle = this.logTitle,
        logMessage = this.logMessage,
        message = this.message,
      }) {
        console.log(
          ...this.getLogFull({
            attrName,
            attrNameOrValue,
            attrExpression,
            attrMessage,
            logName,
            logTitle,
            logMessage,
            message,
          })
        );
      }.bind(this);
    }
    HTMLText=class HTMLText{
      static #regexIsDataR =/\{\{\s*(\[?\s*[a-zA-Z_]*\w*(\.[a-zA-Z_]*\w*\s*)*\s*\]?)\s*\}\}/gm
      static attachData(htmlText,handler,dico={dynamic:{},static:{}}){
        if (!Core.isDomText(htmlText)) return;
        const result = htmlText.data.match(this.#regexIsDataR);
        // const el = htmlText.parentElement;
        // if (!el) return console.warn("bug");
        if (result) {
          this.#splitTextChild(result, htmlText).forEach((childSplited) =>
            this.#attachTextChild(childSplited, handler,dico.dynamic,dico.static)
          );
        }
      }
      static #splitTextChild(listMatch, child) {
        if (!Core.isDomText(child)) return [];
        const listChilds = [];
        listMatch.forEach((item) => {
          const indexToSplit = child.data.indexOf(item);
          var childSplited;
          if (indexToSplit != -1 && indexToSplit < child.data.length) {
            childSplited = child.splitText(indexToSplit);
            child = childSplited.splitText(item.length);
            childSplited.data = childSplited.data.replace(
              this.#regexIsDataR,
              (_corresp, path) => {
                return path;
              }
            );
            listChilds.push(childSplited);
          }
        });
        return listChilds;
      }
      static #attachTextChild(textChild, handlerNode ,dicoD={},dicoS={}) {
        if (!Core.isDomText(textChild)) return;
        textChild.data=textChild.data.replace(/\s*/g,'')
        const {lastState, name}=textChild.data in dicoS
          ?{
            lastState:new Traper(dicoS), 
            name:textChild.data
          }
          :handlerNode.$getStateByPath(
          dicoD?.[textChild.data]||textChild.data
        )
        const data=lastState
        if (!data || !data.$isTrap) {
          textChild.data = `{${textChild.data} undefined\}`;
          return;
        }
        const value = data[name];
        const dico={
          dynamic:dicoD,
          static:dicoS
        }
        this.#attachRoot({ textChild, data, name, value ,handlerNode,dico});
      }
      static #attachRoot({ textChild, data, name, value ,handlerNode,dico}, addEv = true, opt = {}) {
        if (Array.isArray(value))
          return this.#attachArray(
            { textChild, data, name, handlerArray:value,handlerNode,dico },
            addEv,
            opt
          );
        if(typeof value=='object')
        return this.#attachObject(
          { textChild, data, name, handlerArray:value,handlerNode ,dico},
          addEv,
          opt
        );
        this.#attachDefault({ textChild, data, name, value,handlerNode }, addEv, opt);
      }
      static #attachArray({ textChild, data, name, handlerArray,handlerNode,template}) {
        if (!Array.isArray(handlerArray)) return;
        if (!Core.isDom(textChild)) return;
        if (!Core.isDomText(textChild)) textChild = Domlib.createElement("");
        if(!handlerArray?.$isTrap) {
          console.warn("the array must be a Trap")
          throw "the array must be a Trap"
        }
        const {toRemoving}=this.rendArray({
          template:template,
          elBefore:textChild,
          array:handlerArray,
          handler:handlerNode
        })
        textChild.data = "";
        const onChange=(handlerEvent) => {
          toRemoving();
          const value=handlerEvent.$option.newValue
          data.$eventListener.remove('change',name,onChange)
          this.#attachRoot({ textChild, data, name, value });
        }
        data.$on.change(name,onChange,()=>{
          toRemoving();
          return true
        });
      }
      static rendArray({template,elBefore,array,handler,dico}){
        const listElement=[]
        const regElement={}
        const comment=document.createComment('For')
        elBefore.after(comment)
        elBefore=comment
        const attachEl=(el,index,h)=>{
          if(template){
            if(handler.$isTrap)(new Core).attachElement(el,h,{
              dynamic:{
                [dico?.array[0]]:`${dico?.path}.${index}`
              },
              static:{
                [dico?.array[1]]:index
              },
              path:dico?.path,
              array:dico?.array
            })
          }else{
            if(handler?.$isTrap)(new Core).attachElement(el,h,dico)
            else return 
          }
        }
        const rendEl=(index,value)=>{
          const _el=Domlib.createElement(template||value)
          if(isNaN(Number(index))){
            if(regElement[index]){
              regElement[index].before(_el)
              regElement[index].remove()
            }else{
              elBefore.after(_el)
            }
          }else if(index in listElement){
            listElement[index].before(_el)
            listElement[index].remove()
          }else if(listElement.length==index){
            elBefore.before(_el);
          }else {
            var _key = -1;
            for (
              let i = index, u = index;
              i >= 0 || u < listElement.length;
              i--, u++
            ) {
              if (i >= 0 && listElement[i]) {
                _key = i;
                i = -1;
                break;
              }
              if (u < listElement.length && listElement[u]) {
                _key = u;
                u = listElement.length + 1;
                break;
              }
            }
            if (_key != -1) {
              if (_key < index) {
                listElement[_key].after(_el);
              } else {
                listElement[_key].before(_el);
              }
            } else {
              elBefore.before(_el);
            }
          }
          listElement[index]=_el
          return _el
        }
        // array.forEach((val, index) =>{

        //   const el=rendEl(index,val)
        //   attachEl(el,index,handler)
        // });
        for(let index in array){
            const el=rendEl(index,array[index])
            attachEl(el,index,handler)
        }
        
        array.$on.change( "*",(handlerEvent) =>{
          if(template){
            if(listElement[handlerEvent.$option.key]) return
          }
          const el=rendEl(handlerEvent.$option.key,handlerEvent.$option.value)
          attachEl(el,handlerEvent.$option.key,handler)
        });
        array.$on.delete("*", (handlerEvent) => rendEl(handlerEvent.$option.key,''));
        const toRemoving = () => {
          listElement.forEach((el) => el.remove());
          for(let at in regElement){regElement[at].remove()}
        };
        return{toRemoving}
      }
      static #attachObject({ textChild,dico, data, name, handlerArray,handlerNode,template}) {
        if (typeof handlerArray!='object') return;
        if (!Core.isDom(textChild)) return;
        if (!Core.isDomText(textChild)) textChild = Domlib.createElement("");
        if(!handlerArray?.$isTrap) {
          console.warn("the array must be a Trap")
          throw "the array must be a Trap"
        }
        const path=dico.dynamic[textChild.data.replace(/\s*/g,'')]
        ??dico.static[textChild.data.replace(/\s*/g,'')]??textChild.data.replace(/\s*/g,'')
        var elText="{"
        for(let key in data[name]){
          elText+=`,'${key}':{{${path}.${key}}}`
        } 
        elText+="}"
        elText=Domlib.createElement(elText.replace(',',''))
        textChild.data = "";
        textChild.after(elText)
        HTMLText.attachData(elText,handlerNode)
        const onChange=(handlerEvent) => {
          const value=handlerEvent.$option.newValue
          data.$eventListener.remove('change',name,onChange)
          this.#attachRoot({ textChild, data, name, value });
        }
        data.$on.change(name,onChange,()=>{
          return true
        });
      }
      
      static #attachDefault({ textChild, data,name, value ,handlerNode}, addEv = true, opt) {
        if (!Core.isDom(textChild)) return;
        const key=name
        const init = (elText,val) => {
          if(!elText) return
          const text = Domlib.createElement(val);
          if(Core.isDomElement(text)){
            (new Core).attachElement(text,handlerNode)
          }
          if(Core.isDomFragment(text)){
            (new Core).attachFragment(text)
          }
          elText.after(text);
          elText.remove();
          elText = text;
          return text;
        };
        textChild=init(textChild,value);
        if (opt._el) opt._el = textChild;
        if (!addEv) return;
        var elVar=textChild
        
        const onChange=(ev)=>{
          if (Array.isArray(ev.$option.newValue)) {
            const value=ev.$option.newValue
            data.$eventListener.remove('change',key,onChange)
            this.#attachArray({ textChild:elVar, data, name:key, handlerArray:value,handlerNode})
          } else {
            const newEl=Domlib.createElement(ev.$option.newValue)
            if(ev.data.els.nodeName==newEl.nodeName && newEl.nodeName=="#text"){
              ev.data.els.data=ev.$option.newValue
              return
            }
            ev.data.els=init(ev.data.els,ev.$option.newValue);
            elVar=ev.data.els
          }
        }
        data.$on.change(key,onChange,
          ()=>{
            init(elVar,"").remove()
            return true
          },
            {
              els: textChild,
            }
        );
      }
    }
    HTMLComponent = class HTMLComponent {
      constructor(builder, builderType) {
        this.builderType = builderType;
        this.builder = builder;
      }
      name;
      el;
      events={
        onMounted:[]
      }
      initChildrens(el, handler) {
        handler.children.push(...el.children);
        handler.children.forEach((child,index) => {
          child=Domlib.createElement(child)
          handler.children[index]=child
          child.remove()
          if (child.slot) {
            if (!handler.slot[child.slot]) handler.slot[child.slot] = [];
            handler.slot[child.slot].push(child);
          }
        });
      }
      initProps(el, handler,props) {
        for (let attr of el.attributes) {
          handler.props[attr.name] = attr.value;
        }
        for(let at in props){
          handler.props[at]=props[at]
        }
      }
      initParentAndChilds(fastHandler,handler){
        if(fastHandler){
          if(!fastHandler.handlerChild) fastHandler.handlerChild=[]
          fastHandler.handlerChild.push(handler)
          handler.handlerParents={
            ...handler.handlerChild,
            [fastHandler?.localName??'']:fastHandler
          }
          var i=0
          while (handler.handlerParents[i]) {
            if(!handler.handlerParents[i+1]){
              handler.handlerParents[i+1]=fastHandler
              break
            }
            i++
          }
          if(!handler.handlerParents[0] ) handler.handlerParents[0]=fastHandler
        }else{
          handler.handlerParents=null
        }
      }
      initDirecctive(localName,directives){
        (new Core).HTMLDirective.createDirectiveComponent(localName,directives)
      }
    };
    HTMLDirective = class HTMLDirective {
      static listDirectiveNoRendChild=['for','switch']
      static create(directiveName,onInit,option,toSave=true){
        this.isDirectiveValid({
          directiveName:"directive-"+directiveName,onInit,reg:directiveName
        })
        const model={
          directiveName:"directive-"+directiveName,
          restriction:[...option?.restriction??[]],
          reg:directiveName,
          regex:this.createRegexValid(directiveName),
          data:option?.data??{},
          directive:{
            directiveName:"directive-"+directiveName,
            onInit,
          }
        }
        if(toSave)this.#directiveCustom.push(model);
        return model
      }
      static createRegexValid(regx){
        // eslint-disable-next-line no-useless-escape
        return new RegExp('^'+regx.toString()+`:(\.?([A-z]+[-_]*)+(\.[A-z]+[-_]*)*)?`)
      }
      static directiveComponent={}
      static createDirectiveComponent(ComponentName,directives){
        if(this.directiveComponent[ComponentName]){
          console.warn('Bug');
        }
        this.directiveComponent[ComponentName]=[]
        for(let [name,value] of Object.entries(directives)){
          this.directiveComponent[ComponentName].push(this.create(name,value?.onInit,value,false))
        }
      }
      

      static #directiveNative=[
        { //directive-model []

          directiveName:'',
          restriction:['isNoUndefined','isTypeArray','isTypeObject','isTypeFunction'],
          reg:'bind',
          regex:this.createRegexValid('.x.x.'),
          data:{},
          directive:{
            directiveName:'',
            onInit:(el,attr,option)=>{console.log(el,attr,option);},
          }
        },
        { // 1-directive-attr [x]
          directiveName:"directive-attr",
          restriction:['isNoUndefined'],
          regex:this.createRegexValid('(bind)?'),
          data:{},
          reg:'bind',
          directive:{
            directiveName:"directive-attr",
            onInit:(el,attr,option)=>{
              const pc=new (new Core).ElConsole(el,option.handler.localName,'Directive.Bind')
              pc.attrName=attr.name
              const {lastState,name}=option.attachment
              const getValue=()=>el.value??el.getAttribute('value')??el[option.opt]??el.getAttribute(option.opt)
              const type={
                checkbox:()=>{
                  const verifyValidation=()=>{
                    const logs=option.pc.getLogByRule('isTypeArray')
                    if(logs){
                      console.warn(...logs[0]);
                      throw logs[1]
                    }
                    if(!el.value && !el.getAttribute('value')){
                      console.warn(
                        ...pc.getLogFull({
                          logMessage:'Type Error',
                          attrNameOrValue:'name',
                          attrExpression:``,
                          attrMessage:'',
                          message:{
                            french:`cet élément doit avoir un attribut 'value'`,
                            english:`this element must to have an attribute 'value'`
                          }
                        }))
                      const message=`In ${el.localName}[${attr.name}='${attr.value}'] : this element must to have an attribute 'value'`
                      throw message
                    }
                  }
                  const rendEl=(e)=>{
                    verifyValidation()
                    var check=el.checked??el.getAttributeNode('checked')
                    if(check || e){
                      if(check?.name)check=check?.value==''?'on':check?.value
                      if(check){
                        lastState[name].push(el.value??el.getAttribute('value'))
                      }else{
                        const index=lastState[name].indexOf(el.value??el.getAttribute('value'))
                        if(index>0)lastState[name].splice(index,1)
                      }
                    }
                  }
                  option.opts.slice(1).forEach(ev=>{
                    el.addEventListener(ev,rendEl)
                  })
                  rendEl()
                },
                radio:()=>{
                  if(!el.value && !el.getAttribute('value')){
                    console.warn(
                        ...pc.getLogFull({
                          logMessage:'Type Error',
                          attrNameOrValue:'name',
                          attrExpression:``,
                          attrMessage:'',
                          message:{
                            french:`cet élément doit avoir un attribut 'value'`,
                            english:`this element must to have an attribute 'value'`
                          }
                        }))
                    const message=`In ${el.localName}[${attr.name}='${attr.value}'] : this element must to have an attribute 'value'`
                    console.warn(message);
                    throw message
                  }
                  const rendEl=(e)=>{
                    var check=el.checked??el.getAttributeNode('checked')
                    if(check || e){
                      if(check?.name)check=check?.value==''?'on':check?.value
                      lastState[name]=getValue()??check??lastState[name]
                    }
                  }
                  option.opts.slice(1).forEach(ev=>{
                    el.addEventListener(ev,rendEl)
                  })
                  rendEl()
                },
                default:()=>{
                  const rendAttr=()=>{
                    if(Core.isDomElement(el)){
                      if(option.opt in el){
                        el[option.opt]=lastState[name]
                      }else{
                        el.setAttribute(option.opt,lastState[name]?.toString())
                      }
                    }
                  }
                  const addEvent=()=>{
                    option.opts.slice(1).forEach(ev=>{
                      el.addEventListener(ev,()=>{
                        lastState[name]=getValue()??lastState[name]
                      })
                    })
                  }
                  addEvent()
                  rendAttr()
                  lastState.$on.change(name,rendAttr,true)
                }
              }
              var tpe=el.type ?? el.getAttribute('type')
              if(option.opts.length==1 || !option.opts.length){
                type.default()
              }
              if(tpe){
                if(type[tpe])type[tpe]()
                else type.default();
              }else{
                type.default()
              }
            },                    
          }                    
        },                                                                                      
        { // 4-directive-ref [x]
          directiveName:'directive-ref',
          restriction:[],
          reg:'ref',
          regex:/^[#]([a-zA-Z]*[a-zA-Z_-]*[a-zA-Z]*)(:(\.[a-zA-Z]+[\w-]*)*)?/,
          data:{},
          directive:{
            directiveName:'directive-ref',
            onInit:(el,attr,option)=>{
              el.setAttribute('id',option.directiveName.slice(1))
              if(option.handler.id[option.directiveName.slice(1)]){
                console.warn(`In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' this id name has already useed`);
                throw `In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' this id name has already useed `
              }
              option.handler.id[option.directiveName.slice(1)]=el
              option.opts.forEach(className=>{
                el.classList.add(className)
                if(!Array.isArray(option.handler.className[className]))option.handler.className[className]=[]
                option.handler.className[className].push(el)
              })
            },
          }
        },
        { // 2-directive-event [x]
          directiveName:'directive-event',
          restriction:['isNoUndefined','isTypeFunction'],
          reg:'on',
          regex:this.createRegexValid('on'),
          data:{},
          directive:{
            directiveName:'directive-event',
            onInit:(el,attr,option)=>{
              const {lastState,name}=option.attachment
              if(!Core.isDomElement(el)){
                return console.warn('Erreur grave [Interne] , ceci n\'est pas un element HTML',el);
              }
              const getOption=()=>{
                if(option.opts.includes('true')) return true
                if(option.opts.includes('false')) return false
                return {
                  capture:option.opts.includes('capture'),
                  once:option.opts.includes('once'),
                  passive:option.opts.includes('passive'),
                  useCapture:option.opts.includes('useCapture'),
                }
              }
              const opt=option.opt;
              const removeEvent=()=>{
                el.removeEventListener(opt,rendEv,getOption())
                  return true
              }
              const createEvent=()=>{
                el.addEventListener(opt,rendEv,getOption())
                return true
              }
              const rendEv=(e)=>{
                e.removeEvent=removeEvent
                e.recreateEvent=createEvent
                if(option.opts.includes('prevent'))e.preventDefault()
                return (lastState[name]).bind(el)(e)
              }
              createEvent()
              lastState.$on.change(name,(option)=>{
                removeEvent()
                if(typeof option.value=='function')createEvent()
              },removeEvent)
            },
          }
        },
        { // 3-directive-emit [x]
          directiveName:'directive-emit',
          reg:'emit',
          regex:this.createRegexValid('emit'),
          data:{},
          directive:{
            directiveName:'directive-emit',
            onInit:(el,attr,option)=>{
              if(!Core.isDomElement(el)){
                return console.warn('Erreur grave [Interne] , ceci n\'est pas un element HTML',el);
              }
              const getOption=()=>{
                if(option.opts.includes('true')) return true
                if(option.opts.includes('false')) return false
                return {
                  capture:option.opts.includes('capture'),
                  once:option.opts.includes('once'),
                  passive:option.opts.includes('passive'),
                  useCapture:option.opts.includes('useCapture'),
                }
              }
              const opt=option.opt;
              const removeEvent=()=>{
                el.removeEventListener(opt,rendEv,getOption())
                  return true
              }
              const createEvent=()=>{
                el.addEventListener(opt,rendEv,getOption())
                return true
              }
              const rendEv=(e)=>{
                e.removeEvent=removeEvent
                e.recreateEvent=createEvent
                if(option.opts.includes('prevent'))e.preventDefault()
                option.handler.$emitEvent(attr.value,e)
                return option.handler.el.dispatchEvent(new CustomEvent(attr.value, {
                  detail:e,
                  bubbles:option.opts.includes('bubbles'),
                  cancelable:option.opts.includes('cancelable'),
                  composed:option.opts.includes('composed'),
                }))
              }
              createEvent()
            },
          }
        },
        { // 5-directive-if [x]
          directiveName:'directive-if',
          restriction:['isNoUndefined'],
          reg:'if',
          regex:this.createRegexValid('if'),
          data:{},
          directive:{
            directiveName:'directive-if',
            onInit:(el,attr,option)=>{
              const {lastState,name}=option.attachment
              if(!(['true','false',undefined].includes(option.opt))){
                console.warn(`In ${el.localName}[${attr.name}='${attr.value}'] : '${option.opt}' is not valid listValid=>[.true,.false,'']`);
                throw `In ${el.localName}[${attr.name}='${attr.value}'] : '${option.opt}' is not valid listValid=>[.true,.false,''] `
              }
              const comment=document.createComment(` ${el.localName}[${attr.name}='${attr.value}']:=>is-${!(option.opt=='true')} `)
              el.after(comment)
              const rendComment=()=>(el.after(comment),el.remove())
              const rendEl=()=>{
                comment.after(el),comment.remove()
              }
              const init=()=>{
                if(option.opt=='false'){
                  if(lastState[name])return rendComment()
                }else{
                  if(!lastState[name]) return rendComment()
                }
                rendEl()
              }
              init()
              lastState.$on?.change?.(name,init,init)
            },
          }
        },
        { // 6-directive-store []
          directiveName:'',
          reg:'...',
          regex:this.createRegexValid('.x.x.'),
          data:{},
          directive:{
            directiveName:'',
            onInit:(el,attr,option)=>{console.log(el,attr,option);},
          }
        },
        { // 7-directive-style [x]
          directiveName:'directive-style',
          restriction:['isNoUndefined','isTypeObject'],
          reg:'style',
          regex:this.createRegexValid('style'),
          data:{},
          directive:{
            directiveName:'directive-style',
            onInit:(el,attr,option)=>{
              const {lastState,name}=option.attachment
              var handler=lastState[name]
              const onChange=(option)=>{
                el.style[option.$option.key]=option.$option.value
              }
              const onDelete=(option)=>{
                el.style[option.$option.key]=""
              }
              const removeEv=(obj=handler)=>{
                for (const [key, value] of Object.entries(obj)) {
                  el.style[key]=""
                }
                console.log(obj);
                obj.$eventListener.remove('change','*',onChange)
                obj.$eventListener.remove('delete','*',onDelete)
              }
              const iniEv=(obj=handler)=>{
                removeEv(obj===handler?new Traper:handler)
                handler=obj
                Object.assign(el.style,obj)
                obj.$on.change('*',onChange)
                obj.$on.delete('*',onDelete)
              }
              iniEv(handler)
              var isRemoved=false
              lastState.$on.change(name,(ev)=>{
                if(isRemoved) return
                const logs=option.pc.getLogByRule('isTypeObject')
                    if(logs){
                      console.warn(...logs[0]);
                      throw logs[1]
                    }
                iniEv(ev.$option.value)
              },
              ()=>{
                removeEv()
                isRemoved=true
                return true
              })
            },
          }
        },
        { // 8-directive-switch [x]
          directiveName:'switch',
          restriction:['isNoUndefined'],
          reg:'switch',
          regex:this.createRegexValid('switch'),
          data:{},
          directive:{
            directiveName:'',
            onInit:(el,attr,option)=>{
              const {lastState,name}=option.attachment
              var elDefault
              const createComment=(_el)=>{
                const comment=document.createComment(`${_el.localName} case='${_el.getAttribute('case')}'`)
                _el.after(comment)
                return comment
              }
              const listEl=()=>[...el.querySelectorAll('[case]')]
              var listComment=[]
              const initComment=()=>{
                listComment=listEl().map(_el=>{
                  const finded=listComment.find(o=>o.el==_el)
                  return finded??{
                    comment:createComment(_el),
                    el:_el
                  }
                })
                return listComment
              }
              initComment()
              const rendEl=()=>{
                var hasfind=false
                listComment.forEach(o=>{
                  const cas=o.el.getAttribute('case')
                  if(cas=='default'){
                    elDefault=o
                  }
                  if(lastState[name]==cas){
                    o.comment.after(o.el)
                    o.comment.remove()
                    hasfind=true
                  }else{
                    o.el.after(o.comment)
                    o.el.remove()
                  }
                })
                if(!hasfind){
                  if(elDefault){
                    elDefault.comment.after(elDefault.el)
                    elDefault.comment.remove()
                  }
                }
              }
              rendEl()
              lastState.$on.change(name,rendEl,true)
            },
          }
        },
        { // 9-directive-for []
          directiveName:'directive-for',
          restriction:['isNoUndefined'],
          reg:'for',
          regex:this.createRegexValid('for'),
          data:{},
          directive:{
            directiveName:'directive-for',
            onInit:(el,attr,option)=>{
              const {lastState,name}=option.attachment
              const comment=document.createComment('for'+attr.value)
              var toRemoving
              const rendLoup=(el,data,path,attr)=>{
                el.removeAttributeNode(attr)
                var {outerHTML:template}=el
                const opts=attr.name.slice(attr.name.indexOf(':')+1).split('.').filter(e=>e)
                const core=new Core
                const ob=core.HTMLText.rendArray({
                  elBefore:el,
                  template,
                  array:data,
                  handler:option.handler,
                  dico:{
                    array:opts,
                    path
                  }
                })
                el.remove()
                return ob.toRemoving
              }
              toRemoving=rendLoup(el,lastState[name],option.attachment.path,attr)
              const onChange=(handlerEvent) => {
                toRemoving();
                const value=handlerEvent.$option.newValue
                lastState.$eventListener.remove('change',name,onChange)
                toRemoving=rendLoup(el,lastState[name],option.attachment.path,attr)
              }
              lastState.$on.change(name,onChange,()=>{
                toRemoving();
                return true
              });
            },
          }
        },
        { // 10-directive-call [x]
          directiveName:'directive-call',
          restriction:['isNoUndefined','isTypeFunction'],
          reg:'call',
          regex:this.createRegexValid('call'),
          data:{},
          directive:{
            directiveName:'directive-call',
            onInit:(el,attr,option)=>{
              const {value:func} =option.attachment
              if(option.opt=='class'){
                if(typeof func!='function'){
                  console.warn(`In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' must be a constructor `);
                  throw `In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' must be a constructor `
                }
                try{
                  new func({el,handler:option.handler,opt:'class'})
                }catch(e){
                  console.warn(`In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' is not a constructor`);
                  throw `In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' is not a constructor `
                }
              }else if(option.opt=='function' || option.opt=='func'||option.opt==undefined){
                if(typeof func!='function'){
                  console.warn(`In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' must be a function`);
                  throw `In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' must be a function `
                }
                try{
                  func({el,handler:option.handler,opt:'function'})
                }catch(e){
                  console.warn(`In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' ${e.message}`);
                  throw `In ${el.localName}[${attr.name}='${attr.value}'] : '${attr.value}' ${e.message} `
                }
              }
            },
          }
        },
      ]
      static #directiveCustom=[]
      static getByName=function(directiveName){
        return this.#directiveNative.find(corresp=>corresp.directiveName==directiveName)
                ||this.#directiveCustom.find(corresp=>corresp.directiveName==directiveName)
      }
      static getByRegex=function(stringExpression,localName){
        return this.#directiveNative.find(corresp=>corresp.regex.test(stringExpression))
              || this.#directiveCustom.find(corresp=>corresp.regex.test(stringExpression))
              || this.directiveComponent?.[localName]?.find(corresp=>corresp.regex.test(stringExpression))
      }
      static hasRegex=function(reg){
        if(!reg)return false
        return this.#directiveNative.find(corresp=>corresp.reg==reg)
        || this.#directiveCustom.find(corresp=>corresp.reg==reg)
      }

      static isDirectiveValid=function({directiveName,onInit,reg}){
        if (!reg)
            return console.warn("directive.reg is not defined");
        if (!directiveName)
            return console.warn("directive.directiveName is not defined");
        if (typeof onInit != "function")
            return console.warn(
              "directive.func is not defined or not a function"
            );
        if (this.getByName(directiveName))
            return console.warn("directive.directiveName is already exist");
        if (this.hasRegex(reg))
            return console.warn("directive.regex is already exist");
        return true
      }
    }
    attachFragment(htmlElement,handler,dico={dynamic:{},static:{}}){
      var option
      if (Core.isDomElement(htmlElement)&&htmlElement.getAttributeNode("no:rend")) return;
      [...htmlElement.childNodes].forEach(child=>{
          if(Core.isDomText(child)){
            this.HTMLText.attachData(child, handler,dico)
            return false
          }
          option=this.attachDirective(child, handler,dico)
          if(option.rendChild)this.attachFragment(child,handler,dico)
          return true
        })
    }
    attachDirective(htmlElement,handler,dico={dynamic:{},static:{}}){
      const attrs=[...htmlElement.attributes]
      var rendChild=true
      var hasFindDirectiveFor=false
      attrs.forEach(attr=>{
        const directiveHandler=this.HTMLDirective.getByRegex(attr.name,handler.localName)
        if(!hasFindDirectiveFor && directiveHandler){
          const pc=new (new Core).ElConsole(htmlElement,handler.localName,'Directive')
          pc.attrName=attr.name
          const directiveName=attr.name.slice(0,attr.name.indexOf(':') != -1?attr.name.indexOf(':'):undefined)
          if(directiveName=='for') hasFindDirectiveFor=true
          const opts=attr.name.slice(attr.name.indexOf(':')+1).split('.').filter(e=>e)
          const {data,directive }=directiveHandler
          var attachment={}
          if(attr.value in dico.static){
            let value=dico.static?.[attr.value]
            attachment={
              hasFinded:true,
              path:attr.value,
              args:[],
              name:attr.value,
              value,
              firstState:dico.static,
              lastState:dico.static
            }
          }else{
            attachment=handler.$getStateByPath( 
              dico.dynamic?.[attr.value]||attr.value
              )
          }
          directiveHandler.restriction?.forEach(rule=>{
            pc.handler=handler
            pc.attr=attr
            pc.target=attachment.value
            pc.logTitle='Directive.'+(directiveName||'bind')
            pc.lastState=attachment.lastState
            pc.nameState=attachment.name
            const logs=pc.getLogByRule(rule)
            if(logs){
              console.warn(...logs[0]);
              throw logs[1]
            }
          })
          directive.onInit(htmlElement,attr,{
            handler,
            opt:opts[0],
            directiveName,
            opts,
            data,
            attachment,
            pc
          })
          Object.assign(directiveHandler.data,data)
          if(this.HTMLDirective.listDirectiveNoRendChild.includes(directiveName)){
            rendChild=false
          }
          htmlElement.removeAttribute(attr.name)
        }
      })
      return {
        rendChild
      }
    }
    attachElement(htmlElement,handler,dico={dynamic:{},static:{}}){
    if(!handler.$isTrap){
      console.warn('the handler must an instance of Domlib.TrapLib or Traper');
      throw 'the handler must an instance of Domlib.TrapLib or Traper'
    }
    if(Core.isDomElement(htmlElement)) {
      if (htmlElement.attributes.length) {
        const option=this.attachDirective(htmlElement,handler,dico);
        if(!option.rendChild) return
      }
    }
    if(!Core.isDomElement(htmlElement) && !Core.isDomFragment(htmlElement)) return
    this.attachFragment(htmlElement,handler,dico);
    
    return handler

    }
    static #core = null;
    
    registre = {};
    static fastHandler=null
    defineElement(builder, builderType = "class") {
      const component = new this.HTMLComponent(builder, builderType);
      const core=new Domlib.#Core
      var HTMLextends = HTMLElement;
      HTMLextends =builder.extend? document.createElement(builder.extend).constructor:HTMLextends
      const defElement = class extends HTMLextends {
        #handler;
        constructor(props,...children) {
          super();
          Domlib.__el= this;
          Domlib.__component=component
          this.#handler = new component.builder();
          this.#handler.children.push(...children)
          this.#handler.el = this;
          this.#handler.localName = this.localName;
          this.#handler.elementName=builder.localName
          this.dataPublic = {};

          component.initChildrens(this, this.#handler);
          component.initProps(this, this.#handler,props);
          const fastHandler=Core.fastHandler
          component.initParentAndChilds(fastHandler,this.#handler)
          const rend = this.#handler.render(this.#handler) || `<h1>Hello ${this.localName} </h1>`;
          this.#handler.template = this.attachShadow({mode: 'open'});
          Core.fastHandler=this.#handler
          component.initDirecctive(this.#handler.localName,this.#handler.directive)
        if (Core.isDom(rend)) {
          this.#handler.template.append(rend);
        } else {
          this.#handler.template.innerHTML = rend;
        }
        Core.fastHandler=fastHandler
        core.attachFragment(this.#handler.template,this.#handler)
        this.#handler.$emitEvent('Mounted',{})
        component.events.onMounted.forEach(ev=>ev?.(this.#handler))
        this.#handler.isMounted=true 
        }
        connectedCallback(){}
        disconnectedCallback(){}
        adoptedCallback(){}
        attributeChangedCallback(){}
      };
      customElements.define(builder.localName, defElement, {
        extends: builder.extend || undefined,
      });
      return defElement
    }
    static isDom = function (el) {
      if (Core.isDomElement(el)) return true;
      if (Core.isDomFragment(el)) return true;
      if (Core.isDomText(el)) return true;
      return false;
    };
    static isDomFragment = function (docFrag) {
      try {
        if (
          docFrag.nodeType == 11 &&
          docFrag.querySelector &&
          docFrag.appendChild
        ) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    };
    static isDomText = function (element) {
      if (element && element.nodeName == "#text" && element.nodeType == 3)
        return true;
      return false;
    };
    static isDomElement = function (element) {
      if (!element) return false;
      try {
        if (element.tagName && element.localName && element.nodeType) {
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    };
  };
  static TrapLib =this.#Core.TrapLib
  static Element = class Element {
    static localName = "";
    static extend = "";
    #events={
      onMounted:[]
    }
    constructor() {
      if(this.constructor==Element){
        console.warn(`Désolé,tu ne peux pas instancier un objet avec cette constructeur parce ce que c'est une class Abstraite`);
        throw `sorry, you can't instantiate an object with this constructor because it's an Abstract class`
      }
      const el = Domlib.__el;
      delete Domlib.__el;
      const component = Domlib.__component;
      delete Domlib.__component;
      this.onMounted=function(func){
        if(typeof func !='function'){
          const message =`func must be a function`
          console.warn(message);
          throw message
        }
        component.events.onMounted.push(func)
      }
      this.props = new Domlib.TrapLib({},{
        onChange: (option, _target, targProxy) => {
          Object.defineProperty(
            targProxy,
            option.key,
            Object.getOwnPropertyDescriptor(_target, option.key)
          );
          el.setAttribute(option.key, option.value);
        },
        onDelete: (option) => {
          el.removeAttribute(option.key);
        },
      })

      return new Domlib.TrapLib(this,{

      })
    }
    directive={}
    render(func){}
    onMounted=function(func){}
    isMounted=false
    children=[]
    props = {};
    slot = {};
    dataStatic = {};
    id = {};
    className = {};
  };
  static appendChild = function (elementAppend, elementContainer = null) {
    try {
      return elementContainer.appendChild(elementAppend);
    } catch (e) {
      return document.body.appendChild(elementAppend);
    }
  };
  static createElement = function (
    HTMLString = ""
  ) {
    const strToHTMLElement = (str) => {
      const doc=document.createRange().createContextualFragment(str)
      return doc.children.length>1?doc:doc.firstElementChild
    };
    if (this.#Core.isDom(HTMLString)) return HTMLString;
    if (typeof HTMLString == "function")
      return Domlib.createElement(HTMLString());
    if (Array.isArray(HTMLString)) {
      return HTMLString.map((str) => Domlib.createElement(str));
    }
    if (typeof HTMLString == "object") {
      try {
        return Domlib.createElement(JSON.stringify(HTMLString))
      } catch (error) {
        return Domlib.createElement(HTMLString?.toString?.()||"[Object "+HTMLString?.constructor?.name+"]")
      }
    }
    return strToHTMLElement(HTMLString) || new Text(HTMLString);
  };
  static createDirective = function (directiveName,onInit,option={restriction:[],data:{}}) {
    return (new this.#Core).HTMLDirective.create(directiveName,onInit,option)
  };
  static build = function (funcConstructor) {
    if (Object.getPrototypeOf(funcConstructor) !== Domlib.Element) {
      console.warn(`the class ${funcConstructor.name} must extends Domlib.Element`);
      throw `the class ${funcConstructor.name} must extends Domlib.Element`;
    }
    if (funcConstructor.localName.search(/^[a-z]+-[a-z]+$/) === -1) {
      console.warn("localName `" + funcConstructor.localName + "` is not valid ");
      console.log('([a-z]-[a-z]) Ex : "my-el" ');
      throw "localName `" + funcConstructor.localName + "` is not valid ";
    }
    return new this.#Core().defineElement(funcConstructor);
  };
  static el=function(localName, func, extend = "") {
    if(typeof func!='function'){
      const message="func must be a function"
      console.warn(message);
      throw message
    }
    return this.build(
      class el extends Domlib.Element {
        static localName = localName;
        static extend = extend;
        render = func;
      }
    );
  }
}