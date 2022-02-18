/* eslint-disable no-undef */
const elMonApp=Domlib.el('mon-app',function Rolio (handler){
    handler.fruits=["manque"]
    handler.nom="Rolio"
    // handler.key="moi"
    handler.changerNom=()=>{
        handler.nom='WAROL'
        // handler.fruits[2]=[Math.random()]
        handler.fruits.push(['pushed-1','pushed-2'])
    }
    handler.reverse=()=>{
        handler.fruits.reverse()
    }
    handler.pushList=(option)=>{
        console.log(option.target.getAttribute('key'));
        handler.fruits[option.target.getAttribute('key')].push('mama')
    }
    // setInterval(()=>{
    //     handler.nom+="r"
    // },3000)
    return`
    <div>
        boucle --------------------etou za zaoooo-
        <div>
        {{nom}} <br>
            <input  type="radio" name="fruit" value="mangue" :value.input="nom"> mangue <br>
            <input  name="fruit" :value.input="nom"> ananas <br>
            <input  type="radio" name="fruit" :value.input="nom"> fraise <br>
            <h1   type="radio" :nom.click="nom" >salu c'est moi</h1>
        </div>
        finc boucle---------------
    </div>
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
