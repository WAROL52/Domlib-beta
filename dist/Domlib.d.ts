
///* <reference no-default-lib="true"/>

type Callback<Args,Return>=(...args:Args[])=>Return
type Cle<T>=keyof T 
type ListOn={get:any ,set:any,call:any,change:any,delete:any,emit:any}
type TrapKey<Target>=('*')|Cle<Target>|(Cle<Target>|'*')[]

type onTrap<Target,Type extends Cle<ListOn>>=<Data,Key extends TrapKey<Target>,TrpListener=TrapListener<Target,Type,Key>>(
    key:Key,
    func:(this:TrpListener,ev:TrpListener)=>void,
    toRemove?:boolean|(()=>boolean),
    data?:Data
)=>TrpListener


type TrapListener<Target,Type extends Cle<ListOn>,Key=Cle<Target>,Data=any>={
    data?:Data
    readonly _type:Type;
    readonly _key:Key;
     _func(ev:TrapListener<Target,Type>):void;
    readonly _index:number;
    readonly _eventLen:number;
    readonly _originalTarget:Target&TrapInstance<Target>
     _remove():void
    $option:{
        break:false,
        key:Cle<Target>
        value:any,
        newValue?:any,
        oldValue?:any,
        [x:PropertyKey]:any
    }
}

type TrapTargetKey<Target>=Cle<Target>|Cle<Target>[]
type Trapi$G<Target>=ReturnType<TrapInstance<Target>['$getStateByPath']>
type TrapInstance<Target>={
    readonly $on:{
        [type in keyof ListOn]: onTrap<Target,type>
    }
     $emitEvent(eventName:string,option:any):void
    readonly $TrapListener:{
        add<T extends Cle<ListOn>>(handler:{key:TrapTargetKey<Target>,func:onTrap<Target,T>,type:T}):TrapListener<Target,T>|TrapListener<Target,T>[],
        get<T extends Cle<ListOn>>(key:TrapTargetKey<Target>|'*',type:T):TrapListener<Target,T>[],
        remove(type:Cle<ListOn>,key:Cle<Target>,func:Function):boolean
    }
    readonly $isTrap:true
    readonly $getStateByPath:(path:string,...data:Trap<not<{},HTMLElement>>[])=>{
        hasFinded:false|true,
        path:string,
        args:[],
        name:string|undefined,
        firstState:Trap<not<Target,HTMLElement>>,
        lastState:any,
        value:any,
      }
}

type Trap<T>=TrapInstance<T> & {
    [key in keyof T]:T[key]
}
type not<T,U>=T extends U ?never:T

type Traper={
    new<T>(target:not<T,HTMLElement>,handler?:{}):Trap<not<T,HTMLElement>>;
    isConstructor:<T>(Constructor:T)=>T extends {new():void}?true:false;
};
declare var  Traper:Traper
/*****************************************************************************************************************/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Domlib{
}
type onBeforeDestroy<t>=(handler?:t)=>void
type attachment<T> ={
    hasFinded:true,
    path:string|null,
    args:[],
    name:string,
    value:any,
    firstState:T,
    lastState:Object|null
}
type DirectiveOption<Target,Type extends keyof ListOn> ={
    attachment:attachment<Target>
    handler:Target
    opts:string[]
    opt:string
    onValueChange:null|((ev:TrapListener<Target,Type>)=>void)
    onEventRemove:null|(()=>void)
}
type ob<T=any>={[x:string|number]:T}
type restriction={isNoUndefined:any,isTypeArray:any,isTypeObject:any,isTypeFunction:any}
type HTMLDirective={
    data?:ob
    restriction?:Cle<restriction>
    onInit(el:HTMLElement,attr:Attr,option:DirectiveOption<DomlibElement,keyof ListOn>):void
}


interface DomlibElement  {
    render(handler:this):void
    destroy():boolean
    onMounted( callback: (handler?:DomlibElement)=>void|onBeforeDestroy<this>):void
    onBeforeMounted(callback:(handler?:this)=>(void | onBeforeDestroy<this>)):void
    onConnected(callback:(handler?:this)=>(void | onBeforeDestroy<this>)):void
    onDisconnected(callback:(handler?:this)=>(void | onBeforeDestroy<this>)):void
    onAdopted(callback:(handler?:this)=>(void | onBeforeDestroy<this>)):void
    onBeforeDestroy(callback:(handler?:this)=>void):void
    onAfterDestroy(callback:(handler?:this)=>void):void
    createDirective(directiveName:string,onInit:(el:HTMLElement,attr:Attr,option:DirectiveOption<this,keyof ListOn>)=>void,option:{restriction:keyof restriction,data:any}):void
    _props:{[x:PropertyKey]:any}
    _self:this
    _children:[]&{noSlotText:Text[],noSlot:any[],noSlotElement:{[x:PropertyKey]:HTMLElement|DocumentFragment}}
    _ref:{[x:PropertyKey]:HTMLElement}
    _directives:{[x:string]:HTMLDirective|HTMLDirective['onInit']}
    _el:HTMLElement
    _template:DocumentFragment
    localName:string
}

interface el {
    [x:PropertyKey]:any
}

type instanceDomlibElement<T extends {new():void}>=Trap<not<InstanceType<T>,HTMLElement>>
type instance<T extends Domlib['Element']>= instanceDomlibElement<T>
interface Domlib{
    build<T extends {
        new(): Domlib.Element,
        localName:string,
    }>(Constructor:T):new(props?:ob,...children:any[])=>HTMLElement;
    prototype: Domlib;
    new<T extends {new(): DomlibElement}>(handler:{el:Element,Constructor:T}):InstanceType<T>;
    Element:{
        new(): Trap<InstanceType<DomlibElement>>
    }
    appendChild(aChild:Node, aParent?:Node):void
    createElement(HTMLString?:string):HTMLElement|DocumentFragment
    createDirective(directiveName:string,onInit:HTMLDirective['onInit'],option?:{data?:any,restriction?:Cle<restriction>}):void
    /**
     * 
     * @param localName Nom de l'elements personnalisé
     * @param renderCallback rendu de l'element
     * @param extend nom de tags
     * @example
     * const HTMLCount=Domlib.el('my-count',function(){
     *  this.count=0
     *  return `<h1>count:{{count}}</h1>`
     * })
     * const elCount = new HTMLCount()
     * Domlib.appendChild(elCount)
     */
    el< TagName extends keyof HTMLElementTagNameMap,
        StringValid extends `${string}-${string}`,
        CallbackReturn,
        ElThis=DomlibElement&el&TrapInstance<el>
        ,
    >
    (localName:StringValid, renderCallback:(this:ElThis,handler:ElThis)
    =>DoEvent<instanceEl<CallbackReturn,el>>|string|Node,
     extend?:TagName):new(props?:ob,...children:any[])=>HTMLElement
}
declare var Domlib:Domlib
type Fusion<T,U>=T&U
type initType<T> ={
    [key in keyof T ]:T[key]
}
type ObjectDomlib <T,F>=T&DomlibElement&F&TrapInstance<T&DomlibElement>
type instanceEl <T,F>={
    [key in keyof Fusion<T,F>]:Fusion<T,F>[key] extends (...args:infer Args)=>infer Return
    ?(this:ObjectDomlib<T,F>,...args:Args)=>Return
    :Fusion<T,F>[key]
}

type DoEvent<T>={
    [key in keyof T ]:T[key] extends (...arg:infer Args)=>infer Return
    ?<K>(this:ObjectDomlib<T,{}>
        ,...arg:Args)=>Return
    :T[key]
}
 //DocumentEventMap
type evNameArg<T extends string,TrueV,FalseV>=keyof  DocumentEventMap extends T 
?TrueV:FalseV

type Concate<T1 extends string,T2 extends string>=`${T1}${T2}`

