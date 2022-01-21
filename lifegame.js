const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//制作含随机数字0，1的表格
const resolution = 10;
canvas.width = 600;
canvas.height = 600;
const cols = canvas.width/resolution;
const rows = canvas.height/resolution;
function buildGrid(){
    return new Array(cols).fill(null)
    .map(()=>new Array(rows).fill(null)
    .map(()=>Math.floor(Math.random()*2)));
}

let grid = buildGrid();
requestAnimationFrame(update);//请求动画

function update(){
    grid = nextGen(grid);
    render(grid);
    requestAnimationFrame(update);
}

function nextGen(grid){
    //copy current grid
    const nextGen = grid.map(arr=>[...arr]);
    //find neighbours
    for(let col=0; col<grid.length;col++){
        for(let row=0;row<grid[col].length;row++){
        const cell = grid [col][row];
        let numNeighbours = 0;
        for(let i=-1;i<2;i++){
            for(let j=-1;j<2;j++){
                if(i===0 && j==0){
                    continue;
                }
            const x_cell = col + i;
            const y_cell = row + j;
            if(x_cell>=0&&y_cell>=0&&x_cell<cols&&y_cell<rows){
                const currentNeighbour = grid[col+i][row+j];
                numNeighbours += currentNeighbour;
            }
          }
        }     //calculate
        if(cell === 1 && numNeighbours <2){
            nextGen[col][row]=0;
        }else if(cell===1 && numNeighbours>3 ){
            nextGen[col][row]=0;
        }else if(cell === 0 && numNeighbours === 3){
            nextGen[col][row]=1;
        }
      }
     }
    return nextGen;
}
function render(grid){
    for(let col=0; col<grid.length;col++){
        for(let row=0;row<grid[col].length;row++){
            const cell = grid[col][row];
            ctx.beginPath();
            ctx.rect(col*resolution,row*resolution,resolution,resolution);
            ctx.fillStyle = cell? 'black':'white';
            ctx.fill();
            ctx.stroke();//绘制线条
        }
    }
}
