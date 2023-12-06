
// ---Add board button
addBoardBtn();
function addBoardBtn() {
    let addBoard = document.querySelector('.add_board');
    addBoard.addEventListener('click', createForm);

    // ----craete board input field ------
    let container_main = document.querySelector('.container');
    function createForm() {
        let div_board = document.createElement('div');
        div_board.classList.add('board');
        let div = document.createElement('div');
        div.classList.add('add_board');
        let form = document.createElement('div');
        form.classList.add('custom-input');
        div.innerHTML = `<input type="text" class="custom-input-value" id="boardName" placeholder="Enter Board Name">
        <div class="custom-input-foot">
         <button class="add_btn"type="submit">Add</button>
         <p class="close">X</p>
         </div>`;
        addBoard.remove();
        div.appendChild(form);
        div_board.appendChild(div);
        container_main.appendChild(div_board);

        // -------------init element of delete and add buttons-------------
        addBoardNameBtn();
        boardName();
        deleteBoard();
        deleteCard();
        closeForm();
    }
}


function addBoardNameBtn() {
    let add_btns = document.querySelectorAll('.add_btn');
    add_btns.forEach((ele, idx) => {
        add_btns[idx].addEventListener('click', submitForm)
    });

    function submitForm() {
        setTimeout(createNewBoard(), 2000);
        addingForm();
        deleteBoard();
        deleteCard();
        closeForm();
    }
}
addBoardNameBtn();

// --------------Add board---------------------------
let countCard = 0;
let container = document.querySelector('.container');
function createNewBoard() {
    let board = document.createElement('div');
    board.classList.add('board');
    let boardin = document.createElement('div');
    boardin.classList.add('board-in');
    let addBoard_ele = document.querySelector('.add_board');
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    div.classList.add('board-head');
    div.innerHTML = `<p class="board-card-title">${enteredBoardName} <span class="count">0</span></p>
                              <div class="board-more-btn">...
                              <button class="delete-btn board_delete_btn">Delete Board</button>
                              </div>     
                              `;
    addBoard_ele.parentElement.remove();
    div1.classList.add('custom-input');
    div1.innerHTML = `<div class="board-add-card">+ Add Card</div>
`;
    boardin.appendChild(div);
    boardin.appendChild(div1);
    board.appendChild(boardin);
    container.appendChild(board);
    closeForm();
    addBoard_button();
    addCard_btn();
    addingForm();
};

//-----------------------Adding cards------------------------


function addCard_btn() {
    let addCardsButns = document.querySelectorAll('.addBtn_cards');
    addCardsButns.forEach((addBtn) => {
        addBtn.addEventListener('click', (e) => {
            createNewCard(e.target.parentElement.parentElement.parentElement.parentElement.parentElement);
            addBtn.parentElement.parentElement.remove();
        })
    })
}

// ---------------Created Card---------------------

function createNewCard(ele) {
    let div = document.createElement('div');
    div.classList.add('board-card');
    div.setAttribute("ondrop", "drop(event)");
    div.setAttribute("ondragover", "allowDrop(event)");

    div.innerHTML =
        `
    <div class="card" draggable="true" ondragstart="drag(event)" id="card_${getRandomID(100, 999)}" >
    <div class="card-top">
        <div class="card-top-labels" ><label style="background-color: rgb(207, 97, 161);"></label>
        </div>
        <div class="card-top-more">...
        <button class="delete-btn card_delete_btn">Delete Card</button>
        </div>
    </div>
    <div class="card-title">${enteredCardName}</div>
    <div>
        <p title="Task1 Detail Description"><span class="material-symbols-outlined">
                format_list_bulleted
            </span></p>
    </div>
    <div class="card-footer">
        <p class="card-footer-item"></p>
        <p class="card-footer-item"></p>
    </div> 
`;
  
    if (ele.classList.contains('board')) {
        let div1 = document.createElement('div');
        div1.classList.add('custom-input');
        div1.innerHTML = `<div class="board-add-card">+ Add Card</div>`;
        div.appendChild(div1);
        ele.children[0].appendChild(div);
        
    } else {
        ele.appendChild(div);
       
    }
    addingForm();
    more_icon();
    deleteCard();
    closeForm();
    updateNoOfCards();
    popupDashboardDataUpdate();
    
};



// ----------------create new board/card inputs updates-----------------
//------------------ This is for input fields ---------------------------


let enteredBoardName;
function boardName() {
    let inText = document.querySelectorAll('.custom-input-value');
    inText.forEach((ele, idx) => {
        ele.addEventListener('keyup', debounce(function () {
            enteredBoardName = ele.value;
        }, 1000));
    });
}

let enteredCardName;
function cardName() {
    let inText = document.querySelectorAll('.cardName');
    inText.forEach((ele, idx) => {
        ele.addEventListener('keyup', debounce(function () {
            enteredCardName = ele.value;
        }, 1000));
    });
}
const debounce = (func, delay) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay);
    }
}

// ---------------on clk on Add-------------------------
let add_btns = document.querySelectorAll('.add_btn');

// ==>
// --------------------Add Card------------------------

function addingForm() {
    let addCard_btn = document.querySelectorAll(".board-add-card")
    addCard_btn.forEach((card) => {
        card.addEventListener('click', adding);
    });
}

addingForm();

function adding(e) {

    e.target.parentElement.innerHTML = `<div class="custom-input">
    <input type="text" class="cardName" placeholder="Enter Card Name ">
    <div class="custom-input-foot">
      <button type="submit" class="addBtn_cards">Add</button>
            <p class="close">X</p>
       </div>
    </div>`;
    addCard_btn();
    cardName();
    closeForm();
    deleteBoard();
    deleteCard();
    delete_iconClick();
}

function closeForm() {
    closeCards = document.querySelectorAll('.close')
    closeCards.forEach((card, idx) => {
        closeCards[idx].addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.innerHTML = `<p class="board-add-card">+ Add Card</p>`;
            addCard_btn = document.querySelectorAll(".custom-input .board-add-card")
            addingForm();
        });
    });
}



//------------------------Delete btn on click Board Showing delete btn---------------------------------
function delete_iconClick() {
    let delete_boards_menu = document.querySelectorAll('.board-more-btn');
    delete_boards_menu.forEach((delete_btn) => {
        delete_btn.addEventListener('click', (event) => {
            event.stopPropagation();
            delete_btn.children[0].style.display = 'block';
            deleteBoard();
            let boards = document.querySelectorAll('.board');
            boards.forEach((board) => {
                board.addEventListener('click', (event) => {
                    event.stopPropagation();
                    delete_btn.children[0].style.display = 'none';
                });
            });
        })


    });
}
delete_iconClick();


function deleteBoard() {
    let deleteBoard_btns = document.querySelectorAll('.board_delete_btn');
    deleteBoard_btns.forEach((ele, idx) => {
        deleteBoard_btns[idx].addEventListener('click', (event) => {
            event.stopPropagation();
            deleteBoard_btns[idx].parentElement.parentElement.parentElement.parentElement.remove();

        })
    })
}
//--------------------Delete cards----------------------------------
let delete_btns = document.querySelectorAll('.card-top-more');
delete_btns.forEach((delete_btn) => {
    delete_btn.addEventListener('click', () => {
        delete_btn.children[0].style.display = 'block';
        deleteCard();
    })
});

function deleteCard() {
    let deleteCard_btns = document.querySelectorAll('.card_delete_btn');
    deleteCard_btns.forEach((ele, idx) => {
        deleteCard_btns[idx].addEventListener('click', (event) => {
            event.stopPropagation();
            deleteCard_btns[idx].parentElement.parentElement.parentElement.remove();
        })
    })
}
//----------------------------Delete cards-------------------------------





// on mouse over
function more_icon() {
    let more_label = document.querySelectorAll('.card-top');
    let more = document.querySelectorAll('.card-top-more');

    more_label.forEach((btn, idx) => {
        btn.addEventListener('mouseenter', () => {
            more[idx].style.display = 'block';
        });
        btn.addEventListener('mouseleave', () => {
            more[idx].style.display = 'none';
        });
    });
}
more_icon();





//-=----------Update Card ------------
//fixed display

let title = document.querySelector('#title');
let desc = document.querySelector('.desc');
let date = document.querySelector('#date_board');
let label = document.querySelector('.label');
let date_update = document.querySelector('.date');
let task = document.querySelector('.task');

// card update
card_fixed_display();
let main = document.querySelector('.main');

function card_fixed_display() {
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener('click', onCardClick);

    })
}
let card_id;
function onCardClick(event) {
    if (event.target.classList == 'card') {
        main.style.display = "block";
        card_id = event.target.id;
        // console.log(event.target.id);
        //label
        title.innerText = event.target.children[0].innerText;
        title.style.backgroundColor = event.target.children[0].children[0].children[0].style.backgroundColor;
        //title
        label.innerText = event.target.children[1].innerText;
        //date
        date.value = event.target.children[2].value;
        //desc
        date_update.innerText = event.target.children[3].children[0].innerText;
    }
}
// popupDashboardDataUpdate();
function popupDashboardDataUpdate() {
    let title = document.querySelector('#title');
    let desc = document.querySelector('.desc');
    let date = document.querySelector('#date_board');
    let label = document.querySelector('.label');
    let date_update = document.querySelector('.date');
    let task = document.querySelector('.task');
    localStorage.setItem("card_id", card_id);
    localStorage.setItem(card_id + "_title", title.innerText);
    localStorage.setItem(card_id + "_desc", desc.innerText);
    localStorage.setItem(card_id + "_date", date.value);
    localStorage.setItem(card_id + "_label", label.innerText);
    localStorage.setItem(card_id + "_bgcolor", title.style.backgroundColor);

    let id = localStorage.getItem("card_id");
    let card = document.querySelector('#' +id);
    // console.log(card.innerText);
    card.children[0].children[0].children[0].innerText = localStorage.getItem(id + "_title");
    card.children[0].children[0].children[0].style.backgroundColor = localStorage.getItem(id + "_bgcolor");
    card.children[1].innerText = localStorage.getItem(id + "_card");
    card.children[2].innerText = localStorage.getItem(id + "_desc");
    card.children[3].innerText = localStorage.getItem(id + "_date");
    localStorage.clear();
}
main.addEventListener('click', (event) => {

    event.stopPropagation();
    if (event.target.classList.contains('fixed_cont')) {
        main.style.display = "none";
        popupDashboardDataUpdate();
    }
});

// update clolor labels
function updateLabelColor() {
    let colorLabels = document.querySelectorAll('li');
    colorLabels.forEach((label, idx) => {
        label.addEventListener('click', (eve) => {
            eve.stopPropagation();
            title.style.backgroundColor = colorLabels[idx].style.backgroundColor;

            if (colorLabels[idx].style.boxShadow == 'none' && colorLabels[idx].style.border == 'none') {
                colorLabels[idx].style.boxShadow = '5px 5px 5px #567876';
                colorLabels[idx].style.border = '2px solid #000000';
            }

            // console.log( colorLabels[idx].style.boxShadow, colorLabels[idx].style.border);   
        });

    })
}
updateLabelColor();

// -------------------drag and drop-----------------
function allowDrop(ev) {
    ev.stopPropagation();
    ev.preventDefault();
}

function drag(ev) {
    ev.stopPropagation();
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    if (ev.target.classList.contains("board-card")) {
        ev.stopPropagation();
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        updateNoOfCards();
    }

}

//------------ Add New Board --------------------

function addBoard_button() {
    let container = document.querySelector('.container');
    let div_board = document.createElement("div");
    div_board.classList.add("board");
    div_board.classList.add("add_board");
    div_board.innerHTML = `<div class="add_board_btn">
                       <p>Add Board</p>`;
    container.appendChild(div_board);
    addBoardBtn();
    closeForm();
    card_fixed_display();
}
// addBoard_button();
// --------------count card and update------------------

updateNoOfCards();
function updateNoOfCards() {
    let counts = document.querySelectorAll('.count');
    let board_cards = document.querySelectorAll('.board-card');
    board_cards.forEach((board, idx) => {
        counts[idx].innerText = board.children.length - 1;
    })
}


// ------------Random Methods-------------------------------

function getRandomID(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
