let move_speed = 0, gravity = 0;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point1.mp3');
sound_point.volume = 0.2;
let sound_die = new Audio('sounds effect/die.mp3');
sound_die.volume = 0.5;
// getting bird element properties
let bird_props = bird.getBoundingClientRect();
let isenab = true;
// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.level1').getBoundingClientRect();
let background1 = document.querySelector('.level1')
background1.classList.add('anim_lv1');
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let score_val_max = document.querySelector('.score_val-max');
let score_title_max = document.querySelector('.score_title-max');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

let start_y = bird.style.top;
max = 0
document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play' && isenab){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.src = 'images/Bird.png';
        img.style.display = 'block';
        bird.style.top = '40vh';
        bird_props = bird.getBoundingClientRect();
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score: ';
        score_title_max.innerHTML = 'Max score: '
        score_val_max.innerHTML = max;
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        isenab = true;
        background1 = document.querySelector('.level1');
        background1.style.backgroundImage = "url('images/plt2.jpg')";
        background1.style.animationDuration = '30s';
        move_speed = 7; 
        gravity = 1;
        pipe_seperation = 0;
        pipe_range = 100;

        play();
    }
});


function play(){
    
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top){
                    game_state = 'End';
                    sound_die.play();
                    isenab = false;
                    img.src = 'images/Bird-3.png';
                    
                    setTimeout(function(){
                        message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                        message.classList.add('messageStyle');
                        img.style.display = 'none';
                        isenab = true;
                    }, 1000);

                    return;
                }else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        if (parseInt(score_val_max.innerHTML ) < parseInt(score_val.innerHTML)) {
                            max++;
                            score_val_max.innerHTML = max;
                        }
                        
                    
                        if(score_val.innerHTML == 4){
                            pipe_seperation = -50;

                        }
                        if(score_val.innerHTML == 5){

                           // background1.style.animationDuration = '10s';
                            move_speed = 10; 
                            gravity = 1.2;
                            pipe_range = 80;

                        }

                        if(score_val.innerHTML > 20){

                            // background1.style.animationDuration = '10s';
                                if(move_speed < 30){
                                    move_speed += 0.1;
                                }
                               
                                if(pipe_range > 20){

                                    pipe_range -= 1;
                             }
                             
                        }
 
                        sound_point.currentTime = 0;
                        sound_point.play();
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
            
        });
        requestAnimationFrame(move);
        
    }


    let isKeyDown = false;

    requestAnimationFrame(move);
    document.addEventListener("keydown", (e) => {
        if((e.key == 'ArrowUp' || e.key == ' ')&& isenab && !isKeyDown){
            img.src = 'images/Bird-2.png';
       
            bird_dy = -20;
            img.style.transform = 'rotate(-20deg)';
            isKeyDown = true;


            
        }
    });


    document.addEventListener('keyup', (e) => {
        if((e.key == 'ArrowUp' || e.key == ' ')&& isenab){
            isKeyDown = false;
            img.src = 'images/Bird.png';
            img.style.transform ='rotate(20deg)';


          
        }
    });

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + gravity;
      
        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            sound_die.play();
            isenab = false;
            img.src = 'images/Bird-3.png';
            
            setTimeout(function(){
                message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                message.classList.add('messageStyle');
                img.style.display = 'none';
                isenab = true;
            }, 1000);
        }
       
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;
    let pipe_range = 150;
   

    function getRandomIntInclusive(n, b) {
        return Math.floor(Math.random() * (b - n + 1)) + n;
     }
    function create_pipe(){

        if(game_state != 'Play') return;

        if(pipe_seperation > pipe_range){
        
            pipe_seperation = getRandomIntInclusive(0, 20);

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.backgroundImage = "url('images/pipe2.png')";
            pipe_sprite_inv.style.top = pipe_posi - 75 + 'vh';
        

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + getRandomIntInclusive(30, 50) + 'vh';
           
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
        
    }


    requestAnimationFrame(create_pipe);
    
}
