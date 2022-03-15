# Create your Dream Team

## Installation
1. Clone repo
```
git clone git@github.com:sreen020/Create-Dream-Team.git

cd Create-Dream-Team/
```

2. Setup env
```
Copy .env example

Rename this file to: ".env"

Add your database username and password to the "DB_URI"
```

2. Install packages
```
npm install
```

3. Start server
```
npm run watch
```

## live demo
https://create-dream-team.herokuapp.com/

## Concept
Uit ervaring kan ik vertellen dat het niet altijd makkelijk is om genoeg spelers te vinden voor elke voetbal wedstrijd. Maar wat kan je hier aan doen wanneer niemand uit jouw kring die dag kan komen?

Vanaf nu hebben we hier iets voor. De “Create your Dream Team” applicatie. Iedereen kan hier een account aanmaken wanneer zij bereid zijn om een keer een wedstrijdje mee te voetballen. Personen kunnen dan deze spelers vinden en toevoegen aan hun team. Deze spelers krijgen een uitnodiging of notificatie wanneer zij uitgenodigd zijn. Zo hoef je nooit meer met te weinig mensen op het veld te staan!

<img src="https://i.imgur.com/ejIqpkq.png" width="800">

## Users
Eigenlijk heb je 2 soorten gebruikers binnen deze applicatie:

Voetballers: Dit zijn de personen die een account aanmaken omdat zij het leuk vinden om te voetballen. Deze personen wachten op een uitnodiging van een team.
Teams: De teams maken een account om voetballers te “scouten”. Zij hebben spelers nodig voor hun team en nodigen ze uit via deze applicatie.

## API
Binnen deze applicatie is er gebruik gemaakt van meerdere soorten API’s. Zo zijn er web-api’s gebruikt en externe api’s. 

WEB API’s: Tijdens het programmeren van deze applicatie worden er meerdere kleine web-api’s gebruikt. Toch is er de focus gelegd op één specifieke. De drag and drop api. Deze wordt binnen de applicatie gebruikt om jouw toekomstige speler te slepen naar de positie waar jij deze persoon wilt zien spelen. Wanneer dit verandert moet worden kan je hem / haar gewoon weer oppakken en terug slepen.

Externe API’s: Als externe API hebben we gebruik gemaakt van een adres api. Hiermee kunnen we een adres valideren. Hierdoor komen er geen rare gegevens in de database te staan. Ook kunnen we de gebruiker zijn/haar postcode en huisnummer in laten voeren en vullen wij automatisch de straatnaam en stad in. Hierdoor weet de gebruiker dat hij dit goed heeft ingevuld en het scheelt hem tijd en moeite.


## Core-functionaliteiten
TODO

## Progressive enhancement 
TODO
