let main_input = document.getElementById('create_input');
let list = document.getElementById('main');
let modalContainer = document.getElementById('modal_container');
let lixeira = document.querySelector('.lixeira');
let btnLixeira = document.getElementById('btn_lixeira');
let main_container = document.querySelector('.main_container');
let span_lixeira_to_do = document.getElementById('span_lixeira_to_do');
let img_lixeira_to_do = document.getElementById('img_lixeira_to_do');
btnLixeira.addEventListener('click',() => {
    if (lixeira.style.display === 'none') {        
        span_lixeira_to_do.textContent = 'Acessar lista To Do'
        img_lixeira_to_do.src = 'img/list.png';
        main_container.style.display = 'none';
        lixeira.style.display = 'block';
    }
    else{
        span_lixeira_to_do.textContent = 'Acessar Lixeira'
        img_lixeira_to_do.src = 'img/trash.png';
        lixeira.style.display = 'none';
        main_container.style.display = 'block';
    }

});

main_input.addEventListener('keypress', (e) => {
    // console.log(e);
    if (e.code === 'Enter'){
        if (main_input.value){

            let div = document.createElement('div');
            div.classList.add('to_do');
            // div.classList.add(`value_${main_input.value.replace(' ', '_')}`);
            let txt = replaceText(main_input.value);
            div.classList.add(`value_${replaceText(txt)}`);
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.style.float = 'left';
            checkbox.style.marginLeft = '10rem';
            checkbox.style.marginTop = '1rem';
            let span = document.createElement('span');
            span.classList.add('form-control');
            span.classList.add('col-6');
            span.classList.add('item_of_list');
            span.style.marginLeft = '11rem';
            span.textContent = main_input.value;
            span.onclick = function(){
                spanSwitch(this);
            }
            
            div.append(checkbox);
            div.append(span);
            list.append(div);
            main_input.value = '';
            checked();
        }else{
            console.log('input vazio');
        }
    }
});

let valor_classe;

function spanSwitch(e){
    // console.warn(e);
    let txt = e.innerText;
    valor_classe = txt;
    let a = replaceText(txt);
    let element = document.querySelector(`.value_${a}`);
    element.innerHTML = `<input onblur='spanReset(this)' class="form-control col-6" value='${txt}' style="display:block; text-align:center; margin-left:11rem"/>`;

    // document.getElementsByTagName('input')[0].focus();
}

function spanReset(e){
    // console.warn(e);
    let txt = e.value;
    let b = replaceText(valor_classe);
    let element = document.querySelector(`.value_${b}`);
    element.innerHTML = `
                        <input type="checkbox" style="float:left;margin-left:10rem; margin-top:1rem;">
                        <span onclick='spanSwitch(this)' class="form-control col-6" style="margin-left:11rem"> ${txt} 
                        </span>`;    
    checked();
}

function replaceText(text){
    if (text){
        for(item of text){
            text = text.replace(' ', '_');
        }
    }
    return text;
}

function cancelarModal(){
    let modalContainer = document.getElementById('modal_container');
    modalContainer.style.display = 'none';
    let allCheckbox = document.querySelectorAll('input[type=checkbox]');
    if (allCheckbox){
        allCheckbox.forEach(item => {
            item.checked = true;
            item.classList.add('checkbox_checked');
        });
    }
}

function restaurarTarefa(span, classeDoPai){
    let class_ = replaceText(span);
    let test = `
    <div class="to_do value_${class_}">
        <input type="checkbox" style="float:left;margin-left:10rem; margin-top:1rem;">
        <span onclick='spanSwitch(this)' class="form-control col-6 " style="margin-left:11rem"> ${span} </span>
    </div>`;

    let pai = document.querySelector(`.${classeDoPai.split(' ')[1]}`);
    pai.remove();
    list.innerHTML += test;
    modalContainer.style.display = 'none';
    checked();
}

function checked(){
    let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

    allCheckboxes.forEach(item => {
        let clear;

        let span = item.parentNode.getElementsByTagName('span');

        
        item.onclick = function(){
            let span2 = `${span[0].textContent}`;
            let classeDoPai = `${span[0].parentNode.classList}`;
            // debugger;
            modalContainer.innerHTML = `
                <div class="modal" 
                style="
                    display:block;
                    background: #eeeeee;
                    width: 25rem; min-width: 250px;
                    height: 15rem;
                    padding:40px;
                    border: 5px solid #034971;
                    margin-top: 20%;
                    margin-left: 38%;
                ">
                    <h4 style="color:black;">Você deseja restaurar a tarefa ?</h1>
                    <br><br>
                    <button id="btn_restaurar" class="btn btn-primary" onclick="restaurarTarefa('${span2.trim()}','${classeDoPai}')">Restaurar tarefa</button>
                    <button id="btn_cancelar" class="btn btn-danger" onclick="cancelarModal()" style="float:right;">Retornar à Lixeira</button>
                </div>
            `
            


            clearTimeout(clear);
            // span[0].classList.remove('checkbox_checked');

            if (item.checked && main_container.style.display == 'block'){
                span[0].classList.add('checkbox_checked');
                let timer = setTimeout(() =>{
                    fadeOutAndDelete(item.parentNode, item);
                },500);
                clear = timer;
                return;                
            }
            if (!item.checked && main_container.style.display == 'none' && lixeira.style.display == 'block'){
                modalContainer.style.display = 'block';
               
            }
                
                // if (span[0].classList.contains('checkbox_checked') && lixeira.style.display == 'block'){
                //     // clearTimeout(clear);
                    
                //     // btnRestaur.addEventListener('click', () => {
                //     let class_ = replaceText(span[0].textContent);
                //     let test = `
                //     <div class="to_do value_${class_}">
                //         <input type="checkbox" style="float:left;margin-left:10rem; margin-top:1rem;">
                //         <span onclick='spanSwitch(this)' class="form-control col-6 " style="margin-left:11rem"> ${span[0].textContent} </span>
                //     </div>`
                //     span[0].parentNode.remove();
                //     list.innerHTML += test;
                //     modalContainer.style.display = 'none';
                //     // })
                   
                    
                    
                // }
                // return;
            
            
        }

        // clearTimeout(clear);
        // let span = item.parentNode.getElementsByTagName('span');

        // if (span[0].classList.contains('checkbox_checked') && lixeira.style.display == 'block'){
        //     // clearTimeout(clear);
            
        //     btnRestaur.addEventListener('click', () => {
        //         let class_ = replaceText(span[0].textContent);
        //         let test = `
        //         <div class="to_do value_${class_}">
        //             <input type="checkbox" style="float:left;margin-left:10rem; margin-top:1rem;">
        //             <span onclick='spanSwitch(this)' class="form-control col-6 " style="margin-left:11rem"> ${span[0].textContent} </span>
        //         </div>`
        //         span[0].parentNode.remove();
        //         list.innerHTML += test;
        //         modalContainer.style.display = 'none';
        //     })
           
            
            
        // }else{
        //     span[0].classList.add('checkbox_checked');
        //     let timer = setTimeout(() =>{
        //         fadeOutAndDelete(item.parentNode, item);
        //     },500);
        //     clear = timer;
        // }
    })
}

function fadeOutAndDelete(element, e){
    element.style.opacity = 1;
    let n = 0.5;
    
    if (lixeira.style.display == 'block'){
        modalContainer.style.display = 'block';
    }else{
        let timer = setInterval(() => {
            if (element.style.opacity < 0.1){
                clearInterval(timer);
                let parent =  document.getElementById('main');
                // parent.removeChild(e.parentNode);
                addTasksInTrash(e.parentNode);
                // e.parentNode.remove();
    
            }else{
                n += 0.8;
                element.style.marginLeft = `${n}rem`;
                element.style.opacity -= 0.3;
            }
    
        },300)
    }
    
}

function addTasksInTrash(task){
    let div = document.querySelector('#lista_tarefas');

    task.style.opacity = '1';
    task.style.marginLeft = '1rem';
    // let cBox = task.querySelector('input[type="checkbox"]');
    // cBox.checked = true;
    div.append(task);
}