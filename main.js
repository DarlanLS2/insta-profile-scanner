const { chromium } = require('playwright');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require("fs")
const FileManager = require("./src/scripts/FileManager");


// TODO: Refatorar e modularizar
(async () => {
  try {

    // Pega o WebSocket da instância Chromium aberta
    const res = await fetch('http://127.0.0.1:9222/json/version');
    const data = await res.json();
    const wsUrl = data.webSocketDebuggerUrl;
    console.log('Conectando a:', wsUrl);

    // Conecta ao Chromium já aberto
    const browser = await chromium.connectOverCDP(wsUrl);

    // Lista os contextos disponíveis
    const contexts = browser.contexts();
    console.log(`Contextos encontrados: ${contexts.length}`);

    if (contexts.length === 0) {
      console.error('Nenhum contexto encontrado.');
      return;
    }

    // Usa a primeira aba existente
    const pages = contexts[0].pages();
    console.log(`Páginas encontradas: ${pages.length}`);

    if (pages.length === 0) {
      console.error('Nenhuma aba/página aberta foi encontrada.');
      return;
    }

    const page = pages[0];

    let userName = await page.textContent('span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft')
    const fileManager = new FileManager(userName)

    await page.route('**/api/v1/friendships/**/followers/**', async (route, request) => {
      const originalUrl = request.url();

      // Modifica o parâmetro `count` de 12 para 50
      const newUrl = new URL(originalUrl);
      newUrl.searchParams.set('count', '50');

      //console.log('Headers da requisição:', request.headers());
      // Reenvia a requisição com a URL modificada
      await route.continue({ url: newUrl.toString() });
    });

    page.on('response', async response => {
      if (response.url().includes('/followers/')) {
        console.log('Resposta capturada:', response.url());
        const headers = response.headers();
        //console.log('Headers:', headers);

        const data = await response.json();
        fileManager.addUsers(data.users)
      }
    });   

  } catch (err) {
    console.error('Erro:', err);
  }
})();
