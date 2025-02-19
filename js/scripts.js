
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

const btnAddTask = document.querySelector("#btn-add-task button");
const addTaskDiv = document.querySelector("#add-task");
const addTaskFirstDiv = document.querySelector("#add-task-first");
const btnCalendar = document.querySelector('[name="btn-calendar"]');
const addTaskSecondDiv = document.querySelector("#add-task-second");


btnAddTask.addEventListener("click", (event) => {
    addTaskSecondDiv.classList.remove("overlay");
    addTaskSecondDiv.classList.add("hide");
    addTaskDiv.classList.remove("hide");
});

document.addEventListener("click", (event) => {
    if (!addTaskFirstDiv.contains(event.target) && !btnAddTask.contains(event.target)) {
        addTaskDiv.classList.add("hide");
    }
});

btnCalendar.addEventListener("click", (event) => {
        addTaskSecondDiv.classList.remove("hide");
        addTaskSecondDiv.classList.add("overlay");
        event.preventDefault();
});
