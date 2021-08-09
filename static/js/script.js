// init context
const k = kaboom({
  global: true, // import all kaboom functions to global namespace
  scale: 2, // pixel size (for pixelated games you might want smaller size with scale)
  clearColor: [0, 0, 0, 0], // background color (default is a checker board background)
  fullscreen: true, // if fullscreen
  crisp: true, // if pixel crisp (for sharp pixelated games)
  debug: true, // debug mode
});

const gameCanvas = document.getElementsByTagName('canvas')[0]

// define SFX
loadSound("gameover_sound", "static/sounds/annoying_game_over_biploop.wav")
loadSound("comedy_jump", "static/sounds/comedy_jump_bip_2loop.wav")
loadSound("counting", "static/sounds/counting_bliploop.wav")
loadSound("death_scream", "static/sounds/death_scream_biploop.wav")
loadSound("jump", "static/sounds/jump_biploop.wav")
loadSound("jumpy", "static/sounds/jumpy_biploop.wav")
loadSound("negative_hit1", "static/sounds/negative_hit_bip_1loop.wav")
loadSound("negative_hit2", "static/sounds/negative_hit_biploop.wav")
loadSound("biscuit", "static/sounds/biscuit_crunch.wav")
loadSound("level_complete", "static/sounds/into_the_teacup_shorter.wav")
loadSound("big_enemy_dead", "static/sounds/kill_big_enemy.wav")



// music loops
loadSound("menu", "static/sounds/MENU_LOOP.mp3")
loadSound("creepy_menu", "static/sounds/CREEPY_AMBIENT_REVERSE_LOOP.mp3")
loadSound("game_loop", "static/sounds/REGULAR_GAMELOOP.mp3")

const music = play("game_loop");

// define 'lionel' sprite
loadSprite("lionel", "static/sprites/lionel.png");

// define map sprites
loadSprite("block", "static/sprites/block.png")
loadSprite("brick", "static/sprites/brick.png")
loadSprite("coin", "static/sprites/coin.png")
loadSprite("question", "static/sprites/question.png")
loadSprite("unboxed", "static/sprites/unboxed.png")
loadSprite("pipe-left", "static/sprites/pipe-left.png")
loadSprite("pipe-right", "static/sprites/pipe-right.png")
loadSprite("pipe-top-left-side", "static/sprites/pipe-top-left-side.png")
loadSprite("pipe-top-right-side", "static/sprites/pipe-top-right-side.png")
loadSprite("pipe-open-left-side", "static/sprites/pipe-open-left-side.png")
loadSprite("pipe-open-right-side", "static/sprites/pipe-open-right-side.png")
loadSprite("pipe-open-top-left-side", "static/sprites/pipe-open-top-left-side.png")
loadSprite("pipe-open-top-right-side", "static/sprites/pipe-open-top-right-side.png")
loadSprite("evil-shroom-1", "static/sprites/evil-shroom-1.png")
loadSprite("mushroom", "static/sprites/mushroom.png")
loadSprite("background-pink", "static/sprites/bg5.png")
loadSprite("background-blue", "static/sprites/bg5b.png")
loadSprite("background-red", "static/sprites/bg5c.png")
loadSprite("background-green", "static/sprites/bg5d.png")
loadSprite("lionel-bg", "static/sprites/pixelated-lionel.jpg")

// villain sprites
loadSprite("bob-mardy", "static/sprites/bob-mardy-small.png")
loadSprite("disco-inferno", "static/sprites/disco-inferno-small.png")
loadSprite("rotten-johnny", "static/sprites/rotten-johnny-small.png")
loadSprite("shanking-stevens", "static/sprites/shanking-stevens-small.png")
loadSprite("shanking-stevens1", "static/sprites/shanking-stevens1-small.png")
loadSprite("inhuman-plague", "static/sprites/the-inhuman-plague-small.png")
loadSprite("whackem-jackson", "static/sprites/whackem-jackson-small.png")

const layerColours = ["pink", "blue", "red", "green"]
const angles = [0, 90, 180]
const villains = [sprite("bob-mardy"), sprite("disco-inferno"), sprite("rotten-johnny"), sprite("shanking-stevens"), sprite("shanking-stevens1"), sprite("inhuman-plague"), sprite("whackem-jackson")];
let playerScore = 0;

scene("game", () => {

  const JUMP_FORCE = 360
  const BIG_JUMP_FORCE = 550
  let CURRENT_JUMP_FORCE = JUMP_FORCE
  const FALL_DEATH = 600

  // // gets random villain
  let randVillain = villains[Math.floor(Math.random() * villains.length)];

  // gets random viewing angle
  let angle = angles[Math.floor(Math.random() * angles.length)];

  // sets basic viewing angle
  document.querySelector('canvas').style.setProperty("transform", `rotate(${angle}deg)`)

  // defines random background colour
  let colour = layerColours[Math.floor(Math.random() * layerColours.length)];

  layers(['bg', 'obj', 'ui'], 'obj')

  camIgnore(["bg", "ui"])

  // sets random background colour
  add([
    layer("bg"),
    sprite(`background-${colour}`, {
      width: width(),
      height: height(),
    })
  ]);

  // define map level config - can make several of these for each level design
  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],
    'x': [sprite('brick'), solid(), 'brick'],
    '$': [sprite('coin'), 'coin'],
    '%': [sprite('question'), 'coin-surprise', solid()],
    '*': [sprite('question'), 'mushroom-surprise', solid()],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-left'), scale(0.5), solid(), 'closed1'],
    ')': [sprite('pipe-right'), scale(0.5), solid(), 'closed2'],
    '-': [sprite('pipe-top-left-side'), scale(0.5), solid(), 'closed3'],
    '+': [sprite('pipe-top-right-side'), scale(0.5), solid(), 'closed4'],

    '1': [sprite('pipe-open-left-side'), scale(0.5), solid()],
    '2': [sprite('pipe-open-right-side'), scale(0.5), solid()],
    '3': [sprite('pipe-open-top-left-side'), scale(0.5), solid()],
    '4': [sprite('pipe-open-top-right-side'), scale(0.5), solid(), 'pipe'],

    'b': [sprite('brick'), solid()],
    '^': [sprite('evil-shroom-1'), solid(), 'dangerous'],
    '#': [sprite('mushroom'), 'mushroom', body()],
  }

  const scoreLabel = add([
    text('Level ' + playerScore, 12),
    pos(30, 6),
    layer('ui'),
    {
      value: playerScore,
    }
  ])

  // gets random map from map array
  let map = maps[Math.floor(Math.random() * maps.length)];

  // creates game level
  const gameLevel = addLevel(map, levelCfg)

  // we need to find out how many 'coins' or 'biscuits' are on a map
  let mapChars = map, o = {}

  // this gets all of the characters within the map and turns it into an object listing the quantity of each
  mapChars.forEach(m => m.split('').forEach(e => o[e] = (o[e] || 0) + 1));
  console.log(o)

  // if no % on the map this is set to 0
  if (o['%'] == undefined) {
    o['%'] = 0;
  }

  // if no $ on the map this is set to 0
  if (o['$'] == undefined) {
    o['$'] = 0;
  }

  // creates biscuits variable number based on how many biscuit/biscuit boxes are present in the map
  // this then goes down by one number each time a biscuit is eaten by the player, allowing them to
  // exit the map once all are eaten
  if ((o['%'] + o['$']) > 0) {
    biscuits = (o['%'] + o['$']);
  } else {
    biscuits = 0;
  }

  // displays biscuitcount on screen
  let biscuitCount = add([
    text(biscuits + ' biscuit' +`${biscuits != 1 ? 's' : ''}` + ' left in this level!', 10),
    pos(30, 36),
    layer('ui'),
    {
      value: biscuits,
    }
  ])

  function destroyPipe(num, item) {
    every(`closed${num}`, (obj) => {
      destroy(obj);
      gameLevel.spawn(item, obj.gridPos.sub(0, 0));
    });
  }

  function checkBiscuits() {
    if (biscuits == 0) {
      destroyPipe(1, '1');
      destroyPipe(2, '2');
      destroyPipe(3, '3');
      destroyPipe(4, '4');
    }
  }

  checkBiscuits();

  // function that checks if a player is 'big' or not
  function big() {
    // default timer and big status
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      // makes lionel small once the timer has elapsed
      smallify() {
        play("jump")
        this.scale = vec2(1)
        timer = 0
        isBig = false
        CURRENT_JUMP_FORCE = JUMP_FORCE
        music.detune(0)
      },
      // makes lionel big when eating 'mushroom'
      biggify(time) {
        play("comedy_jump")
        this.scale = vec2(2)
        timer = time
        isBig = true
        CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
        music.detune(250)
      }
    }
  }

  // add lionel sprite
  const lionel = add([
    sprite("lionel"),
    pos(30, 0),
    body(),
    scale(1),
    big(),
    origin('bot'),
  ]);

  // spawns villain sprite at random point on the map
  const villain = add([
    randVillain,
    pos(rand(100, gameLevel.width()), 0),
    'evil',
    solid(),
    body(),
    origin('bot'),
  ]);

  // makes villain character jump continuously once grounded
  villain.action(() => {
    if (villain.grounded()) {
      villain.jump(150);
    }
  });

  lionel.collides('evil', (e) => {
    if (lionel.pos.y < e.pos.y) {
      lionel.jump(JUMP_FORCE);
      play("big_enemy_dead");
      camShake(2);
      destroy(e);
    } else {
      console.log("You Lose");
      lionel.destroy();
      go("gameover");
    }
  });

  // defines lionel sprites behaviour - is tracked by camera and falldeath action
  lionel.action(() => {
    camPos(lionel.pos)
    if (lionel.pos.y >= FALL_DEATH) {
      console.log("You Lose");
      lionel.destroy();
      go("gameover");
    }
    if (lionel.grounded()) {
      isJumping = false;
    }
  });

  // lionel left movement
  keyDown('left', () => {
    lionel.move(-120, 0);
  });

  // lionel right movement
  keyDown('right', () => {
    lionel.move(120, 0);
  });

  // lionel jump
  keyPress('space', () => {
    if (lionel.grounded()) {
      isJumping = true;
      lionel.jump(CURRENT_JUMP_FORCE);

      play("jumpy");
    }
  });

  // action when lionel collides with 'coin-surprise' sprite
  lionel.collides('coin-surprise', (obj) => {
    play("negative_hit1");
    gameLevel.spawn('$', obj.gridPos.sub(0, 1));
    destroy(obj);
    gameLevel.spawn('}', obj.gridPos.sub(0, 0));
  });

  // action when lionel collides with 'mushroom-surprise' sprite
  lionel.collides('mushroom-surprise', (obj) => {
    play("negative_hit2");
    gameLevel.spawn('#', obj.gridPos.sub(0, 1));
    destroy(obj);
    gameLevel.spawn('}', obj.gridPos.sub(0, 0));
  });

  // action when mushroom is activated
  action('mushroom', (m) => {
    m.move(20, 0);
  });

  // action when lionel collides with mushroom sprite
  lionel.collides('mushroom', (m) => {
    lionel.biggify(10);
    destroy(m);
  });

  // action when lionel collides with coin sprite
  lionel.collides('coin', (c) => {
    play("biscuit");
    destroy(c);
    biscuits -= 1;
    checkBiscuits();
    console.log(biscuits)

    biscuitCount.text = biscuits + ' biscuit' +`${biscuits != 1 ? 's' : ''}` + ' left in this level!';
  });

  // action when lionel jumps on brick
  lionel.collides('brick', (p) => {
    destroy(p)
    gameLevel.spawn('b', p.gridPos.sub(0, 0))
    // spins canvas
    //angle += 90;
    document.querySelector('canvas').style.setProperty("transform", `rotate(${angle}deg)`)
    /*
    // updates background colour
    colourCounter = (colourCounter + 1) % layerColours.length;
    add([
      layer("bg"),
      sprite(`background-${layerColours[colourCounter]}`, {
        width: width(),
        height: height(),
      })
    ])

    if (musicTune == 2000){
      musicTune = -1000
    } else {
      musicTune += 40
    }
    */
  });

  // action when lionel jumps on pipe
  lionel.collides('pipe', () => {
    if (biscuits == 0) {
      playerScore += 1;
      go("game");
    }
  });

});

// defines gameover screen
scene("gameover", () => {

  // resets viewing angle
  document.querySelector('canvas').style.setProperty("transform", "rotate(0deg)")

  music.stop()
  play("gameover_sound")

  // gameover screen text
  let gameOver = add([
    text("Game Over", 16),
    pos(width() / 2, 100),
    origin("center"),
    color(rgb(0, 0, 0)),
  ]);

  let userScore = add([
    text(`Score: ${playerScore}`, 16),
    pos(width() / 2, 180),
    origin("center"),
    color(rgb(1, 1, 1)),
    color(rgb(0, 0, 0)),
  ]);

  let gameOverText1 = add([
    text("Press space to go again, loser!", 16),
    pos(width() / 2, 260),
    origin("center"),
    color(rgb(1, 1, 1)),
    color(rgb(0, 0, 0)),
  ]);

  let gameOverText2 = add([
    text("Or stop embarassing yourself and just ESC!", 16),
    pos(width() / 2, 340),
    origin("center"),
    color(rgb(1, 1, 1)),
    color(rgb(0, 0, 0)),
  ]);


  // press space to restart game
  keyPress("space", () => {
    playerScore = 0;
    go("game");
    music.play()
  });

  keyPress("escape", () => {
   // show form for name input and score
  //  gameOver.text = "";
  //  gameOverText1.text = "";
  //  gameOverText2.text = "";
  //  userScore.text = "";
  //  add([
  //   text("Please input your name", 16),
  //   pos(width() / 2, 10),
  //   origin("center"),
  //   color(rgb(1, 1, 1)),
  //   color(rgb(0, 0, 0)),
  // ]);
  let playerScoreForHTML = document.getElementById('score').value = playerScore
  document.getElementById('score').innerHTML = playerScoreForHTML;
  gameCanvas.classList.add("d-none");
  let scoreForm = document.querySelector('form');
  scoreForm.classList.remove("d-none");
  });
});

// defines starting screen
scene("start", () => {

  layers(['bg', 'obj'], 'obj')

  camIgnore(["bg", "ui"])

  // sets random background colour
  add([
    layer("bg"),
    sprite("lionel-bg", {
      width: width(),
      height: height(),
    })
  ]);

  // starting screen text
  let gameName = add([
    text("L I O N O I L", 20),
    pos(width() / 2, 120),
    origin("center"),
    color(rgb(1, 1, 1))
  ]);

  // starting screen text 2
  let firstInstruction = add([
    text("Press Enter key to begin", 16),
    pos(width() / 2, 180),
    origin("center"),
    color(rgb(1, 1, 1))
  ]);

  keyPress("enter", () => {
    gameName.text = "";
    firstInstruction.text = "";
    add([
      text("Press Space key to start Game", 16),
      pos(width() / 2, 140),
      origin("center"),
      color(rgb(1, 1, 1))
    ]);
    add([
      text("Press C key to view the cards", 16),
      pos(width() / 2, 180),
      origin("center"),
      color(rgb(1, 1, 1))
    ]);
    add([
      text("Press L key to view the leaderboards", 16),
      pos(width() / 2, 220),
      origin("center"),
      color(rgb(1, 1, 1))
    ]);
    add([
      text("Press S key to view story", 16),
      pos(width() / 2, 260),
      origin("center"),
      color(rgb(1, 1, 1))
    ]);
  });
  keyPress("l", () => {
    location="https://lionoil.herokuapp.com/leaderboard"
  });
  keyPress("c", () => {
    location="https://lionoil.herokuapp.com/cards"
  });

});
  // press space to start
  keyPress("space", () => {
    go("game");
    music.play()
  });

// default action on page load - start screen
go("start")
