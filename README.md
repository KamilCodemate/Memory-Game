# Memory Game

### Multiplayer Memory Game made with React, Node, Express, TypeScript

<br>

## Running the Game

#### Reqirements:

* Node.js at least in version 18.0.0


#### Steps:

1. Download or clone the repository
2. You can simply run `git clone git@github.com:KamilCodemate/Memory-Game.git`
3. Run `npm ci` both in the `/client` and `/server` directories
4. You may to install typscript globally `npm install -g typescript`
5. Run `npm run start` both in the `/client` and `/server` directiories

## Testing/Playing

#### Playing on one machine

The game uses localStorage to save important game data which means it is impossible to play the game in diffrent windows of the same browser. You may need to use the second browser is you would like to run the game on one machine.

#### Playing on diffrent machines

It is possible to play the game on diffrent machines. The first option is host the app in the remote server. The second option is provide IPv4 adress in the url bar instead of `localhost` keyword. Both devices must be connected to the same network.

## Solving Problems

#### OS Execution Policy

On Windows: When starting the project, specifically when starting the local server, you may run into an error saying `"execution of scripts is disabled on this system"` or something like that. Then open powershell in administrator mode and type `Set-ExecutionPolicy RemoteSigned`. This will allow you to run all sorts of scripts on your computer needed to run the local server. This mode increases the vulnerability of the computer to malware attacks, so it is recommended to set the old value back after use using `Set-ExecutionPolicy Restricted`.

#### Other problems or bugs

Notify me of them via `kamil.codemate@gmail.com`
