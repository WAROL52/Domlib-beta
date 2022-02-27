class Todos extends Domlib.Element{
    static localName="todo-list"
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
        this.newTodo=""
        this.rendTodo()
    }
    rendTodo=()=>this.filteredTodo=this.todos.filter(todo=>
        this.showCompleted?true:!todo.completed
        )
    render(){
        this.todos.forEach(todo=>todo.$on.change('completed',this.rendTodo))
        this.rendTodo()
        this.$on.change("showCompleted",this.rendTodo)
        return `
        <div>
            <h1 >Ma todolist</h1>
            <label for="">
                <input type="checkbox" :checked.input="showCompleted">
                Afficher les tâches Completées | {{showCompleted}}
            </label>
            <ul>
                <li for:todo="filteredTodo"  >
                    <input type="checkbox"  :checked.input="todo.completed" >{{todo.name}} 
                </li>
            </ul>
            new todo :{{newTodo}} <br>
            <input   :value.input="newTodo">
            <button on:click="addTodo"  >Ajouter</button>
            <br>
            {{todos}}
        </div>
        `
    }
}
Domlib.build(Todos)
const dom=new Domlib({
    el:document.querySelector('#app'),
    handler:class extends Domlib.Element{
        nom="Rolio"
        saluer=()=>{
            this.data.nom="dsdefd"
            console.log(this);
        }
        data={
            nom:"rolio"
        }
    } 
})
console.log(dom);