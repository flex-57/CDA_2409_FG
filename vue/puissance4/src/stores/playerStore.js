import { defineStore } from 'pinia'
import { Player } from '@/classes/Player'

export const usePlayerStore = defineStore('playerStore', {
    state: () => ({
        player1: new Player('', 'red'),
        player2: new Player('', 'yellow'),
    }),
    actions: {
        savePlayers() {
            Player.saveToSession('player1', this.player1)
            Player.saveToSession('player2', this.player2)
        },
        loadPlayers() {
            this.player1 = Player.loadFromSession('player1')
            this.player2 = Player.loadFromSession('player2')
        },
    },
})
