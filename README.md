# OAB Fusion Enhancer

## Raison d'être et fonctionnalités

Cette extension est destinée aux utilisateurs de Oracle Fusion et en particulier (pour le moment) des Timesheets pour leur faciliter la tâche de saisie des temps.
L'extension n'est pour le moment pas publiée sur un store, elle doit être installée manuellement, voir la section suivante.

0.1.0:
- extension de la largeur de la table de saisie des temps permettant de lire les codes projets sélectionnés


## Installation

Télécharger le fichier zip :
https://github.com/macmorning/oab-fusion-plus/blob/master/dist/oab-fusion-plus.zip

Le décompresser dans un répertoire local.

Sous Firefox, accéder à la page "about:debugging", cliquer sur "This Firefox", puis sur "Load Temporary Add-on...". Dans la fenêtre qui s'ouvre, naviguer jusqu'au répertoire décompressé, sélectionner manifest.json, puis cliquer sur "ouvrir".

Sous Chrome/ium, accéder à la page "chrome://extensions", activer le "mode développeur" (toggle en haut à droite) et cliquer sur "Charger l'extension non empaquetée". Dans la fenêtre qui s'ouvre, naviguer jusqu'au répertoire décompressé, puis cliquer sur "sélectionner un dossier".

L'extension doit alors être activée. Rendez-vous sur une "timesheet" dans Fusion, et vérifiez que la table occupe bien toute la largeur disponible.

