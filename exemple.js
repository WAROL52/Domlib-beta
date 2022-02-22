console.dir(Domlib);
const t1=performance.now()
/**
 * Domlib est composé de 5 methode static , 3 class static et 1 attribut static privée  :
 * LES 5 Methode static :
 * -appendChild: ajouter un element dans un autre.
 * -build: creer un element personnalisé avec une class qui herite de Domlib.Element
 * -el:creer un element personnalisé avec une simple fonction
 * -createElement: c'est Comme document.createElement , la seul different c'est que Domlib.createElement creer un element avec des chaine de caractere.
 * -createDirective:creer un directive de facon global avec une simple fonction
 */

/////////////////////////////////////////////////////////////////









/*  2 methode de creation d'un element Personnaliser    */

// 1er Methode : Methode par class

////Exemple-1: 
// class MonApp extends Domlib.Element{           // les class doivent toujour d'heriter le class Domlib.Element
//     static localName="mon-app"           //c'est le nom du balise du l'element creé, c'est obligatior pour l'instant
// }                                              // c'est le minimal pour construire un element
// ConstructorEl=Domlib.build(MonApp)             // c'est ce methode static qui creer l'element, ce methode retourne une class , et c'est avec cette class que tu peux instancier ton element  
// // tu peux maintenant creer ton balise soit dans le html direct soit par ConstructorEl
// const el=new ConstructorEl()                   // instance de l'element personnalisé
// Domlib.appendChild(el)                // rendre dans le Dom l'element peronnalisé

// 1er Methode : Methode par n'importe quel type de function

// //Exemple-2: 
// function monApp(){       // ce tout...
//     //code
//     return 'salu'
// }
// const ConstructorEl=Domlib.el("mon-app",monApp) // Domlib.el creer le class qui herite Domlib.Element a ta place , c'est le meilleur facon de creer un balise rapidement
// const el=new ConstructorEl()
// Domlib.appendChild(el)












/* les differentes facon d'instacier ton element personnalisé */
        /* pour etre plus rapide je vais diretement creer une fonction dans Domlib.el */

////Exemple-3
// const ConstructorEl=Domlib.el("mon-app",()=>`<h1>Hellos World</h1>`,)
// voici les 4 differentes facon d'instancier ton element
// const el1=new ConstructorEl()
// const el2=document.createElement('mon-app')
// const el3=Domlib.createElement("<mon-app></mon-app>")
// 4em methode c'est de le creer directement dans le HTML...


/*Mettre de Contenue dans l'element  */

//Exemple-4
// class MonApp extends Domlib.Element{
//     static localName="mon-app"
//     render(){
//         return `<h1> Salu tous le mondes </h1>`
//     }
// }
// Domlib.build(MonApp)



//// Exemple-5
// function MonApp(handler){
//     handler.info={nom:4,prenom:5}
//     return `<h1> Salu tous le monde {{info}} </h1>`
// }
// Domlib.el('mon-app',MonApp)



/* Mettre un donné dans l'element */


////Exemple-6
// class MonApp extends Domlib.Element{
//     static localName="mon-app"
//     nom="Rolio"
//     age = 12
//     render(){
//         return `<h1> Bonjour {{nom}} j'ai {{age}} ans </h1>`
//     }
// }
// Domlib.build(MonApp)


//// Exemple-7
// Domlib.el("mon-app",(handler)=>{
//     handler.nom="Rolio"
//     handler.age=12
//     return `<h1> Bonjour {{nom}} j'ai {{age}} ans </h1>`
// })




/* A chaque fois que les donnes changent , celle qui sont l'element change aussi de facon dynamique */

// //Exemple-8
// Domlib.el("mon-app",(handler)=>{
//     handler.nom="Rolio"
//     handler.age=12
//     setInterval(()=>{
//         handler.age++
//     },1000)
//     return `<h1> Bonjour {{nom}} j'ai {{age}} ans </h1>`
// })




/* Gerer les evenement */
//Exemple-9
// class MonApp extends Domlib.Element{
//     static localName="mon-app"
//     nom="Rolio"
//     age = 12
//     direBonjour=()=>{
//         this.nom="Warol"
//     }
//     render(){
//         return `<h1 on:click="direBonjour" > Bonjour {{nom}} j'ai {{age}} ans </h1>`
//     }
// }
// Domlib.build(MonApp)

/* Creer un petit incrementeur et decrementeur */

////Exemple-10
// Domlib.el('mon-app',(handler)=>{
//     console.log(handler);
//     handler.numero=1
//     handler.monListe=['pomme','banane','fraise','mangue']
//     handler.monStyle={
//         color:'red'
//     }
//     handler.incrementer=()=>{
//         handler.monStyle.color='green'
//         handler.numero++
//     }
//     handler.decrementer=()=>{
//         handler.monStyle.color='blue'
//         handler.numero--
//     }
//     // setInterval(()=>{
//     //     handler.monListe.push('Jerry')
//     // },3000)
//     return /*html*/`
//     <style>
    
//     </style>
//     <h1 for:="monListe"  :id="monListe"   >valeur {{numero}} </h1>
//     <ul>
//         <li for:fruit.index="monListe"> {{ index }}  {{fruit}} </li>
//     </ul>
//     <button on:click="incrementer" > +1</button>
//     <button on:click="decrementer" > -1</button>
//     `
// })


/* les differentes type de directve directive */
// un directive c'est un attribut personnalisé qui modifie le comportement d'un element qui le porte 

//1-directive-bind : lier les valeur de tes states dans un attribute
    // bind:attrName="pathState" 
//2-directive-event : mettre une fonction de rappel dans un evenement de l'element
    // on:eventName="pathState" 
//3-directive-emit : emettre une evenement de l'element
    // emit:eventName="nameEventToEmite"
// 4-directive-if : afficher un element ou pas en fonction du valeur booleen d'un state
    //if:="pathState"
// 5-directive-switch : afficher un element ou pas en fonction du valeur d'un state
// 6-directive-for : boucler sur un element
    //for:="pathState"
// 7-directive-call : au moment du rendu de l'element , cette directive appel une fonction ou une class
    //call:="pathState"
// 8-directive-ref : mettre l'element dans un state
    //ref:="pathState"
// 9-directive-style: styliser l'element avec le state
    //style:"pathState"
// 10-directie-store: partagé un state a un autre element-personnalisé (En cours de developpement)
    //store:="pathState"

// exemple Complet





const t2=performance.now()
console.log(t2-t1);
