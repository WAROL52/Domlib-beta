/* eslint-disable no-undef */
const elMonApp=Domlib.el('mon-app',function Rolio (handler){
    handler.fruits=["manque"]
    handler.nom="value1"
    return`
    <div>
        boucle --------------------etou za zaoooo-
        <div>
        {{fruits}} <br>
            <input type="checkbox"  name="fruit" :value.input="fruits"> mangue <br>
            <input type="checkbox"  checked name="fruit" value="ananas "  :value.input="fruits"> ananas <br>
            <input  type="checkbox" name="fruit" value="5 " :checked.input="fruits"> fraise <br>
            <h1  :o.click="nom" >salu c'est moi</h1>
        </div>
        {{nom}}
        <select name="select" label="rolio" multiple :value.input="nom">
  Elle est où la poulette ?
  <option value="value1">Avec les lapins</option>
  <option value="value2" selected>Avec les canards</option>
  <option value="value3">Pas là</option>
</select>
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
