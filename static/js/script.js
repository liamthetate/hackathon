// init context
const k = kaboom({
  global: true, // import all kaboom functions to global namespace
  scale: 2, // pixel size (for pixelated games you might want smaller size with scale)
  clearColor: [1, 1, 1, 1], // background color (default is a checker board background)
  fullscreen: false, // if fullscreen
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
loadSprite("evil-shroom-1", "static/sprites/evil-shroom-1.png")
loadSprite("mushroom", "static/sprites/mushroom.png")
loadSprite("background-pink", "static/sprites/bg5.png")
loadSprite("background-blue", "static/sprites/bg5b.png")
loadSprite("background-red", "static/sprites/bg5c.png")
loadSprite("background-green", "static/sprites/bg5d.png")
loadSprite("lionel-bg", "static/sprites/pixelated-lionel.jpg")

const layerColours = ["pink", "blue", "red", "green"]
let musicTune = 0;
const angles = [0, 90, 180, 360]

scene("game", () => {

  const MOVE_SPEED = 120
  const JUMP_FORCE = 360
  const BIG_JUMP_FORCE = 550
  let CURRENT_JUMP_FORCE = JUMP_FORCE
  const ENEMY_SPEED = 20
  const FALL_DEATH = 600

  let angle = angles[Math.floor(Math.random() * angles.length)];

  // sets basic viewing angle
  document.querySelector('canvas').style.setProperty("transform", `rotate(${angle}deg)`)

  let isJumping = true

  // defines random background colour
  let colour = layerColours[Math.floor(Math.random() * layerColours.length)];

  music.detune(musicTune)

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
    '(': [sprite('pipe-left'), scale(0.5), solid()],
    ')': [sprite('pipe-right'), scale(0.5), solid()],
    '-': [sprite('pipe-top-left-side'), scale(0.5), solid()],
    '+': [sprite('pipe-top-right-side'), scale(0.5), solid(), 'pipe'],
    'r': [sprite('pipe-top-right-side'), scale(0.5), solid()],
    'b': [sprite('block'), solid()],
    '^': [sprite('evil-shroom-1'), solid(), 'dangerous'],
    '#': [sprite('mushroom'), 'mushroom', body()],
  }

  // gets random map from map array
  let map = maps[Math.floor(Math.random() * maps.length)];

  // creates game level
  const gameLevel = addLevel(map, levelCfg)

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
        this.scale = vec2(1.5)
        timer = 0
        isBig = false
        CURRENT_JUMP_FORCE = JUMP_FORCE
      },
      // makes lionel big when eating 'mushroom'
      biggify(time) {
        play("comedy_jump")
        this.scale = vec2(3)
        timer = time
        isBig = true
        CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
      }
    }
  }

  // add lionel sprite
  const lionel = add([
    sprite("lionel"),
    pos(30, 0),
    body(),
    scale(1.5),
    big(),
    origin('bot'),
  ]);

  // defines lionel sprites behaviour - is tracked by camera and falldeath action
  lionel.action(() => {
    camPos(lionel.pos)
    if (lionel.pos.y >= FALL_DEATH) {
      console.log("You Lose")
      lionel.destroy()
      play("death_scream")
      go("gameover")
    }
  });

  // lionel left movement
  keyDown('left', () => {
    lionel.move(-120, 0)
  });

  // lionel right movement
  keyDown('right', () => {
    lionel.move(120, 0)
  });

  // lionel jump
  keyPress('space', () => {
    if (lionel.grounded()) {
      isJumping = true
      lionel.jump(CURRENT_JUMP_FORCE)

      if (musicTune == 2000) {
        musicTune = -1000
      } else {
        musicTune += 40
      }

      music.detune(musicTune)

      play("jumpy")
    }
  });

  // action when lionel collides with 'coin-surprise' sprite
  lionel.collides('coin-surprise', (obj) => {
    play("negative_hit1")
    gameLevel.spawn('$', obj.gridPos.sub(0, 1))
    destroy(obj)
    gameLevel.spawn('}', obj.gridPos.sub(0, 0))
  });

  // action when lionel collides with 'mushroom-surprise' sprite
  lionel.collides('mushroom-surprise', (obj) => {
    play("negative_hit2")
    gameLevel.spawn('#', obj.gridPos.sub(0, 1))
    destroy(obj)
    gameLevel.spawn('}', obj.gridPos.sub(0, 0))
  });

  // action when mushroom is activated
  action('mushroom', (m) => {
    m.move(20, 0)
  });

  // action when lionel collides with mushroom sprite
  lionel.collides('mushroom', (m) => {
    lionel.biggify(10)
    destroy(m)
  });

  // action when lionel collides with coin sprite
  lionel.collides('coin', (c) => {
    play("death_scream")
    destroy(c)
  });

  // action when lionel jumps on brick
  lionel.collides('brick', (p) => {
    // destroy(p)
    // gameLevel.spawn('b', p.gridPos.sub(0, 0))
    // spins canvas
    // document.querySelector('canvas').style.setProperty("transform", `rotate(${angle}deg)`)

  });

  // action when lionel jumps on pipe
  lionel.collides('pipe', () => {
    go("game");

  })

});

// defines gameover screen
scene("gameover", () => {

  // resets viewing angle
  document.querySelector('canvas').style.setProperty("transform", "rotate(0deg)")

  music.stop()
  play("gameover_sound")

  // gameover screen text
  add([
    text("Game Over", 16),
    pos(width() / 2, 120),
    origin("center"),
  ]);

  add([
    text("You are a loser", 32),
    pos(width() / 2, 220),
    origin("center"),
  ]);

  add([
    text("Press space to go again, loser", 16),
    pos(width() / 2, 320),
    origin("center"),
  ]);

  // press space to restart game
  keyPress("space", () => {
    go("game");
    music.play()
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
  add([
    text("L I O N O I L", 20),
    pos(width() / 2, 120),
    origin("center"),
    color(rgb(1, 1, 1))
  ]);

  // starting screen text 2
  add([
    text("Press the space key to begin", 16),
    pos(width() / 2, 180),
    origin("center"),
    color(rgb(1, 1, 1))
  ]);

  // press space to start
  keyPress("space", () => {
    go("game");
    music.play()
  });

})

// default action on page load - start screen
go("start")
