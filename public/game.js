export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        observers.forEach(observerFunction => {
            observerFunction(command)
        })
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

        state.players[command.playerId] = {
            x: playerX,
            y: playerY
        }

        notifyAll({
            type: 'add-player',
            playerId: command.playerId,
            playerX,
            playerY
        })
    }

    function removePlayer(command) {
        delete state.players[command.playerId]
        
        notifyAll({
            type: 'remove-player',
            playerId: command.playerId,
        })
    }

    function addFruit(command) {
        const fruitX = 'fruitX' in command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = 'fruitY' in command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

        state.fruits[command.fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        delete state.fruits[command.fruitId]
    }

    function movePlayer(command) {
        notifyAll(command)
        
        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0)
                    player.y -= 1
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height)
                    player.y += 1
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0)
                    player.x -= 1
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width)
                    player.x += 1
            }
        }

        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[command.keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollisionV1(command.playerId)
        }
    }

    function checkForFruitCollisionV1(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId })
            }
        }
    }

    return {
        setState,
        subscribe,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}