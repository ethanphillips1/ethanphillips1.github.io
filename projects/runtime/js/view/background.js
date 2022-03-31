var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        var tree; 
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with an obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY, '#0F0F32'); // creates variable (backgroundFill) & stores rectangle as background
            background.addChild(backgroundFill); // adds it to canvas (makes it visible) 
            
            // TODO: 3 - Add a moon and starfield         I switched the moon and the stars around because I wanted the moon on top of the stars.
            for (var i = 0; i <= 100; i++) {
                var circle = draw.circle(2, "white", "white", 2); // creates variable (circle) that holds each circle
                circle.x = canvasWidth*Math.random(); // multiples canvasWidth by a random decimal between 0 and 1 for a random x-coordinate
                circle.y = groundY*Math.random(); // multiplies groundY by a random decimal between 0 and 1 for a random y-coordinate
                background.addChild(circle); // makes each circle visible
            }
            
            var moon = draw.bitmap('img/moon.png'); //creates variable (moon) to hold image of the moon
            moon.x = canvasWidth - 300; // x-coordinate of the image
            moon.y = groundY - 450; // y-coordinate of the image
            moon.scaleX = .75; // changes x-scale of image
            moon.scaleY = .75; // changes y-scale of image
            background.addChild(moon); // makes it visible

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?  A: The buildings are supposed to be behind the tree.
            //creates building w/ x & y value / pushes it to array
            for(var i = 0; i < 11; i++) {
                var buildingHeight = groundY * Math.random(); // holds random height of building
                var building = draw.rect(75, buildingHeight, "#1B1000", 'Black', 1); //holds and creates each building
                building.x = 200 * i; // adds 200 to x-coordinate every time it runs
                building.y = groundY - buildingHeight; // y-coordinate on ground
                background.addChild(building); // adds building to background
                buildings.push(building); // pushing buildings to array to store as index
            }

            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                
            }
            /*
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth;
            tree.y = groundY - 225;
            background.addChild(tree);
            */
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            /*
            tree.x = tree.x - 1.5; // speed of animated tree
            // loop tree back to end of screen
            if(tree.x < -200) {  
                tree.x = canvasWidth; // send tree to end of screen
            }
            */
            // TODO 5: Part 2 - Parallax
            
            // loop for each building to loopp the screen
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i]; //put value into each building
                building.x = building.x - 0.75; //speed of animated buildings
                //loop building back to end of screen
                if (building.x < -200) {
                    building.x = canvasWidth; //send building to end of screen
                }
            }
            
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
