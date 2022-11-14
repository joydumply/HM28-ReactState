import { useState } from "react";
import './Todo.css';

function Todo(){
    const [todos, setTodos] = useState([{
        id: 'id' + (new Date()).getTime(),
        text: 'Buy Milk',
        status : false
    }]);

    const [todoName, setTodoName] = useState('');
    
    function addTodo(e){
        e.preventDefault();
        if(todoName != ''){
            setTodos([...todos, {
                id: 'id' + (new Date()).getTime(),
                text: todoName,
                status : false
            }]);
            setTodoName('');
        }
        
    }
    function changeTodoName(event){
        setTodoName(event.target.value);
    }

    function deleteTodo(e, id){
        e.stopPropagation() ;
        const copyTodos = todos.slice();
        copyTodos.findIndex((elem, index, array) => {
            if(elem.id === id){
                copyTodos.splice(index,1);
            }
        });
        setTodos(copyTodos);
    }

    function toggleTodoStatus(id){
        console.log('toggle');
        const copyTodos = todos.slice();
        copyTodos.findIndex((elem, index, array) => {
            if(elem.id === id){
                copyTodos[index].status = !copyTodos[index].status;
            }
        });
        
        setTodos(copyTodos);
    }

    return (
        <div id="todo">
            <h1>
                What I need ToDo? 
            </h1>
            <ul>
                {
                    todos.map((todo) => <li className={todo.status ? 'done' : ''} onClick={() => toggleTodoStatus(todo.id)} key={todo.id}>{todo.text} <button type="button" onClick={(e) => deleteTodo(e, todo.id)}>Delete</button></li>)
                }
            </ul>

            <form onSubmit={addTodo}>
                <input type="text" value={todoName} onChange={changeTodoName} />
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}
export default Todo;