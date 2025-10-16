# insta-profile-scanner
## Passo a Passo para pegar os seguidores:
1. Abra o chromium no debuggin mode: 
```bash
# Porta padrão: 9222
chromium --remote-debugging-port=9222
```
2. Faça Login no seu instagram
3. Abra o perfil da pessoa que você quer pegar os seguidores
4. Rode na pasta do projeto: 
```bash
npm i
node followerScaner.js
```
5. Com o script rodando, volte ao navegador, abra os seguidores e scrole até o ultimo seguidor.

## Passo a Passo para pegar seguidores em comum entre dois perfis:
1. Rode no terminal: 
```bash
node mutualFollowers.js
```
2. Escolha 2 perfis para comparar

