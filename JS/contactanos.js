const validarFormulario = (idFormulario) => {
    const listaCampos = document.querySelectorAll(`#${idFormulario} [data-validate]`);
    let validacion = true;
  
    if (listaCampos.length > 0) {
      listaCampos.forEach(elemento => {
        const tipoElemento = elemento.getAttribute("type");
        //validamos campos con value
        if (elemento.value === "") {
          validacion = false;
          elemento.style.setProperty("border", "1px solid red");
          setTimeout(() => {
            elemento.style.setProperty("border", "");
          }, 2000);
        }
  
        //validamos campos tipo checkbox
        if (tipoElemento === "checkbox" && !elemento.checked) {
          validacion = false;
          elemento.style.setProperty("border", "1px solid red");
          setTimeout(() => {
            elemento.style.setProperty("border", "");
          }, 2000);
        }
  
        //validamos campos tipo radio
        if (tipoElemento === "radio") {
          const name = elemento.getAttribute("name");
          const inputsRadio = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
          let checked = false;
  
          inputsRadio.forEach(radio => {
            if (radio.checked) {
              checked = true;
            }
          });
  
          if (!checked) {
  
            let elementocheck = document.querySelector(".chequeo3");
            elementocheck.style.setProperty("border", "1px solid red");
                  setTimeout(() => {
                    elementocheck.style.setProperty("border", "");
                    }, 2000);
  
            validacion = false;
          }
        }
      })
    }
   return validacion;
  }
  
  const enviarFormulario = () => {
    //evitamos el evento por defecto del formulario
    event.preventDefault();
    //invocamos la funcion 
    if (!validarFormulario('formValidacion')) {
      //alert de aweet alert
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Error en la validacion: Faltan datos!!'
      })
    } else {
      alert("Validacion exitosa")
    }
  }