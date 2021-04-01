# -PRO-Api_template_MEN
Ce projet est un template D'Api utilsant les technologies MongoDb / Mongoose / Express.js / Node.js

---
# Les outils que contient ce template 

Ce template possede :

- Un systeme de Logs
- Un systeme de Middleware avec protection JWT

---
# Comment l'utiliser ?

Il vous suffit d'installer les dependances avec votre package manager :

`npm install` Ou `yarn install`

ensuite il va falloir au minimum que vous configuriez le lien vers votre base de données MongoDb dans le fichier :
`./config/default.json`

Bonne nouvelle ! Tout est pret a etre lancer.

Pour cela : 

`npm run start` ou  `yarn start`

# Verifier que tout fonctionne ?

Nous allons essayer de ping le serveur pour voir si il est bien lancer.
Par defaut, le serveur est lancer sur le port 8080. Vous pouvez le modifier dans le fichier ./config/default.json

Une fois le serveur lancer, cliquer sur ce lien :
[Ping](https://localhost:8080/ping)

Cela devrait vous affichez `pong`
# Auteur

Antoine Famibelle (antoine.famibelle@epitech.eu)
