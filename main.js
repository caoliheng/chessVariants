// export {}; // make ts and js have different "scopes"
console.log('chessVariants');
var canvas = document.getElementById('board');
var context = canvas.getContext('2d');
// console.log(canvas);
// draw squares, board background
for (var r = 0; r < 8; ++r) {
    for (var c = 0; c < 8; ++c) {
        context.fillStyle = ((r + c) & 1) ? '#123456' : '#654321';
        context.fillRect(r * 80, c * 80, (r + 1) * 80, (c + 1) * 80);
    }
}
