let app;
window.onload = function(){
    
    app = document.getElementById("app");
    new view(app);
    new controller(app);
    new model(app);

}

let model = class{
    constructor(app){
        this.app = app;
        this.loadData();
    }

    loadData(){
        let v = new view(this.app);
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            v.addNote(localStorage.getItem(key), key);    
        }
    }

}

let pageLoad = false;
let view = class{
    constructor(app){

        if(pageLoad != true){

            this.app = app;
            this.makeToDoForm(); // for input 
            //new controller(this.app);
            //this.loadData(); //for load data
            pageLoad = true;
        }

    }

    makeToDoForm(){
        let formDiv = this.createElement("div", "formDiv");
        let form = this.createElement("form","formCSS");
        let centerDiv = this.createElement("div", "centerCss");
        let holderDiv = this.createElement("div", "holder");
        let inputField = this.createInput("input", "inputField", "text");

        let img = this.createImg("img", "addButton", "./assets/001-plus.png");

        let title = this.createElement("h1", "title");
        title.innerHTML = "To Do List"

        formDiv.append(centerDiv);
        centerDiv.append(title);
        centerDiv.append(holderDiv);
        holderDiv.append(form);
        form.append(inputField);
        form.append(img);
        this.app.append(formDiv);

        inputField.focus();
    }

    createElement(tag, css){
        let element = document.createElement(tag);
        element.classList.add(css);
        return element;
    }

    createInput(tag, css, type){
        let element = document.createElement(tag);
        element.type = type;
        element.classList.add(css);
        return element;
    }

    createImg(tag, css, src){
        let element = document.createElement(tag);
        element.src = src;
        element.classList.add(css);
        return element;
    }

    addNote(note, id){

        let holderDiv = document.getElementsByClassName("holder")[0];
        let inputText = note;

        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.id = id;

        let textDiv = document.createElement("div");
        textDiv.innerHTML = inputText;
        textDiv.classList.add("todoText");

        let removeButton = document.createElement("img");
        removeButton.src = "./assets/trash.png";
        removeButton.classList.add("removeButton");
        removeButton.addEventListener("click", function(){
            let id = this.parentElement.id;
            document.getElementById(id).remove();
            localStorage.removeItem(id);
        })

        todoDiv.append(textDiv);
        todoDiv.append(removeButton);
        holderDiv.append(todoDiv);
    }

}

let id = localStorage.length;
let controller = class{

    constructor(app){
        this.app = app;
        this.addListeners();
    }

    addListeners(){
        let img = document.getElementsByClassName("addButton")[0];
        img.addEventListener("click", this.addEvent);

        document.addEventListener('keydown', function(event) {
            if( event.code == 'Enter' || event.code == 'NumpadEnter' ) {
                img.click();
            }
        });
    }

    addEvent(){
        let input = document.getElementsByClassName("inputField")[0];
        let inputText = input.value;

        id++;

        let v = new view(this.app);
        v.addNote(inputText, id);
        localStorage.setItem(id, inputText);

        input.value = "";

    }
}
