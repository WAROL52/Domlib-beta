
 
 /**
 * @param {Object} option 
 * @param {HTMLElement} option.el - Element valid
 * @param {constructor} option.handler - Function constructor
 * create an element model
 * @example 
 * // return object handler
 *const em=new Domlib({
 *    el:document.querySelector('#app'),
 *    handler:class extends Domlib.Element{
 *      a:1,
 *      b:"b"
 *    }
 *})
 */
class Todos extends Domlib.Element {
    static localName="todo-list"
    constructor(){
        super()
    }
    _directives={
        rolio:{
            restriction:[],
            init(el,attr,option){
                console.log(this);
            }
        }
    }
    onMounted(){
        this.todos.forEach(todo=>todo.$on.change('completed',this.rendTodo))
        this.rendTodo()
        this.$on.change("showCompleted",this.rendTodo)
        console.warn('monted');
        console.log(this);
        // console.log(this.destroy());
    }
    h1=Domlib.createElement(`<h1>SAlut je suis le plus compliquer</h1>`)
    monStyle={
        color:'red'
    }
    showCompleted=true
    todos=[{
        name:"Enregistre ce tutoriel",
        completed:false
    }]
    newTodo=""
    filteredTodo=[]
    addTodo=()=>{
        this.todos.push({
            name:this.newTodo,
            completed:false
        })
        const todo=this.todos[this.todos.length-1]
        todo.$on.change('completed',this.rendTodo)
        this.h1=this.newTodo
        this.newTodo=""
        this.rendTodo()
        this.monStyle.color="blue"
    }
    rendTodo=()=>this.filteredTodo=this.todos.filter(todo=>
        this.showCompleted?true:!todo.completed
        )
    render(){
        return `
        <style moi:="salue" >
        ul{
            border:1px solid 
        }
        input:checked{
            color:gray
        }
        </style>
        {{h1}}
        <div>
            <h1 style:="monStyle" >Ma todolist</h1>
            <label for="">
                <input type="checkbox" :checked.input="showCompleted">
                Afficher les tâches Completées | {{showCompleted}}
            </label>
            <ul>
                <li for:todo="filteredTodo" style:="monStyle" >
                    <input type="checkbox"  :checked.input="todo.completed" >{{todo.name}} 
                </li>
            </ul>
            new todo :{{newTodo}} <br>
            <input   :value.input="newTodo">
            <button on:click="addTodo"  >Ajouter</button>
            <br>
            {{todos}}
            <br>------------------ <br>
            {{..._children}}
        </div>
        `
    }
}
const HTMLTodo=Domlib.build(Todos)

const el=new HTMLTodo({
    nom:'Rolio',
    prenom:'Warol',
    data:{
        prop1:1
    }
},
'salu Rolio',
Domlib.createElement(`<h1 slot="titre" > je suis le maitre</h1>`)
)
console.log(el);
Domlib.appendChild(el)
// const dom=new Domlib({
//     el:document.querySelector('#app'),
//     handler:class extends Domlib.Element {
//         showCompleted=true
//     todos=[{
//         name:"Enregistre ce tutoriel",
//         completed:false
//     }]
//     newTodo=""
//     filteredTodo=[]
//     addTodo=()=>{
//         this.todos.push({
//             name:this.newTodo,
//             completed:false
//         })
//         const todo=this.todos[this.todos.length-1]
//         todo.$on.change('completed',this.rendTodo)
//         this.newTodo=""
//         this.rendTodo()
//     }
//     rendTodo=()=>this.filteredTodo=this.todos.filter(todo=>
//         this.showCompleted?true:!todo.completed
//         )
//     render(){
//         this.todos.forEach(todo=>todo.$on.change('completed',this.rendTodo))
//         this.rendTodo()
//         this.$on.change("showCompleted",this.rendTodo)
//         return `
//         <div>
//             <h1 >Ma todolist</h1>
//             <label for="">
//                 <input type="checkbox" :checked.input="showCompleted">
//                 Afficher les tâches Completées | {{showCompleted}}
//             </label>
//             <ul>
//                 <li for:todo="filteredTodo"  >
//                     <input type="checkbox"  :checked.input="todo.completed" >{{todo.name}} 
//                 </li>
//             </ul>
//             new todo :{{newTodo}} <br>
//             <input   :value.input="newTodo">
//             <button on:click="addTodo"  >Ajouter</button>
//             <br>
//             {{todos}}
//         </div>
//         `
//     }
//     } 
// })