var canvas = document.getElementById("mandelbrot");
var context = canvas.getContext("2d");
var pallette = []; // the array that will hold the hex strings of the colors

for (x = 0; x < 256; x++) { // the loop that creates the pallette
    if (x < 85) { // colors 0-84
        r = x * 3;
        g = 0;
        b = 0;
    }
    if (x > 84 && x < 171) { // colors 85-170
        r = 0;
        g = 3 * (x - 84);
        b = 0;
    }
    if (x > 170) { // colors 170-255
        r = 0;
        g = 0;
        b = 3 * (x - 170);
    }

    r = r.toString(16); // conversion to hex
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = "0" + r; // add a zero in front to change single-digit to double digit
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    pallette[x] = "#" + r + g + b; // final hex string
}

for (var x = 0; x < 200; x++) {
    for (var y = 0; y < 200; y++) {
        var i = 0;
        var cx = -2 + x / 50;
        var cy = -2 + y / 50;
        var zx = 0;
        var zy = 0;

        do {
            var xt = zx * zy;
            zx = zx * zx - zy * zy + cx;
            zy = 2 * xt + cy;
            i++;
        }
        while (i < 255 && (zx * zx + zy * zy) < 4);

        context.beginPath();
        context.rect(x * 4, y * 4, 4, 4);
        context.fillStyle = pallette[i]; // the number of iterations determines the color
        context.fill();
    }
}