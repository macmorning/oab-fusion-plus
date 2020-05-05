# Oracle Fusion Enhancer

## Raison d'être et fonctionnalités

Cette extension est destinée aux utilisateurs de Oracle Fusion et en particulier (pour le moment) des Timesheets pour leur faciliter la tâche de saisie des temps.
L'extension est publiée [sur le store Mozilla](https://addons.mozilla.org/en-US/firefox/addon/oracle-fusion-enhancer/) mais pas sur celui de Chrome pour lequel elle doit être installée manuellement, voir section suivante.

0.6.1:
- correction d'un bug qui écrasait parfois l'ordre des projets
0.5.0:
- une boîte de dialogue est accessible depuis un bouton situé au niveau de l'url, permet de trier les codes projets enregistrés, de leur ajouter une description, et de les copier dans le presse-papier
0.3.0:
- recherche des éléments à redimensionner par les classes des tables parentes plutôt que par des libellés
- stockage des codes projets dans le localStorage (en prévision de leur réutilisation dans une future version)
0.2.0:
- déclenchement du redimensionnement sur observation d'un évènement plutôt que sur un timeout
0.1.0:
- extension de la largeur de la table de saisie des temps permettant de lire les codes projets sélectionnés


## Installation

Télécharger le fichier zip :
https://github.com/macmorning/oab-fusion-plus/blob/master/dist/oab-fusion-plus.zip

Le décompresser dans un répertoire local.

Sous Chrome/ium, accéder à la page "chrome://extensions", activer le "mode développeur" (toggle en haut à droite) et cliquer sur "Charger l'extension non empaquetée". Dans la fenêtre qui s'ouvre, naviguer jusqu'au répertoire décompressé, puis cliquer sur "sélectionner un dossier".

L'extension doit alors être activée. Rendez-vous sur une "timesheet" dans Fusion, et vérifiez que la table occupe bien toute la largeur disponible.

