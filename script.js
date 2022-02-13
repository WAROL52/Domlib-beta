/* eslint-disable no-undef */
const elMonApp=Domlib.el('mon-app',function Rolio (handler){
    handler.monStyle={
        color:'red'
    }
    handler.changeColor=(ev)=>{
        handler.monStyle.color=ev.target.innerHTML
    }
    handler.deleteColor=(ev)=>{
        delete handler.monStyle.color
    }
    handler.effacer=(ev)=>{
        delete handler.monStyle
    }
    handler.changer=()=>{
        handler.monStyle={
            color:'yellow'
        }
    }
    console.log(handler);
    return`<h1 style:="monStyle" >
        je suis le titre du dom
    </h1>
    <p style:="monStyle">je uis un paragraphe</p>
    <button on:click="changeColor">green</button>
    <button on:click="changeColor">red</button>
    <button on:click="deleteColor">delete</button>
    <button on:click="changer">changer</button>
    <button on:click="effacer">effacer</button>
    `
},false)

const e=new elMonApp({
    nom:'rolio',
    prenom:'Warol'
},'salut')

e.addEventListener('salutation',(e)=>{
    console.log(e);
})

Domlib.appendChild(e)

  