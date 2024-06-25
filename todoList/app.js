const form = document.querySelector("form");
const ul = document.querySelector("ul");
const inputTag = document.querySelector("input");


if (getLocal()) {
    getLocal().forEach(todo => addTodo(todo));
};

let todoArr = getLocal() ? getLocal() : [];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoData = {
        id: Math.floor(Math.random() * 100000),
        text: inputTag.value,
        todoCheck: false,
    };

    addTodo(todoData);
    todoArr.push(todoData);
    setLocal(todoArr);
});


function addTodo(getData) {
    const li = document.createElement("li");
    const text = document.createElement("span");
    const iconBox = document.createElement("div");
    const deleteIcon = document.createElement("i");
    const editIcon = document.createElement("i");
    const checkedIcod = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";
    editIcon.className = "fa-solid fa-pen";
    checkedIcod.className = "fa-solid fa-check";
    deleteIcon.id = getData.id;
    editIcon.id = getData.id;
    checkedIcod.id = getData.id;
    iconBox.className = "iconBox";
    iconBox.append(checkedIcod, editIcon, deleteIcon);
    text.innerHTML = getData.text;
    li.append(text, iconBox);
    ul.appendChild(li);
    inputTag.value = "";
}


function setLocal(getTodoArr) {
    localStorage.setItem("todoDat", JSON.stringify(getTodoArr));
};


function getLocal() {
    return JSON.parse(localStorage.getItem("todoDat"))
};


ul.addEventListener("click", (e) => {

    /* delete function */
    if (e.target.className === "fa-solid fa-trash") {
        let li = e.target.parentNode.parentNode;
        const getId = Number(e.target.id);
        todoArr = todoArr.filter(todo => todo.id !== getId);
        setLocal(todoArr);
        li.remove();
    };


    if (e.target.className === "fa-solid fa-pen") {
        const newInput = document.createElement("input");
        let li = e.target.parentNode.parentNode;

        console.log(li.children[0]);
        if (li.children.length < 3) {
            li.appendChild(newInput);
            newInput.addEventListener("change", (x) => {
                li.children[0].innerHTML = x.target.value;
                li.lastChild.remove();
            })
        }else{
            li.lastChild.remove();
        };

    }

})
