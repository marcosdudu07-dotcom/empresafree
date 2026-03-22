const DB_NAME = "sistema_offline";
const DB_VERSION = 1;

function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("clientes")) {
        db.createObjectStore("clientes", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("fornecedor")) {
        db.createObjectStore("fornecedor", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("produtos")) {
        db.createObjectStore("produtos", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("financeiro")) {
        db.createObjectStore("financeiro", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("vendas")) {
        db.createObjectStore("vendas", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("venda_itens")) {
        db.createObjectStore("venda_itens", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("fila_sync")) {
        db.createObjectStore("fila_sync", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("config")) {
        db.createObjectStore("config", { keyPath: "chave" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}