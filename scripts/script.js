const uno = document.querySelector('#uno');
const dos = document.querySelector('#dos');
const tres = document.querySelector('#tres');


const container1 = document.querySelector('.container1')
const container2 = document.querySelector('.container2')
const container3 = document.querySelector('.container3')
const imagem = document.querySelector(".container1 img")


uno.addEventListener('click', () => {
    console.log("clicou no container1");
    container1.style.left = "0"
    container2.style.left = "-1200vw"
    container3.style.left = "-1200vw"
});

dos.addEventListener('click', () => {
    console.log("clicou no container2");
    container1.style.left = "-1200vw"
    container2.style.left = "0"
    container3.style.left = "-1200vw"
});

tres.addEventListener('click', () => {
    console.log("clicou no container3");
    container1.style.left = "-1200vw"
    container2.style.left = "-1200vw"
    container3.style.left = "0"
    });