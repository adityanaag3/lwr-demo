import { LightningElement, wire } from 'lwc';
import { getTodoItems, refresh } from '@api/getTodoItems';
import insertTodoItem from '@api/insertTodoItem';
import deleteTodoItem from '@api/deleteTodoItem';

export default class TodoList extends LightningElement {
    todoItems = [];

    @wire(getTodoItems)
    handleResponse(data){
        this.todoItems = data;
    }

    addTask(){
        const val = this.template.querySelector("lightning-input").value;
        if(val.length > 0){
            insertTodoItem({"task": val})
                .then(result => {
                    alert('Added succesfully');
                    refresh();
                })
                .catch(error => {
                    alert('An error occurred');
                });
        }
    }

    removeTask(event){
        if(event.target.dataset.id){
            deleteTodoItem({"id": event.target.dataset.id})
                .then(result => {
                    alert('Removed succesfully');
                    refresh();
                })
                .catch(error => {
                    console.log(error);
                    alert('An error occurred');
                });
        }
    }
}