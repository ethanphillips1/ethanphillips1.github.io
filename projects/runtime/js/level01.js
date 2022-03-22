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
                { "type": "stump", "x": 600, "y": groundY - 10},
                { "type": "stump", "x": 900, "y": groundY - 10},

                { "type": "gator", "x": 400, "y": groundY - 10},
                { "type": "gator", "x": 800, "y": groundY - 10},
                { "type": "gator", "x": 1200, "y": groundY - 10},

                { "type": "rougarou", "x": 1600, "y": groundY - 50},

                { "type": "egret", "x": 600, "y": groundY - 105},
                { "type": "egret", "x": 1000, "y": groundY - 105},
                { "type": "egret", "x": 1400, "y": groundY - 105},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createStump (x, y) {
            var hitZoneSize = 25; //size
            var damageFromObstacle = 10; //damage
            var stumpHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            stumpHitZone.x = x; //x-value of hitzone
            stumpHitZone.y = y; //y-value of hitzone
            game.addGameItem(stumpHitZone); //adds hitzone to game

            var obstacleImage = draw.bitmap('img/stump(3).png'); //draws & stores image
            stumpHitZone.addChild(obstacleImage); //adds image to hitzone
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
                game.changeIntegrity(-10) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The enemy has hit Halle');
            };

            gator.onProjectileCollision = function() {
                game.increaseScore(10); //increases score
                enemy.shrink(); //enemy disappears
                console.log("Gator has been hit");
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
            rougarou.velocityX = -2.5; //move enemy x pixels left
            //enemy.rotationalVelocity = -2;  //rotates enemy

            


            rougarou.onPlayerCollision = function() {
                game.changeIntegrity(-10) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The Rougarou has hit Halle');
            };

            rougarou.onProjectileCollision = function() {
                game.increaseScore(10); //increases score
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
            egret.velocityX = -2.5; //move reward 1 pixel left
            //reward.rotationalVelocity = -2;  //rotates reward

            egret.onPlayerCollision = function() {
                game.changeIntegrity(10) //HEALTH LOST WHEN reward HITS hallebot
                egret.flyTo(-50, -50); //reward shrinks
                game.increaseScore(10); //increases score
                console.log('Halle has collected a reward');
            };
        };
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            if (gameItem.type === "stump") {
                createStump(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "gator") {
                createGator(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "rougarou") {
                createRougarou(gameItem.x, gameItem.y);
            }
            if (gameItem.type === "egret") {
                createEgret(gameItem.x, gameItem.y);
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
