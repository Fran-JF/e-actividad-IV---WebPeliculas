//!Funcion para el menu hamburguesa
addEventListener(`DOMContentLoaded`,()=>{
    const boton = document.querySelector(".boton")
    if(boton){
        boton.addEventListener(`click`, ()=>{
            const secciones = document.querySelector(".secciones")
            secciones.classList.toggle(`mostrar`)
        })
    }
})

