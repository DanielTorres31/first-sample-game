export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')

    clearScreen(context)

    drawPlayers(game, context)
    drawFruits(game, context)
    
    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        drawCurrentPlayer(currentPlayer, context)
    }

    requestAnimationFrame(() => 
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    )
}

function drawPlayers(game, context) {
    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }
}

function drawFruits(game, context) {
    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }
}

function clearScreen(context) {
    context.clearRect(0, 0, 10, 10)
}

function drawCurrentPlayer(currentPlayer, context) {
    context.fillStyle = '#F0DB4F'
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
}