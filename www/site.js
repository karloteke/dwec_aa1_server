function addNewSiteToCategory() {
  //urlSearchParams -> http://127.0.0.1:8080/addNewSite.html?categoryId=20 entonces categoryId=20
  const categoryId = new URLSearchParams(window.location.search).get('categoryId');

  let siteName = document.getElementsByName("name")[0].value;
  let siteURL = document.getElementsByName("url")[0].value;
  let userName = document.getElementsByName("user")[0].value;
  let password = document.getElementsByName("password")[0].value;
  let description = document.getElementsByName("description")[0].value;

  const data = {
    name: siteName,
    url: siteURL,
    user: userName,
    password: password,
    description: description
  };

  const apiUrl = `http://localhost:3000/categories/${categoryId}`; 

  // Cabecera de la petición
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar el sitio');
      }
      return response.json();
    })
    .then(data => {
      console.log('Sitio añadido:', data);
      window.location = "/index.html";
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

    function resetForm(){
      document.login.reset();
    }

  //Funcion para habilitar y deshabilitar el botón de guardar
  function checkFields() {
    const nameInput = document.forms['login'].elements['name'].value;
    const userInput = document.forms['login'].elements['user'].value;
    const passwordInput = document.forms['login'].elements['password'].value;

    if(nameInput != "" && userInput != "" && passwordInput != ""){
        document.login.save.disabled = false;
    }else{
        document.login.save.disabled = true;
    }
  }  
   
  function deleteBtn(idSite, idCategory) {
    console.log('delete, id: ', idSite);
    openModalConfirmation();
    waitForModalConfirmation().then(shouldDelete => {
      if (!shouldDelete) {
        closeModalConfirmation();
        return;
      }

      const apiUrl = `http://localhost:3000/sites/${idSite}`;
  
      // Cabecera petición
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error en la petición`);
          }
          return Promise.resolve();
        })
        .then(() => { // Después de eliminar, volver a cargar los sitios
          fetch("http://localhost:3000/sites")
            .then(res => res.json())
            .then(data => {
              showCategorySites(idCategory);
              closeModalConfirmation(); // Cerrar el modal después de actualizar la lista
            })
            .catch(error => {
              console.error('Error al cargar categorías:', error);
            });
        })
        .catch(error => {
          console.error('Error en la petición:', error);
        });
    });
  }
