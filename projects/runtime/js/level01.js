var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "stump", "x": 400, "y": groundY - 10},
                { "type": "stump", "x": 1100, "y": groundY - 10},

                { "type": "log", "x": 800, "y": groundY - 10},

                { "type": "knees", "x": 1600, "y": groundY - 35},
                { "type": "knees", "x": 2500, "y": groundY - 35},

                { "type": "gator", "x": 1600, "y": groundY - 10},
                { "type": "gator", "x": 3600, "y": groundY - 10},

                { "type": "snake", "x": 1400, "y": groundY - 60},
                { "type": "snake", "x": 1800, "y": groundY - 60},
                { "type": "snake", "x": 2200, "y": groundY - 60},
                { "type": "snake", "x": 3200, "y": groundY - 60},

                { "type": "g-turtle", "x": 700, "y": groundY - 25},
                { "type": "g-turtle", "x": 2200, "y": groundY - 25},
                { "type": "g-turtle", "x": 4200, "y": groundY - 25},

                { "type": "bug", "x": 1000, "y": groundY - 150},
                { "type": "bug", "x": 3550, "y": groundY - 150},

                { "type": "rougarou", "x": 8500, "y": groundY - 50},

                { "type": "egret", "x": 1000, "y": groundY - 150},
                { "type": "egret", "x": 1400, "y": groundY - 150},

                { "type": "duck", "x": 550, "y": groundY - 150},
                { "type": "duck", "x": 1900, "y": groundY - 150},
                { "type": "duck", "x": 3900, "y": groundY - 150},

                { "type": "otter", "x": 2500, "y": groundY - 0},
                { "type": "otter", "x": 3500, "y": groundY - 0},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createStump (x, y) {
            var hitZoneSize = 25; //size
            var damageFromObstacle = 15; //damage
            var stumpHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            stumpHitZone.x = x; //x-value of hitzone
            stumpHitZone.y = y; //y-value of hitzone
            game.addGameItem(stumpHitZone); //adds hitzone to game

            var obstacleImage = draw.bitmap('img/stump(3).png'); //draws & stores image
            stumpHitZone.addChild(obstacleImage); //adds image to hitzone
            obstacleImage.x = -165; //lines image x up with hitzone x
            obstacleImage.y = -170; ///lines image y up with hitzone y 
        }

        function createLog (x, y) {
            var hitZoneSize = 25; //size
            var damageFromObstacle = 25; //damage
            var logHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            logHitZone.x = x; //x-value of hitzone
            logHitZone.y = y; //y-value of hitzone
            game.addGameItem(logHitZone); //adds hitzone to game

            var obstacleImage = draw.bitmap('img/log.png'); //draws & stores image
            logHitZone.addChild(obstacleImage); //adds image to hitzone
            obstacleImage.x = -165; //lines image x up with hitzone x
            obstacleImage.y = -170; ///lines image y up with hitzone y 
        }

        function createKnees (x, y) {
            var hitZoneSize = 10; //size
            var damageFromObstacle = 1; //damage
            var kneesHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            kneesHitZone.x = x; //x-value of hitzone
            kneesHitZone.y = y; //y-value of hitzone
            game.addGameItem(kneesHitZone); //adds hitzone to game

            var obstacleImage = draw.bitmap('img/knees.png'); //draws & stores image
            kneesHitZone.addChild(obstacleImage); //adds image to hitzone
            obstacleImage.x = -165; //lines image x up with hitzone x
            obstacleImage.y = -170; ///lines image y up with hitzone y 
        }

        function createGator (x, y) {
            var gator = game.createGameItem('gator',25); //creates and stores enemy
            var gatorImage = draw.bitmap('img/gator.png'); 
            gatorImage.x = -25; //align hitbox with enemy
            gatorImage.y = -80;
            gator.addChild(gatorImage);
            gator.x = x;
            gator.y = y;
            game.addGameItem(gator);
            gator.velocityX = -2.5; //move enemy x pixels left
            //enemy.rotationalVelocity = -2;  //rotates enemy

            


            gator.onPlayerCollision = function() {
                game.changeIntegrity(-50) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The enemy has hit Halle');
                //it looks better if it just goes past halle
            };
            /* I THINK THAT THIS LOOKS BETTER WITHOUT IT DOING ANYTHING PLUS I PUT IT OUT OF RANGE OF THE PROJECTILE ANYWAYS
            gator.onProjectileCollision = function() {
                game.increaseScore(10); //increases score
                enemy.shrink(); //enemy disappears
                console.log("Gator has been hit");
            };
            */
        };

        function createSnake (x, y) {
            var snake = game.createGameItem('snake',25); //creates and stores enemy
            var snakeImage = draw.bitmap('img/snake.png'); 
            snakeImage.x = -415; //align hitbox with enemy
            snakeImage.y = -70;
            snake.addChild(snakeImage);
            snake.x = x;
            snake.y = y;
            game.addGameItem(snake);
            snake.velocityX = -3; //move enemy x pixels left
            //enemy.rotationalVelocity = -2;  //rotates enemy

            snake.onPlayerCollision = function() {
                game.changeIntegrity(-25) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The snake has hit Halle');
                //it looks better if it just goes past halle
            };

            snake.onProjectileCollision = function() {
                game.increaseScore(100); //increases score
                snake.shrink(); //enemy disappears
                console.log("Snake has been hit");
            };
        };

        function createGTurtle (x, y) {
            var gTurtle = game.createGameItem('g-turtle',25); //creates and stores enemy
            var gTurtleImage = draw.bitmap('img/g-turtle.png'); 
            gTurtleImage.x = -225; //align hitbox with enemy
            gTurtleImage.y = -25;
            gTurtle.addChild(gTurtleImage);
            gTurtle.x = x;
            gTurtle.y = y;
            game.addGameItem(gTurtle);
            gTurtle.velocityX = -2.5; //move enemy x pixels left
            //enemy.rotationalVelocity = -2;  //rotates enemy

            


            gTurtle.onPlayerCollision = function() {
                game.changeIntegrity(-35) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The alligator snapping turtle has hit Halle');
                //it looks better if it just goes past halle
            };
            /* I'M THINKING OF IT LIKE AN ARMORED SHELL
            gTurtle.onProjectileCollision = function() {
                game.increaseScore(10); //increases score
                enemy.shrink(); //enemy disappears
                console.log("Alligator snapping turtle has been hit");
            };
            */
        };

        function createBug (x, y) {
            var bug = game.createGameItem('bug',25); //creates and stores enemy
            var bugImage = draw.bitmap('img/bug.png'); 
            bugImage.x = -25; //align hitbox with enemy
            bugImage.y = -25;
            bug.addChild(bugImage);
            bug.x = x;
            bug.y = y;
            game.addGameItem(bug);
            bug.velocityX = -5; //move enemy x pixels left
            //enemy.rotationalVelocity = -2;  //rotates enemy

            bug.onPlayerCollision = function() {
                game.changeIntegrity(-15) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The bug has hit Halle');
                //it looks better if it just goes past halle
            };
        };

        function createRougarou (x, y) {
            var rougarou = game.createGameItem('rougarou',25); //creates and stores enemy
            var rougarouImage = draw.bitmap('img/rougarou.png'); 
            rougarouImage.x = -50; //align hitbox with enemy
            rougarouImage.y = -100;
            rougarou.addChild(rougarouImage);
            rougarou.x = x;
            rougarou.y = y;
            game.addGameItem(rougarou);
            rougarou.velocityX = -5; //move enemy x pixels left
            //enemy.rotationalVelocity = -2;  //rotates enemy

            rougarou.onPlayerCollision = function() {
                game.changeIntegrity(-100) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The Rougarou has hit Halle');
                //it looks better if it just goes past halle
            };

            rougarou.onProjectileCollision = function() {
                game.increaseScore(9000); //increases score
                rougarou.fadeOut(); //enemy disappears
                console.log("Rougarou has been hit");
            };
        };

        function createEgret (x, y) {
            var egret = game.createGameItem('egret',25); //creates and stores reward
            var egretImage = draw.bitmap('img/egret.png'); //draws and stores blue square 
            egretImage.x = -100; //align hitbox with img
            egretImage.y = -60;  // ^^^
            egret.addChild(egretImage);
            egret.x = x;
            egret.y = y;
            game.addGameItem(egret);
            egret.velocityX = -3; //move reward 1 pixel left
            //reward.rotationalVelocity = -2;  //rotates reward

            egret.onPlayerCollision = function() {
                game.changeIntegrity(25) //HEALTH gainied WHEN reward HITS hallebot
                egret.flyTo(-50, -50); //reward shrinks
                game.increaseScore(100); //increases score
                console.log('Halle has collected an egret');
            };
        };

        function createDuck (x, y) {
            var duck = game.createGameItem('duck',25); //creates and stores reward
            var duckImage = draw.bitmap('img/duck.png'); //draws and stores blue square 
            duckImage.x = -50; //align hitbox with img
            duckImage.y = -80;  // ^^^
            duck.addChild(duckImage);
            duck.x = x;
            duck.y = y;
            game.addGameItem(duck);
            duck.velocityX = -3; //move reward 1 pixel left
            //reward.rotationalVelocity = -2;  //rotates reward

            duck.onPlayerCollision = function() {
                game.changeIntegrity(20) //HEALTH gained WHEN reward HITS hallebot
                duck.flyTo(-50, -50); //reward shrinks
                game.increaseScore(80); //increases score
                console.log('Halle has collected a duck');
            };
        };

        function createOtter (x, y) {
            var otter = game.createGameItem('otter',25); //creates and stores reward
            var otterImage = draw.bitmap('img/otter.png'); //draws and stores blue square 
            otterImage.x = -50; //align hitbox with img
            otterImage.y = -35;  // ^^^
            otter.addChild(otterImage);
            otter.x = x;
            otter.y = y;
            game.addGameItem(otter);
            otter.velocityX = -3; //move reward 1 pixel left
            //reward.rotationalVelocity = -2;  //rotates reward

            otter.onPlayerCollision = function() {
                game.changeIntegrity(35) //HEALTH gained WHEN reward HITS hallebot
                otter.shrink(); //reward shrinks
                game.increaseScore(140); //increases score
                console.log('Halle has collected an otter');
            };
        };
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            if (gameItem.type === "stump") {
                createStump(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "log") {
                createLog(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "knees") {
                createKnees(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "gator") {
                createGator(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "snake") {
                createSnake(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "g-turtle") {
                createGTurtle(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "bug") {
                createBug(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "rougarou") {
                createRougarou(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "egret") {
                createEgret(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "duck") {
                createDuck(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "otter") {
                createOtter(gameItem.x, gameItem.y);
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
