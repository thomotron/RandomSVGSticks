$(document).ready(function() {
    // How many layers (or frames) will there be?
    var layerCount = 10;

    // Set up the svg document
    var svg = SVG('svg').size('100vw', '100vh');

    // Set up the layer array and index
    var layers = [];
    var layerId = 0;

    // Initialise each layer with it's own set of cool lines and append it to the layer array
    for (var i = 0; i < layerCount; i++)
    {
        // Generate a layer
        var layer = svg.nested();
        drawCoolLines(layer, true);

        // Add it to the layer array
        layers.push(layer);
    }

    // Cycle through each layer
    var interval = setInterval(function() {
        // Increment or wrap around the current layer ID
        layerId = ++layerId == layers.length ? 0 : layerId;

        // Toggle each layer depending if it is the current layer
        for (var i = 0; i < layers.length; i++)
        {
            layers[i].attr({opacity: i == layerId ? 1 : 0});
        }
    }, 100);
})

// Draws a bunch of cool-lookin' lines within the given svg
function drawCoolLines(svg, shuffle = false)
{
    // Get a range of y values
    var yRange = shuffle ? getShuffledRange(0, 10) : getRange(0, 10);
    for(var y of yRange)
    {
        // Get a range of x values
        var xRange = shuffle ? getShuffledRange(0, 10) : getRange(0, 10);
        for(var x of xRange)
        {
            // Get a random colour from black, white, or yellow
            var colour;
            switch (Math.floor(Math.random() * 3))
            {
                case 0: colour = "#000000"; break;
                case 1: colour = "#ffffff"; break;
                case 2: colour = "#fcde00"; break;
            }

            var width = Math.floor(Math.random() * 100) + 50; // Get a random width between 50 and 150
            var height = 3000;                                // Decent height
            var rotation = Math.floor(Math.random() * 360);   // Get a random rotation

            var xSpacingFactor = 100; // Multiplier for the x axis
            var ySpacingFactor = 100; // Multiplier for the y axis

            svg.rect(width, height)                 // Set up a rect
                .cx(x * xSpacingFactor)             // Move the centre horizontally
                .cy(y * ySpacingFactor)             // ... and vertically
                .attr({ fill: colour })             // Fill it with the colour we got
                .transform({ rotation: rotation }); // Rotate it
        }
    }
}

// Gets an array with a shuffled range of numbers between min and max
function getShuffledRange(min, max)
{
    // Get a range
    var range = getRange(min, max);

    // Shuffle it
    shuffleArray(range);

    // Return the shuffled range
    return range;
}

// Gets an array with a range of numbers between min and max
function getRange(min, max)
{
    // Fill an array with a range of numbers
    var range = []
    for (var i = min; i < max; i++) range.push(i);

    // Return the range
    return range;
}

// Shuffles an array in-place
function shuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
