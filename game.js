export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        state.players[command.playerId] = {
            x: command.playerX,
            y: command.playerY
        }
    }

    function removePlayer(command) {
        delete state.players[command.playerId]
    }

    function addFruit(command) {
        state.fruits[command.fruitId] = {
            x: command.fruitX,
            y: command.fruitY
        }
    }

    function removeFruit(command) {
        delete state.fruits[command.fruitId]
    }

    function movePlayer(command) {
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
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}