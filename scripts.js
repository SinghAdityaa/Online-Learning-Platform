const form = document.getElementById('user-registration-form');

form.addEventListener('submit', (e) => {
  e.preventDefault()
  form.checkValidity()
  form.reportValidity()


  window.location = "/Online-Learning-Platform/main.html" 
  
}
)
