## Compilation:
  docker-compose build =>
  - server: lancer le server sur le port 8080.
  - client web: lancer le client web sur le port 8081.
  - client mobile: pas de port pour le client mobile.
  - client web: dependant du client mobile et server -> [https://docs.docker.com/compose/compose-file/#depends_on].

  docker-compose up =>
  - client mobile et client web partage un volume commun -> [https://docs.docker.com/compose/compose-file/#volume-configuration-reference].
  - client mobile va changer le binaire associé dans le volume en commun avec le client web.
  - server service lancer sur le port 8080.
  - server service répond à la requête dans `about.json` (http://localhost:8080/about.json).
  - client web service lancer sur le port 8081.
  - client web service répond à la requête (http://localhost:8081/client.apk). 

## But du Projet:
  - Créer une plateforme d'Action REActions similaire à IFTTT [https://ifttt.com/] ou Zapier [https://zapier.com/].
  - Créer un serveur qui va implémenter des features (voir en-dessous).
  - Créer un client web qui va utiliser le serveur depuis notre PC.
  - Créer un client mobile qui va utiliser le serveur depuis notre Téléphone.

## Features:
  User management:
  - Création d'un utilisateur, gérer par un module (user management).
  - Être créatif lors de la création de compte (nom d'utilisateur, nom, prénom, email, mot de passe, ...).
  - Possibilité de s'inscrire à l'aide d'authentification double (Facebook, Gmail, Twitter, ...).

  Authentification / Identification:
  - Authentification => via Nom d'utilisateur + Mot de passe.
  - Identification   => via Oauth2.

## Services:
  - L'application web devra interconnecter les services entre eux.
  - L'utilisateur connecté à la plateforme doit s'inscrire aux services sur lesquels il veut créer son Action - REAction.
  - Avant de pouvoir créer son AREA, le serveur doit s'assurer que le client est bien connecté aux services.
  (ex: Intra Epitech, Instagram, Twitter, OneDrive, Outlook 365, ...)

# Action - REAction:
  Instagram / Outlook 365
  - Action (Instagram): Une personne like l'un de mes posts sur Instagram.
  - Reaction (Outlook): L'utilisateur reçoit un email comme quoi l'un de ses posts a été liké.
  ...

## Work group:
  - Nombre de services: doit être supérieur ou égale au nombre de personne dans le groupe + 1.
  - Nombre d'AREA: le nombre d'actions + le nombre de reactions doivent être supérieur au nombre de personne dans le groupe * 3.
  > NBS (nombre de services)                           >= 6
  > NBA (nombre d'actions) + NBR (nombre de reactions) >= 15

## Trigger:
  - Ce qui relie l'Action de la Reaction (API gateway dans notre cas).
