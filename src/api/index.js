import { v4 } from 'uuid';

// Fake database to hold dummy data
const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'hey',
            completed: true,
        },
        {
            id: v4(),
            text: 'ho',
            completed: true,
        },
        {
            id: v4(),
            text: 'let\'s go',
            completed: false,
        },
    ],
};

// A function that imitates the latency that would be found whilst making requests to a server
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Function used to fetchTodos based on the filter
export const fetchTodos = (filter) =>
    delay(500).then(() => {
        // if (Math.random() > 0.5) {
        //   throw new Error('Boom!');
        // }
        switch (filter) {
            case 'all':
                // Returns all of the todos in fakeDatabase
                return fakeDatabase.todos;
            case 'active':
                // Returns all of the todos where completed is false
                return fakeDatabase.todos.filter(t => !t.completed);
            case 'completed':
                // Returns all of the todos where completed is true
                return fakeDatabase.todos.filter(t => t.completed);
            default:
                throw new Error(`Unkknown filter: ${filter}`);
        }
    });

export const addTodo = (text) => (

    delay(500).then(() => {
        // Create a new todo
        const todo = {
            id: v4(),
            text,
            completed: false,
        };
        // Push new todos onto the end of fakeDatabase.todos
        fakeDatabase.todos.push(todo);
        // Return the new todo
        return todo;
    })
);

export const toggleTodo = (id) => (
    delay(500).then(() => {
        // Find the todo in fakeDatabase.todos where the IDs match
        const todo = fakeDatabase.todos.find(t => t.id === id);
        // Flip the completed state
        todo.completed = !todo.completed;
        return todo;
    })
);
