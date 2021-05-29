function newElement() {
    let inputValue = document.querySelector('#todoElement').value
    let para = document.createElement('p')
    let paraText = document.createTextNode(inputValue)
    para.appendChild(paraText)

    var closeButton = document.createElement("img");
    closeButton.src = 'images/icon-cross.svg'
    closeButton.className = 'close'

    var checkedBox = document.createElement('input');
    checkedBox.type = 'checkbox'
    checkedBox.className = 'checkBox'

    if (inputValue === '') {} else {
        let li = document.createElement('li')
        li.appendChild(para)
        document.querySelector('ul').appendChild(li)
        li.appendChild(closeButton)
        li.appendChild(checkedBox)
    }

    document.querySelector('#todoElement').value = ''
    document.querySelector('#todoElement').focus()

    let close = document.getElementsByClassName("close");
        for (let i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                let div = this.parentElement;
                div.style.display = "none";
            }
        }

    
}

