function load_images(){
    enemy_image = new Image()
    enemy_image.src = 'assets/v2.png'
    player_image = new Image()
    player_image.src = 'assets/superhero.png'
    gem_image = new Image()
    gem_image.src = 'assets/gem.png'
}

function init(){
    //define the objects we have in  the game
    canvas = document.getElementById("mycanvas")
    console.log(canvas)
    W=700;
    H=400;
    canvas.width = W;
    canvas.height = H;
    game_over = false;


    pen = canvas.getContext('2d')
    console.log(pen)

    e1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed : 20,
    };
    e2 = {
        x : 300,
        y : 150,
        w : 60,
        h : 60,
        speed : 10,
    };
    e3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed : 10,
    };

    enemy = [e1,e2,e3];
    player = {
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false
    };
    gem = {
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    };
    // listen to events on canvas
    canvas.addEventListener('mousedown',function(){
        player.moving=true;

    });
    canvas.addEventListener('mouseup',function(){
        player.moving=false;

    });
}
function isOverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        return true
    }

    return false;

}
function draw(){
    pen.clearRect(0,0,W,H);
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    pen.drawImage(player_image,player.x,player.y,player.w,player.h)
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h)

}
function update(){
    if(player.moving===true){
        player.x+=player.speed;
    }
    if(isOverlap(player,gem)){
        alert("You won")
        game_over=true;
        return;

    }
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            alert("you lose")
            game_over=true;
            return
        }
    }
    for( let i=0;i<enemy.length;i++){
        if (enemy[i].y + enemy[i].h >= H || enemy[i].y <= 0) {
            enemy[i].speed = enemy[i].speed * -1;

        }
        enemy[i].y+=enemy[i].speed;
    }


}
function gameloop(){
    if(game_over){
        clearInterval(f)
    }
    draw();
    update();
    console.log("in gameloop")
}
load_images();
init();
var f = setInterval(gameloop,100)