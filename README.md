# LIONOIL [name tbc]
-------

## Commodore[s] 64s
-------


### Table of Contents

- [Introduction](#introduction)
- [UX](#ux)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)


### Introduction

Hello? 
-------

Is it retro-game you’re lookin’ for? LIONOIL [name TBC] is a platform game with a 180 degree twist. Inspired by the classic platform games and [Lionel Richie's Dancing On The Ceiling ](https://m.youtube.com/watch?v=xgT8uwDGLWk)and [TENET](https://www.themoviedb.org/movie/577922-tenet).


The Game
--------

Lionel Richtea is happy living his best life. It’s party time all the time in the Richtea household. You can dance to the funk, you can even dunk if you want to. 

But wait a second… something isn’t right, Lionel is stuck in a twisty turning time tunnel and the only way out is to keep dancing all night long. 

### UX

#### Potential Users
* People looking for something fun to do in their free time
* Adults or children alike can play as it isn't overly complicated
* Lionel Richie fans can play as him in a fun setting and enjoy the different cultural components to the game
* Competitive side is appealed to through use of leaderboard and scores

The website will appeal to these users through:
* A quick start
* Clear instructions
* Fun theme inspired by Lionel Richie and other 80's icons
* Well-thought out UX that helps users play game

#### User Stories

##### First Time Visitor Goals
* As a first time visitor, I want to understand the main purpose of site
* As a first time visitor, I want to know where the game's instructions are on the site
* As a first time visitor, I want to be excited by the visuals and eager to start playing

##### Returning Visitor Goals
* As a returning visitor, I want to view the leaderboard and logged scores

##### Frequent Visitor Goals
* As a frequent visitor, I want to see if anyone has beat my score since I last played

#### Design

The design of that game is inspired by the classic 8-bit platform games of the 1980s. Although much of the original framework is Mario (using Kaboom). The tone and playful tweaks have more in line with the UK 'bedroom coders' such as Codemasters using platforms for use on the Sinclair Spectrum and the Commodore 64.

The twist of the game is that the screen orientation changes which disorientates the user. The perfect hero character is 1980s singer and ceiling-dancer Lionel Richie.

Other design touchpoints are inspired by Lionel Richie's early back catalogue and the meme's of "Lionel Richtea" and Richie's massive clay head in hello.

![mug](https://user-images.githubusercontent.com/566086/128713101-c2f8f8ce-8743-41b9-9632-a6e01af90935.jpg)
![cover](https://user-images.githubusercontent.com/566086/128713137-0ae472ff-9d89-4df6-b4de-a13ee7641c26.jpeg)

#### Wireframes
[Link to wireframes is here](static/css/images/wireframes)


### Features

* Jump!
  - You can jump in this game, but not any normal jumping, you can defy gravity because in Discoland nothing makes any sense!
* Rotation Rotation Rotation!
  - It might look like just a bunch of blocks on screen but no! Some of these blocks rotate the whole world and make everything way harder and more annoying! 
* Music!
  - 8-bit lionel (stolen from youtube) accompanies you on your quest, every time the world turns the pitch and speed gets higher. Soon you will grow to hate the tune as much as we did!
* Highscores!
  - See if you can get a score higher than 3, bet you can’t, why? Because this game is a waste of your precious life minutes!
* Evil skulls!
  - They don’t move or hurt you! Totally useless!
* You have a big fat head!
  - Collect a platinum power up and your ego will inflate, you’ll jump higher AND the music slows down for dramatic effect! Sometimes the music doesn’t ever speed back up either because that particular piece of code is buggy as crap (nice one Liam)!


### Technologies Used

* [HTML5](https://en.wikipedia.org/wiki/HTML5)
* [CSS](https://en.wikipedia.org/wiki/CSS)
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [Kaboom.js](https://kaboomjs.com/)
* [Heroku](https://www.heroku.com/)
* [Python](https://www.python.org/psf-landing/)


### Testing

We made sure to test each part of the website to make sure it was functional for the everyday user
* The game runs with correct mechanics
* The sprites load into the game and one spawns in every level
* The map turns whenever user enters mug
* The nav bar works and goes to the different sections

### Deployment

Run this project locally.

Clone this project from GitHub:
* Under the repository name, click "Clone or download".
* In the Clone with HTTPs section, copy the clone URL for the repository.
* In your local IDE open Git Bash.
* Change the current working directory to the location where you want the cloned directory to be made.
* Type git clone, and then paste the URL you copied in Step 3.
* Press Enter. Your local clone will be created.

Next you will need to install all the projects dependencies type - (pip install -r requirements.txt).

If you add any new packages to the project use - (pip freeze --local > requirements.txt) to update the requirements.txt file with new dependencies.

Environment Variables:
* In your local IDE you can create an env.py file to store the MONGO_DBNAME, MONGO_URI & SECRET_KEY variables.
* Add the following code to your env.py and insert your applicable variables.

`import os
os.environ["SECRET_KEY"] = "Your secret key"
os.environ["MONGO_URI"] = "Your mongo_uri"`

This website was deployed using Heroku following steps below:
* Create a new app in Heroku.
* In the settings tab, set the following config vars.
MONGO_URI = "Your mongo_uri"
MONGO_DBNAME= "Your mongo db name"
PORT = 5000
IP = 0.0.0.0
* From the heroku dashboard of your application, click on "Deploy" > "Deployment method" and select GitHub.
* Connect to the appropriate GitHub repository.
* If you set the project up for automatic deploys it will deploy once the master branch is updated.
* OR in the manual deployment section, select the master branch and click 'Deploy Branch".
* The site should be successfully deployed

### Credits

* We would like to thank our amazing mentor Séan Murphy who supported us throughout the event 🥳 Thank you for helping us have a great time!
* We also want to thank Code Institute for putting on such a fun Hackathon!
