import { openDB } from 'idb';
import { Queue } from 'workbox-background-sync';

const STORE_NAME = 'todolist';
const OFFLINE_QUEUE = new Queue('todolist');

function openTodoDB() {
    return openDB('TodoApp', 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    });
}

export default registerRoute => {
    registerRoute(
        /getTodoItems/,
        async ({ event }) => {
            return fetch(event.request)
                .then(response => {
                    return response.json();
                })
                .then(async data => {
                    const db = await openTodoDB();
                    const tx = db.transaction(STORE_NAME, 'readwrite');
                    await tx.store.clear();
                    data.forEach(async element => {
                        await tx.store.put(element);
                    });
                    await tx.done;
                    return new Response(JSON.stringify(data))
                })
                .catch(async err => {
                    const db = await openTodoDB();
                    let cursor = await db.transaction(STORE_NAME).store.openCursor();
                    let todoList = [];
                    while (cursor) {
                        todoList.push(cursor.value);
                        cursor = await cursor.continue();
                    }
                    return new Response(JSON.stringify(todoList))
                });
        },
        "GET"
    );

    registerRoute(
        /insertTodoItem/,
        async ({ event }) => {
            const clonedRequest = event.request.clone();
            const data = await clonedRequest.json();
            return fetch(event.request.clone())
                .catch(async err => {
                    const db = await openTodoDB();
                    const key = new Date().getTime();
                    await db.put(STORE_NAME, {"id":key, "task": data.task });
                    OFFLINE_QUEUE.pushRequest({request: event.request.clone()});
                    return new Response(JSON.stringify({"success": true}))
                });
        },
        "POST"
    );

    registerRoute(
        /deleteTodoItem/,
        async ({ event }) => {
            const clonedRequest = event.request.clone();
            const data = await clonedRequest.json();
            return fetch(event.request.clone())
                .catch(async err => {
                    const db = await openTodoDB();
                    await db.delete(STORE_NAME, data.id);
                    OFFLINE_QUEUE.pushRequest({request: event.request.clone()});
                    return new Response(JSON.stringify({"success": true}))
                });
        },
        "POST"
    );
};