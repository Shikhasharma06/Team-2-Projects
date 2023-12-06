//---------------------- on click go toyour dashboard -------------
let goToyourDashboard =document.querySelector('.build_board');
goToyourDashboard.addEventListener('click',(event)=>{
    goToyourDashboard.remove();
   let div = document.createElement('div');
   div.classList.add('cont_btns');
    let button = document.createElement('button');
    let a = document.createElement('a');
    a.setAttribute("href","./dashboard.html");
    button.classList.add('btn');
    button.innerText="Projects"
    let parent = document.querySelector('.leftFormContent');
    let in_data=document.createElement('input');
    in_data.classList.add('email');
    in_data.setAttribute('type','email');
    in_data.setAttribute('placeholder','Enter email address');
    in_data.setAttribute("pattern","[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$");
    in_data.required=true;
    a.appendChild(button);
    div.appendChild(in_data);
    div.appendChild(a);
    parent.appendChild(div);
})
