
## DomlibJS

Une bibliothèque JavaScript pour créer des interfaces utilisateurs

| Déclaratif                                         | À base de web Component                            |Utilisable partout |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| Grâce à DomlibJS, il est facile de créer des interfaces utilisateurs interactives. Définissez des vues simples pour chaque état de votre application, et lorsque vos données changeront, DomlibJS mettra à jour, de façon optimale, juste les composants qui en auront besoin. <br/><br/> Des vues déclaratives rendent votre code plus prévisible et plus facile à déboguer.    | Créez des composants autonomes qui maintiennent leur propre état, puis assemblez-les pour créer des interfaces utilisateurs complexes.<br/><br/> Dans la mesure où les composants sont écrits en JavaScript plutôt que sous la forme de gabarits, vous pouvez facilement utiliser des données complexes dans vos applications et garder l’état hors du DOM.   | Comme nous ne présumons rien sur les autres technologies que vous utilisez, vous pouvez développer de nouvelles fonctionnalités avec DomlibJS sans avoir à réécrire votre code existant. |

# Un composant simple

Les composants DomlibJS implémentent une méthode `render()` qui prend des données en entrée et retourne ce qui doit être affiché. Les données passées au composant sont accessibles dans `render()` via `this._props.`


Dans script.js
```js
class HelloMessage extends Domlib.Element {
    static localName="hello-message"
    render(){
        return "<div>Salut {{_props.name}} </div>"
    }
}

const HTMLHelloMessage=Domlib.build(HelloMessage)

```

dans index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DomlibJS</title>
  <script src="./miniLib/Traper.js"></script>
  <script src="Domlib.js"></script>
</head>
<body>
  
  <hello-message name="Warol" ></hello-message>

</body>
</html>

```

rendu <br>

![img](./img/salut-Warol.PNG)


# Un composant à état

En plus de pouvoir recevoir des données (accessibles via `this.props`), un composant peut maintenir un état local (accessible via `this`). Lorsque l’état local d’un composant change, son affichage est mis à jour sans appeler `render()` une nouvelle fois.

```js

class Timer extends Domlib.Element{
  static localName="my-timer"
  constructor(){
    super()

    this.count=0

    this.onMounted(()=>{
      this.interval=setInterval(()=>{
        this.count++
      },1000)
    })

    this.onBeforeDestroy(()=>{
      clearInterval(this.interval)
    })
  }

  render(){
    return "{{count}}"
  }
}
const HTMLTimer=Domlib.build(Timer)
const el=new HTMLTimer()
Domlib.appendChild(el) // a chaque seconde, count s'increment

```

## Une application

En utilisant `_props` et `this` on peut créer une petite application de gestion de tâches. Cet exemple utilise `this` pour maintenir la liste des tâches et le texte que l’utilisateur a saisi.

```js

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

```

rendu <br>
![img](./todoList.gif)

## Choisissez votre parcours d'apprentissage

Différents développeurs ont différents styles d'apprentissage. N'hésitez pas à choisir un parcours d'apprentissage qui correspond à vos préférences - bien que nous vous recommandons de parcourir tout le contenu si possible !

|Essayer le tutoriel|Lire le guide|Decouvrez les exemples|
|-------------------|-------------|----------------------|
|Pour ceux qui préfèrent apprender les chose par la pratique|Le guide vous guide à travers tous les aspects du cadre dans tous les détails.|Explorez des exemples de fonctionnalités pricipales et de tâches d'interface utilisateur courantes.|

