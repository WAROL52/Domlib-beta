class Todos extends Domlib.Element {
    static localName="todo-list"
    constructor(){
        super()
    }
    _directives={
        rolios(el,attr,option){
                console.log(this);
        }
    }

    onMounted(){
        this._el.rolio=this.todos
        this.todos.forEach(todo=>todo.$on.change('completed',this.rendTodo))
        this.rendTodo()
        this.$on.change("showCompleted",this.rendTodo)
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
        this.newTodo=""
        this.rendTodo()
    }
    rendTodo=()=>this.filteredTodo=this.todos.filter(todo=>
        this.showCompleted?true:!todo.completed
        )
    render(){
        return `
        <style rolio:="salue" >
        ul{
            border:1px solid 
        }
        input:checked{
            color:gray
        }
        </style>
        <div>
            <h1 style:="monStyle" >Ma todolist</h1>
            <label for="">
                <input type="checkbox" bind:checked.input="showCompleted">
                Afficher les tâches Completées | {{showCompleted}}
            </label>
            <ul>
                <li for:todo="filteredTodo" style:="monStyle" >
                    <input type="checkbox"  bind:checked.input="todo.completed" >{{todo.name}} 
                </li>
            </ul>
            new todo :{{newTodo}} <br>
            <input   bind:value.input="newTodo">
            <button on:click="addTodo"  >Ajouter</button>
            <br>
            {{todos}}
        </div>
        `
    }
}