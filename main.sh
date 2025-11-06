#!/bin/bash
runFollowerScaner() {
  while true; do
    clear
    echo -en "\n Já esta com o ambiente configurado? (s/n) "
    read isOpen
    if [[ $isOpen == "s" ]]; then 
      clear
      node ./src/scripts/followerScaner.js
      break
    elif [[ $isOpen == "n" ]]; then 
      clear
      echo -e "\n Passo a Passo: "
      echo " 1. Crie uma instacia chromiun: "
      echo "   chromium --remote-debugging-port=9222"
      echo " 2. Faça login no seu instagram (caso não esteja logado)"
      echo " 3. Abra o perfil que você quiser pegar os seguidores"
      echo -e " 4. Rode o main.sh novamente\n"
      sleep 1s
      break
    else 
      echo -e "\n Opção invalida!!!"
      sleep 0.6s
      continue
    fi
  done
}

runMutualFollowers() {
  clear
  node ./src/scripts/mutualFollowers.js
}

while true; do
  clear
  echo -e "\n =================================="
  echo "    Bem vindo ao Profile Scaner"
  echo " =================================="

  sleep 0.3s

  echo " Opções disponiveis: "
  echo "   [1]Scanear seguidores"
  echo "   [2]Ver seguidores em comum"
  echo -en "\n -> Escolha [1-2]: "
  read escolha

  case $escolha in
    1)
      runFollowerScaner
      break
      ;;
    2)
      runMutualFollowers
      break
      ;;
    *)
      echo -e "\n Opção invalida!!"
      echo " Tente de novo..."
      sleep 0.5s
      continue
      ;;
  esac

done
