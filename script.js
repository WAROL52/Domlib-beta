/* eslint-disable no-undef */
const elMonApp=Domlib.el('mon-app',function Rolio (handler){
    const liste={}
    handler.age=false
    handler.info={
        nom:'Rolio',
        prenom:'WArol',
        liste,
        plus:{
            moi:'',
            toi:[1,2,3,4]
        }
    }
    handler.$on.emit('salutation',(option)=>{
        console.log(option);
    })
    handler.saluer=(e)=>{
        console.log(this);
        console.log(e);
    }
        // console.log(e.recreateEvent());
    setInterval(()=>{
     handler.age=!handler.age
    },2000)
    return`<h1 :nom="info"  call:="saluer" > salu les {{info.plus.toi}} 
        <input type="text" :disabled="age" >
    </h1>`},false)

const e=new elMonApp({
    nom:'rolio',
    prenom:'Warol'
},'salut')

e.addEventListener('salutation',(e)=>{
    console.log(e);
})

Domlib.appendChild(e)

  