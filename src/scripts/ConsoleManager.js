import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export class ConsoleManager {
  constructor() {
    this.rl = readline.createInterface({input, output})
  }

  async input(question) {
    return await this.rl.question(question)
  }

  static printStepByStep() {
    console.log("")
    console.log(" ---- PASSO A PASSO ----")
    console.log("   1. Aperte nos seguidores")
    console.log("   2. Scrole até o ultimo seguidor")
    console.log("   3. Volte aqui e aperte Ctrl+c para parar o script")
  }

  static printLogsHeader() {
    console.log("")
    console.log(" ---- LOGS ----")
  }

  static printCapturedResponse(response) {
    console.log("Resposta capturada: ", response)
  }

  static printProfilesOptions(profiles) {
    let count = 1

    console.log("")
    console.log(` =========================================`);
    console.log(`            Seletor de Perfis           `);
    console.log(` =========================================`);
    console.log(" Perfis disponiveis:")
    profiles.forEach(profile => {
      console.log(`  (${count}) ${profile}`)
      count ++
    })
    console.log()
  }
  static printMutualFollowers(obj) {
    let count = 1;

    console.log(" ======================================");
    console.log("           PERFIS SELECIONADOS         ");
    console.log(" ======================================");
    console.log(`  Perfil 1: ${obj.firstProfile}`);
    console.log(`  Perfil 2: ${obj.secondProfile}`);
    console.log();
    console.log(" SEGUIDORES EM COMUM:");
    console.log(" --------------------------------------");
    obj.mutualFollowers.forEach(follower => {
      console.log(` ${count}. ${follower}`)
      count ++
    })
    console.log();
  }
}
