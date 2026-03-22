// Lógica básica de sincronização para PWA offline
// Este arquivo pode ser expandido para lidar com a fila do IndexedDB quando a rede volta

window.addEventListener('online', () => {
  console.log('Conexão restabelecida. Sincronizando dados offline...');
  sincronizarFila();
});

window.addEventListener('offline', () => {
  console.log('Você está offline. As alterações serão salvas localmente e sincronizadas quando houver conexão.');
  // Opcional: mostrar um aviso visual (Toast) ao usuário
});

async function sincronizarFila() {
  if (typeof abrirDB !== 'function') return;
  
  try {
    const db = await abrirDB();
    const transaction = db.transaction("fila_sync", "readwrite");
    const store = transaction.objectStore("fila_sync");
    
    const countRequest = store.count();
    countRequest.onsuccess = function() {
      if (countRequest.result > 0) {
        console.log(`[Sync] ${countRequest.result} item(s) na fila para processar.`);
        // Aqui viria a lógica para ler a fila e enviar pro Supabase
      } else {
        console.log("[Sync] Nenhuma pendência na fila.");
      }
    };
  } catch (err) {
    console.error("[Sync] Erro ao tentar sincronizar fila:", err);
  }
}

// Chamar ao carregar a página principal caso estivesse offline antes e voltou com a aba aberta
if (navigator.onLine) {
  sincronizarFila();
}
