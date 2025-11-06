#!/bin/bash

showErrorInvalidOption() {
  echo -e "\n Opção invalida!!"
  echo " Tente de novo..."
  sleep 0.5s
}

runMutualFollowers() {
  clear
  node ./src/scripts/mutualFollowers.js
}

showHowPrepareEnviroment() {
  clear
  echo -e "\n Passo a Passo: "
  echo " 1. Crie uma instacia chromiun: "
  echo "   chromium --remote-debugging-port=9222"
  echo " 2. Faça login no seu instagram (caso não esteja logado)"
  echo " 3. Abra o perfil que você quiser pegar os seguidores"
  echo -e " 4. Rode o main.sh novamente\n"
  sleep 1s
}

runFollowerScanner() {
  clear
  node ./src/scripts/followerScaner.js
}

isEnviromentPrepared() {
  clear
  echo -en "\n Já esta com o ambiente configurado? (s/n) "
}

handleFollowersScannerMenu() {
  while true; do
    isEnviromentPrepared
    read isPrepared

    case $isPrepared in 
      "s")
        runFollowerScanner
        ;;
      "n")
        showHowPrepareEnviroment
        break
        ;;
      *)
        showErrorInvalidOption
        continue
        ;;
    esac
  done
}


showMainMenu() {
  clear
  echo -e "\n =================================="
  echo "    Bem vindo ao Profile Scanner"
  echo " =================================="
  sleep 0.3s
  echo " Opções disponiveis: "
  echo "   [1]Scanear seguidores"
  echo "   [2]Ver seguidores em comum"
  echo -en "\n -> Escolha [1-2]: "
}

handleMainMenu() {
  while true; do
    showMainMenu
    read choice

    case $choice in
      1)
        handleFollowersScannerMenu
        break
        ;;
      2)
        runMutualFollowers
        break
        ;;
      *)
        showErrorInvalidOption
        continue
        ;;
    esac
  done
}

main() {
  handleMainMenu
}

main
