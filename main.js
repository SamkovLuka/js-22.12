document.addEventListener('DOMContentLoaded', () => {
    const usersListElement = document.getElementById('users-list');
    const todosListElement = document.getElementById('todos-list');
    const todosElement = document.getElementById('todos');


    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            usersListElement.innerHTML = '';
            users.forEach(user => {
                const userElement = document.createElement('div');
                userElement.classList.add('user');
                userElement.textContent = `${user.name} (${user.email})`;
                userElement.dataset.userId = user.id;

                userElement.addEventListener('click', () => loadTodos(user.id));
                usersListElement.appendChild(userElement);
            });
        })
        .catch(() => {
            usersListElement.textContent = 'Не вдалося завантажити користувачів.';
        });



    function loadTodos(userId) {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            .then(response => response.json())
            .then(todos => {
                todosElement.innerHTML = '';
                todos.forEach(todo => {
                    const li = document.createElement('li');
                    li.textContent = `${todo.title} - ${todo.completed ? '✅' : '❌'}`;
                    todosElement.appendChild(li);
                });

                todosListElement.classList.remove('hidden');
            })
            .catch(() => {
                todosElement.innerHTML = '<li>Не вдалося завантажити справи.</li>';
            });
    }
});
