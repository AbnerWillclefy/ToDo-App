'use strict';

const getBank = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setBank = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

const newItem = (texto, status='', indice) => {
    const item = document.createElement('div')
    item.classList.add('listItem')
    item.innerHTML = `
    <input type="checkbox" class="checkBox" ${status} data-indice=${indice}>
    <div>${texto}</div>
    <img class="close" src="images/icon-cross.svg" data-indice=${indice}>
    `
    document.querySelector('#todoList').appendChild(item)
}

const cleanWindow = () => {
    const todoList = document.querySelector('#todoList')
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const renderWindow = () => {
    cleanWindow();
    const dataBank = getBank()
    dataBank.forEach ((elemento, indice) => newItem(elemento.todo, elemento.status, indice))
    leftItems()
}

const addItem = (event) => {
    const key = event.key
    if(key === 'Enter') {
        const dataBank = getBank()
        dataBank.push({'todo': event.target.value, 'status': ''})
        setBank(dataBank)
        renderWindow()
        event.target.value = ''
    }
}

const removeItem = (indice) => {
    const dataBank = getBank()
    dataBank.splice(indice, 1);
    setBank(dataBank)
    renderWindow()
}

const attItem = (indice) => {
    const dataBank = getBank()
    dataBank[indice].status = dataBank[indice].status === '' ? 'checked' : ''
    setBank(dataBank)
    renderWindow()
}

const clickItem = (evento) => {
    const element = evento.target
    if (element.className === 'close') {
        const indice = element.dataset.indice
        removeItem(indice)
    } else if(element.className === "checkBox") {
        const indiceChecked = element.dataset.indice
        attItem(indiceChecked)
    }
}

const leftItems = () => {
    const dataBank = getBank()

    const isChecked = (param) => {
        return param.status != ''
    }

    const checked = dataBank.filter(isChecked)

    let itemsLeft = document.querySelector('#leftItems')
    itemsLeft.innerHTML = `${dataBank.length - checked.length} items left`
}

document.getElementById('todoElement').addEventListener('keypress', addItem)
document.getElementById('todoList').addEventListener('click', clickItem)


renderWindow();