import { FileManager } from "./FileManager.js"
import { WebSocket } from "./WebSocket.js";
import { ConsoleManager } from "./ConsoleManager.js";
import { chromium } from "playwright-core";

// Sim precisa ser instanciado aqui
const wb = new WebSocket();

(async () => {
  try {
    const webSocketUrl = await wb.getUrl()
    const browser = await chromium.connectOverCDP(webSocketUrl);
    const contexts = browser.contexts();
    const pages = contexts[0].pages();
    const page = pages[0];
    const userName = await page.textContent('span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft')
    const fileManager = new FileManager(userName)

    ConsoleManager.printStepByStep()
  
    // Modifica requisição aumentando o numero de seguidores retornados
    await page.route('**/api/v1/friendships/**/followers/**', async (route, request) => {
      const originalUrl = request.url();
      const newUrl = new URL(originalUrl);

      // Modifica o parâmetro `count` de 12 para 50
      newUrl.searchParams.set('count', '50');

      // Reenvia a requisição com a URL modificada
      await route.continue({ url: newUrl.toString() });
    });

    ConsoleManager.printLogsHeader()

    // Espera resposta da requisição e concatena tudo em um json na pasta logs
    page.on('response', async response => {
      if (response.url().includes('/followers/')) {
        const data = await response.json();

        // Concatena cada json dos users em um novo json
        fileManager.addUsers(data.users)
        ConsoleManager.printCapturedResponse(response.url())
      }
    });
  } catch (err) {
    console.error('Erro:', err);
  }
})();
