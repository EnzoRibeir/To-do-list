
//codigo do calendario
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// obtendo nova data, ano atual e mês atual
let date = new Date()
currYear = date.getFullYear(),
currMonth = date.getMonth();

// armazenando o nome completo de todos os meses em um array
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // obtendo o primeiro dia do mês
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // obtendo a última data do mês
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // obtendo o último dia do mês
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // obtendo a última data do mês anterior
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // criando li dos últimos dias do mês anterior
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // criando li de todos os dias do mês atual
        // adicionando classe ativa ao li se o dia, mês e ano atuais corresponderem
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // criando li dos primeiros dias do próximo mês
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passando o mês e ano atuais como texto de currentDate
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // obtendo ícones de anterior e próximo
    icon.addEventListener("click", () => { // adicionando evento de clique em ambos os ícones
        // se o ícone clicado for o ícone anterior, decremente o mês atual em 1, caso contrário, incremente em 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // se o mês atual for menor que 0 ou maior que 11
            // criando uma nova data do ano e mês atuais e passando como valor de data
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // atualizando o ano atual com o ano da nova data
            currMonth = date.getMonth(); // atualizando o mês atual com o mês da nova data
        } else {
            date = new Date(); // passar a data atual como valor de data
        }
        renderCalendar(); // chamando a função renderCalendar
    });
});

//back-end main


//Seleçao dos elementos
const btnAddTask = document.querySelector("#btn-add-task button");
const addTaskDiv = document.querySelector("#add-task");
const addTaskFirstDiv = document.querySelector("#add-task-first");
const btnCalendar = document.querySelector('[name="btn-calendar"]');
const addTaskSecondDiv = document.querySelector("#add-task-second");
const btnExitData = document.querySelector('[name="btn-exit-data"]');
const btnSendData = document.querySelector('[name="btn-send-data"]');
const btnSend = document.querySelector('[name="btn-send-task"]');
const form = document.querySelector("#add-task-form");
const formInput = document.querySelector('[name="form-input"]');
const formDateInput = document.querySelector("#form-date");
const unfoldTodayIcon = document.getElementById("unfold-today");
const unfoldFutureIcon = document.getElementById("unfold-future");
const unfoldConcludedIcon = document.getElementById("unfold-concluded");
const checkListToday = document.querySelector("#check-list");
const checkListFuture = document.querySelector("#check-list-future");
const checkListConcluded = document.querySelector("#check-list-concluded");
const editDiv = document.getElementById("edit")
const editTaskDiv = document.getElementById("edit-task")
const editTaskTitle = document.querySelector("#edit-task-title");
const editTaskDate = document.querySelector("#edit-task-date");
const selectorCategoria = document.querySelector('.selector-categoria');
const select = document.querySelector('.dropdown-select');
const selectOptions = document.querySelectorAll('.selector-categoria-options div');
const formCategoryInput = document.querySelector("#form-category");
const navItems = document.querySelectorAll("#nav-list .nav-itens");
let taskConcluded = document.querySelector("#task-concluded");
let taskFuture = document.querySelector("#task-future");
let taskToday = document.querySelector("#task-today");
let noTask = document.querySelector("#no-task");

//Funçoes
// Função para mover a tarefa para a div de concluídas
const moveToConcluded = (todo) => {
    checkListConcluded.appendChild(todo);
    checkListConcluded.classList.remove("hide");
    checkEmptyLists();
    updateTodoStatusLocalStorage(todo.querySelector("p").innerText, true);
    todo.querySelector(".checkmark").classList.add("checked");
}

// Função para mover a tarefa para a div de origianl de acordo com a data
const moveToOriginalList = (todo) => {
    const todoDate = todo.querySelector(".iten-data p").innerText;
    const today = formatDate(new Date());
    if (todoDate === today) {
        checkListToday.appendChild(todo);
    } else {
        checkListFuture.appendChild(todo);
    }
    checkEmptyLists();
    updateTodoStatusLocalStorage(todo.querySelector("p").innerText, false);
    todo.querySelector(".checkmark").classList.remove("checked");
}

//verifica se as divs de tasks estão vazias, caso estejam sao ocultadas
const checkEmptyLists = () => {
    if (checkListFuture.querySelectorAll("label").length === 0) {
        taskFuture.id = "hide";
    } else {
        taskFuture.id = "task-future";
    }

    if (checkListConcluded.querySelectorAll("label").length === 0) {
        taskConcluded.id = "hide";
    } else {
        taskConcluded.id = "task-concluded";
    }

    if (checkListToday.querySelectorAll("label").length === 0) {
        taskToday.id = "hide";
    } else {
        taskToday.id = "task-today";
    }

    if (checkListToday.querySelectorAll("label").length === 0 && 
        checkListConcluded.querySelectorAll("label").length === 0 &&
        checkListFuture.querySelectorAll("label").length === 0) {
            noTask.classList.remove("hide")
    } else {
        noTask.classList.add("hide")
    }
    
}

checkEmptyLists();

//funçao de formatar data
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
    return `${day}-${month}`;
}

//funçao fold/unfold das divs de tasks
const toggleVisibility = (elementId, icon) => {
    const element = document.getElementById(elementId);
    if (element.style.display === "none") {
        element.style.display = "block";
        icon.innerText = "keyboard_arrow_down";
        icon.classList.remove("folded");
    } else {
        element.style.display = "none";
        icon.innerText = "keyboard_arrow_down";
        icon.classList.add("folded");
    }
};

// Função para abrir a div de edição e editar a tarefa
const openEditTask = (task) => {
    const isDone = task.closest("#check-list-concluded") !== null;
    if (isDone) {
        return; // Não abre a caixa de edição se a tarefa estiver concluída
    }
    const taskTitle = task.querySelector("p").innerText;
    const taskDate = task.querySelector(".iten-data p").innerText;

    editTaskTitle.value = taskTitle;
    editTaskDate.innerText = taskDate;

    editDiv.classList.remove("hide");
    editDiv.classList.add("overlay");

    const saveEdits = () => {
        const newTitle = editTaskTitle.value;
        const newDate = editTaskDate.innerText;
        if (newTitle !== taskTitle) {
            task.querySelector("p").innerText = newTitle;
            updateTodoTitleLocalStorage(taskTitle, newTitle);
        }
        if (newDate !== taskDate) {
            task.querySelector(".iten-data p").innerText = newDate;
            updateTodoDateLocalStorage(taskTitle, newDate);
        }
    };

    editTaskTitle.addEventListener("blur", saveEdits);
    editTaskDate.addEventListener("blur", saveEdits);
};

//funcao que move tarefas para div cloncluded
function toggleCheckbox(checkmark) {
    const todo = checkmark.closest("label");
    const isChecked = checkmark.classList.toggle('checked');
    if (isChecked) {
        moveToConcluded(todo);
    } else {
        moveToOriginalList(todo);
    }
}

//funçao de filtrar tasks por categoria
const filterTasksByCategory = (category) => {
    const allTasks = document.querySelectorAll(".check-itens");
    allTasks.forEach(task => {
        const taskCategory = task.dataset.category;
        if (category === "Todos") {
            task.style.display = "flex";
        } else if (taskCategory === category) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
};


//funçao de adicionar task
const saveTodo = (text, date, category, done = false, save = true) => {
    console.log("saveTodo called with:", { text, date, category, done, save }); // Adicionando log para depuração
    const todo = document.createElement("label");
    todo.classList.add("check-itens");
    todo.dataset.category = category;

    const todoTextDiv = document.createElement("div");
    todoTextDiv.classList.add("iten-text");

    const todoSpan = document.createElement("span");
    todoSpan.classList.add("checkmark");
    if (done) {
        todoSpan.classList.add("checked");
    }
    todoSpan.addEventListener("click", () => toggleCheckbox(todoSpan));

    const todoDelete = document.createElement("span");
    todoDelete.classList.add("material-symbols-outlined");
    todoDelete.id = "delete-task";
    todoDelete.innerText = "delete";
    todoDelete.addEventListener("click", () => {
        todo.remove();
        removeTodoLocalStorage(todo.querySelector("p").innerText);
        checkEmptyLists();
    });

    const todoTitle = document.createElement("p");
    todoTitle.innerText = text;

    todoTextDiv.appendChild(todoSpan);
    todoTextDiv.appendChild(todoTitle);
    todoTextDiv.appendChild(todoDelete)

    const todoDateDiv = document.createElement("div");
    todoDateDiv.classList.add("iten-data");

    const todoDate = document.createElement("p");
    todoDate.innerText = date;

    todoDateDiv.appendChild(todoDate);

    todo.appendChild(todoTextDiv);
    todo.appendChild(todoDateDiv);

    if (done) {
        checkListConcluded.appendChild(todo);
    } else {
        const today = formatDate(new Date());
        if (date === today) {
            checkListToday.appendChild(todo);
        } else {
            checkListFuture.appendChild(todo);
        }
    }

    if (save) {
        saveTodoLocalStorage({ text, date, category, done});
    }

    todo.addEventListener("click", (event) => {
        if (!event.target.classList.contains("checkmark") && event.target.id !== "delete-task") {
            openEditTask(todo);
        }
    });
    
    checkEmptyLists();
}


// Funções de Local Storage

//funçao de atualizar data da task
const updateTodoDateLocalStorage = (taskTitle, newDate) => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        if (todo.text === taskTitle) {
            todo.date = newDate;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

//funçao de atualizar titulo da task
const updateTodoTitleLocalStorage = (taskTitle, newTitle) => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        if (todo.text === taskTitle) {
            todo.text = newTitle;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

//funçao de pegar todos os itens do local storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};

//funçao de carregar todos os itens do local storage
const loadTodos = () => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        saveTodo(todo.text, todo.date, todo.category, todo.done, false);
    });
};

//funçao de salvar task no local storage
const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

//funçao de remover task do local storage
const removeTodoLocalStorage = (taskTitle) => {
    const todos = getTodosLocalStorage();
    const filteredTodos = todos.filter((todo) => todo.text !== taskTitle);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

//funçao de atualizar status da task no local storage
const updateTodoStatusLocalStorage = (taskTitle, done) => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        if (todo.text === taskTitle) {
            todo.done = done;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();


//Eventos

//evento de clique no botao de adicionar task
btnAddTask.addEventListener("click", (event) => {
    addTaskSecondDiv.classList.remove("overlay");
    addTaskSecondDiv.classList.add("hide");
    addTaskDiv.classList.remove("hide");
    setTimeout(() => {
        formInput.focus();
    }, 400);
});

//evento de clique fora da div de adicionar task
document.addEventListener("click", (event) => {
    if (!addTaskFirstDiv.contains(event.target) 
        && !btnAddTask.contains(event.target) 
        && !addTaskSecondDiv.contains(event.target)
    ) {
        addTaskDiv.classList.add("hide");
    }
});


//evento de clique no botao de calendario
btnCalendar.addEventListener("click", (event) => {
    addTaskSecondDiv.classList.remove("hide");
    addTaskSecondDiv.classList.add("overlay");
    event.preventDefault();
});

//evento de clique no botao de sair da div de seleçao de data
btnExitData.addEventListener("click", (event) => {
    formDateInput.value = ""
    addTaskSecondDiv.classList.remove("overlay");
    addTaskSecondDiv.classList.add("hide");
    event.preventDefault();
})

//evento de clique no botao de enviar data
btnSendData.addEventListener("click", (event) => {
    addTaskSecondDiv.classList.remove("overlay");
    addTaskSecondDiv.classList.add("hide");
    event.preventDefault();
})

//evento de clique no dia do calendario para adicionar data ao input
daysTag.addEventListener("click", (event) => {
    if (event.target.tagName === "LI" && !event.target.classList.contains("inactive")) {
        const selectedDay = event.target.innerText;
        const selectedDate = new Date(currYear, currMonth, selectedDay);
        formDateInput.value = formatDate(selectedDate);
    }
});

//evento de clique no botao de enviar task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formInput.value;
  let dateValue = formDateInput.value;
  const categoryValue = formCategoryInput.value || "Sem categoria";

  if (!dateValue) {
    dateValue = formatDate(new Date());
  }

  if (inputValue) {
    saveTodo(inputValue, dateValue, categoryValue);
    formInput.value = "";
    formDateInput.value = "";
    formCategoryInput.value = "";
    select.innerText = "Sem categoria";
  }
});

//evento de clique no icone de recolher tasks de hoje
unfoldTodayIcon.addEventListener("click", () => {
    toggleVisibility("check-list", unfoldTodayIcon);
});

//evento de clique no icone de recolher tasks futuras
unfoldFutureIcon.addEventListener("click", () => {
    toggleVisibility("check-list-future", unfoldFutureIcon);
});

//evento de clique no icone de recolher tasks concluidas
unfoldConcludedIcon.addEventListener("click", () => {
    toggleVisibility("check-list-concluded", unfoldConcludedIcon);
});

//evento de clique no checkbox
document.addEventListener("click", (event) => {
    if (event.target.type === "checkbox" && event.target.closest("label")) {
        const todo = event.target.closest("label");
        if (event.target.checked) {
            moveToConcluded(todo);
        } else {
            moveToOriginalList(todo);
        }
    }
});

//evento de clique na tarefa para abertura da div de ediçao
document.querySelectorAll(".check-itens").forEach(task => {
    task.addEventListener("click", (event) => {
        if (!event.target.classList.contains("checkmark") && event.target.id !== "delete-task") {
            openEditTask(task);
        }
    });
});

//evento de clique fora da div de ediçao para fechar a mesma
document.addEventListener("click", (event) => {
    if (!editTaskDiv.contains(event.target) && !event.target.closest(".check-itens")) {
        editDiv.classList.remove("overlay");
        editDiv.classList.add("hide");
    }
});

//evento de clique no botao de categoria em adicionar task
select.addEventListener('click', () => {
    selectorCategoria.classList.toggle('active');
  });
  
  document.addEventListener('click', (e) => {
    if (!selectorCategoria.contains(e.target)) {
      selectorCategoria.classList.remove('active');
    }
});

document.addEventListener('click', (e) => {
    if (!selectorCategoria.contains(e.target)) {
        selectorCategoria.classList.remove('active');
    }
});

selectOptions.forEach(option => {
  option.addEventListener('click', () => {
    select.innerText = option.innerText;
    formCategoryInput.value = option.innerText;
    selectorCategoria.classList.remove('active');
  });
});

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const category = item.innerText;
        filterTasksByCategory(category);
    });
});