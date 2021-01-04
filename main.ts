console.log('chessVariants');

const canvas = document.getElementById('board') as HTMLCanvasElement;
const context = canvas.getContext('2d');

// console.log(canvas);

// draw squares, board background
for (let r = 0; r < 8; ++r){
    for (let c = 0; c < 8; ++c){
        context.fillStyle = ((r+c) & 1) ? '#123456' : '#654321';
        context.fillRect(r*80, c*80, (r+1)*80, (c+1)*80);
        
    }
}
