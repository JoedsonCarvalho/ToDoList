let input = document.getElementById('main_input');

function myCheckchar(e, pattern){
    let char = e.key;

    if(char.match(pattern)){
        // console.log(char);
        return true;
    }
}

let exp = /[@#$%¨&*()"'ªº;+_-]/ig;
input.addEventListener('keypress', (e) => {
   if (myCheckchar(e, exp)) {
        alert('Não permitido digitar caracteres especiais.')
        e.preventDefault();
   }
});

