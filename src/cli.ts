//CLI: Command Line Interface

import TodoListApelido, { Item } from './core'

const TodoList = new TodoListApelido('todoList.json')
const params = process.argv;
const command = params[2];

if (command === 'add'){
    const value = params[3];

    if (!value) {
        console.log('Valor do item não pode ser nulo ou vazio')
        process.exit(1)
    }

    try {
        await TodoList.addItem(new Item(value))
    } catch (error) {
        console.error('Erro ao adicionar item.', error)
        process.exit(1)
    }
    
    console.log('Item adicionado com sucesso:', value)
    process.exit(0);
}

if (command)
    console.log('Comando não reconhecido: ${command}')

console.log('não entrou em nenhum if');