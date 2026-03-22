const usuario = localStorage.getItem("usuario");

if (!usuario) {
  // não está logado → volta pro login
  window.location.href = "login.html";
} else {
  // opcional: usar dados do usuário
  const dados = JSON.parse(usuario);

  console.log("Usuário logado:", dados.nome);
}