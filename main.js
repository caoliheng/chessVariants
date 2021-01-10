console.log('chessVariants');
var canvas = document.getElementById('board');
var context = canvas.getContext('2d');
// console.log(canvas);
var board_light = '#FFCE9E';
var board_dark = '#D18B47';
// draw squares, board background
for (var r = 0; r < 8; ++r) {
    for (var c = 0; c < 8; ++c) {
        context.fillStyle = ((r + c) & 1) ? board_dark : board_light;
        context.fillRect(r * 80, c * 80, (r + 1) * 80, (c + 1) * 80);
    }
}
