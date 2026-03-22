// Verifica se o usuário está logado e ajusta o nome na interface
const usuarioStr = localStorage.getItem("usuario");
let usuario = null;

try {
  usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
} catch(e) {
  usuario = null;
}

if (!usuario) {
  window.location.href = "login.html";
} else {
  const elNome = document.getElementById("nomeUsuario");
  if (elNome && usuario.nome) {
    elNome.innerText = usuario.nome;
  }
}

// Logout do usuário
window.logout = function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

// Abrir página do menu
window.abrir = function abrir(pagina) {
  window.location.href = pagina;
}

