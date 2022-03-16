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
                { "type": "sawblade", "x": 400, "y": groundY - 10},
                { "type": "sawblade", "x": 600, "y": groundY - 10},
                { "type": "sawblade", "x": 900, "y": groundY - 10},

                { "type": "enemy", "x": 400, "y": groundY - 50},
                { "type": "enemy", "x": 800, "y": groundY - 50},
                { "type": "enemy", "x": 1200, "y": groundY - 50},

                { "type": "reward", "x": 600, "y": groundY - 105},
                { "type": "reward", "x": 1000, "y": groundY - 105},
                { "type": "reward", "x": 1400, "y": groundY - 105},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade (x, y) {
            var hitZoneSize = 25; //size
            var damageFromObstacle = 10; //damage
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            sawBladeHitZone.x = x; //x-value of hitzone
            sawBladeHitZone.y = y; //y-value of hitzone
            game.addGameItem(sawBladeHitZone); //adds hitzone to game

            var obstacleImage = draw.bitmap('img/stump(3).png'); //draws & stores image
            sawBladeHitZone.addChild(obstacleImage); //adds image to hitzone
            obstacleImage.x = -165; //lines image x up with hitzone x
            obstacleImage.y = -170; ///lines image y up with hitzone y 
        }

        function createEnemy (x, y) {
            var enemy = game.createGameItem('enemy',25); //creates and stores enemy
            var enemyImage = draw.bitmap('img/gator.png'); 
            enemyImage.x = -25; //align hitbox with enemy
            enemyImage.y = -25;
            enemy.addChild(enemyImage);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -2.5; //move enemy x pixels left
            //enemy.rotationalVelocity = -2;  //rotates enemy

            


            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10) //HEALTH LOST WHEN ENEMY HITS hallebot
                console.log('The enemy has hit Halle');
            };

            enemy.onProjectileCollision = function() {
                game.increaseScore(10); //increases score
                enemy.shrink(); //enemy disappears
                console.log("Enemy has been hit");
            };
        };

        function createReward (x, y) {
            var reward = game.createGameItem('reward',25); //creates and stores reward
            var rewardImage = draw.bitmap('img/egret.png'); //draws and stores blue square 
            rewardImage.x = -100; //align hitbox with 
            rewardImage.y = -60;
            reward.addChild(rewardImage);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2.5; //move reward 1 pixel left
            //reward.rotationalVelocity = -2;  //rotates reward

            reward.onPlayerCollision = function() {
                game.changeIntegrity(10) //HEALTH LOST WHEN reward HITS hallebot
                reward.shrink(); //reward shrinks
                game.increaseScore(10); //increases score
                console.log('Halle has collected a reward');
            };
        };
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            if (gameItem.type === "sawblade") {
                createSawBlade(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "enemy") {
                createEnemy(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "reward") {
                createReward(gameItem.x, gameItem.y);
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
