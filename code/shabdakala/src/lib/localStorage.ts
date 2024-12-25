import { ZCombo } from "./internal/ZCombo"
import { ZAttempt } from "./internal/ZAttempt"
import { iGame } from "./internal/iGame"

// const gameStateKey = 'gameState2'

// type StoredGameState = {
//   guesses: string[]
//   solution: string
// }

// export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  // localStorage.setItem(gameStateKey, JSON.stringify(gameState))
// }

// export const loadGameStateFromLocalStorage = () => {
  // const state = localStorage.getItem(gameStateKey)
  // return state ? (JSON.parse(state) as StoredGameState) : null
// }

// const gameStatKey = 'gameStats2'

// export type GameStats = {
//   winDistribution: number[]
//   gamesFailed: number
//   currentStreak: number
//   bestStreak: number
//   totalGames: number
//   successRate: number
// }

// export const saveStatsToLocalStorage = (gameStats: GameStats) => {
//   localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
// }

// export const loadStatsFromLocalStorage = () => {
//   const stats = localStorage.getItem(gameStatKey)
//   return stats ? (JSON.parse(stats) as GameStats) : null
// }

//changed by Ahana and Nandini`
// export type TestStorage = {
  // currentTime: string
  // randomNumber: number
// }
// const testStorageKey = 'testStorage'

// export const saveTestStorage = (testStorageParameter: TestStorage) => {
  // localStorage.setItem(testStorageKey, JSON.stringify(testStorageParameter))
// }

// export const loadTestStorage = () => {
  // const loadedTest = localStorage.getItem(testStorageKey)
  // return loadedTest ? (JSON.parse(loadedTest) as TestStorage) : null
// }

//Final schema of local storage
//Add Lives Remaining 
export type GameStorage = {
  comboStorage: ZCombo;
  solvedThemesStorage: string[];
  remainingLives: number;
  attempts: ZAttempt[];
  timeSpentSeconds: number;
}

const gameStorageKey = 'GameStorage'

export const saveGameStorage = (GameStorageParameter: GameStorage) => {
  localStorage.setItem(gameStorageKey, JSON.stringify(GameStorageParameter))
}

export const loadGameStorage = () => {
  const loadedGame = localStorage.getItem(gameStorageKey)
  return loadedGame ? (JSON.parse(loadedGame) as GameStorage) : null
}

// ------------------------------
// Shabdabandha stats
// ------------------------------
const ShabdabandhaStatsKey = 'shabdabandhaStats'
export type ShabdabandhaStats = {
  totalGames: number;
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  successRate: number;
  attemptsRequired: number[];
}

export const loadShabdabandhaStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(ShabdabandhaStatsKey)
  return stats ? (JSON.parse(stats) as ShabdabandhaStats) : {
    totalGames: 0,
    gamesFailed: 0,
    currentStreak: 0,
    bestStreak: 0,
    successRate: 0,
    attemptsRequired: Array.from(new Array(6), () => 0),
  }
}

export const saveShabdabandhaStatsToLocalStorage = (game : iGame) => {
  const stats = loadShabdabandhaStatsFromLocalStorage();

  stats.totalGames += 1
  if (game.isLost()) {
    stats.gamesFailed += 1
    stats.currentStreak = 0
  } else {
    const count = game.attempts.length
    stats.attemptsRequired[count] += 1
    stats.currentStreak += 1
    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }
  stats.successRate = Math.round((100 * (stats.totalGames - stats.gamesFailed)) / Math.max(stats.totalGames, 1));

  localStorage.setItem(ShabdabandhaStatsKey, JSON.stringify(stats))
} 
