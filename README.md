# Creator Game Engine

## Installation

Project structure:

```web-games/``` - general directory (any name)

- ```creator/``` - game engine

- ```games/``` - clone games to this folder

Run installation in the engine and each game folder:
   ```
cd creator && npm install
   ```
   ```
cd games/<your_game_name> && npm install
   ```

## Game Build

In game folder ```games/<your_game_name>/package.json``` you can find ```build``` command and run:
```bash
npm run build
```

The output is found in ```games/<your_game_name>/build```

## Launch game

Start the game using ```index.html``` in game ```games/<your_game_name>/build/``` folder
