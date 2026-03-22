import { supabase } from './supabase.js';

document.getElementById("btnLogin").addEventListener("click", async () => {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!usuario || !senha) {
    alert("Digite usuário e senha");
    return;
  }

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', usuario)
    .eq('senha_hash', senha)
    .single();

  if (error || !data) {
    alert("Usuário ou senha incorretos");
    return;
  }

  localStorage.setItem("usuario", JSON.stringify(data));
  window.location.href = "menu.html";
});