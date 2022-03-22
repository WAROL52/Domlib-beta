//@ts-check
class TodoList extends Domlib.Element{
  static localName="todo-list"
  constructor(){
    super()

    this.todos=["todo 1","todo 2"]
    this.newTodo=""
  }

  addNewTodo=()=>{
    this.todos.push(this.newTodo)
    this.newTodo=""
  }
  removeNewTodo=(e)=>{
    const index=Number(e.target.getAttribute('index'))
    this.todos.splice(index,1)
  }

  render(){
    return `
     <ul>
       <li for:item.index='todos' >
       {{item}} 
       <button bind:index="index" on:click="removeNewTodo">X</button>
       </li>
     </ul>
     <div>
       Que faut-il faire ? : {{newTodo}} <br>
       <input bind:value.input="newTodo">
       <button on:click="addNewTodo">Ajouter</button>
     </div>
     {{todos}}
    `
  }
}
const HTMLTodoList=Domlib.build(TodoList)
const el=new HTMLTodoList()
Domlib.appendChild(el)


const HTMLCount=Domlib.el("my-count",(handler)=>{
  return {
    count:0,
    
    incr:()=>{
      handler.count++
    },


    render(){
      return "<h1 on:click='incr' >bonjour {{count}}</h1>"
    }
  }
})
const elCount=new HTMLCount()
Domlib.appendChild(elCount)


