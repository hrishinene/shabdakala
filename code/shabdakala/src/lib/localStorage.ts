import { ZCombo } from "./internal/ZCombo"
import { ZAttempt } from "./internal/ZAttempt"

const gameStateKey = 'gameState2'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats2'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

//changed by Ahana and Nandini
export type TestStorage = {
  currentTime: string
  randomNumber: number
}
const testStorageKey = 'testStorage'

export const saveTestStorage = (testStorageParameter: TestStorage) => {
  localStorage.setItem(testStorageKey, JSON.stringify(testStorageParameter))
}

export const loadTestStorage = () => {
  const loadedTest = localStorage.getItem(testStorageKey)
  return loadedTest ? (JSON.parse(loadedTest) as TestStorage) : null
}

//Final schema of local storage
//Add Lives Remaining 
export type GameStorage = {
  comboStorage: ZCombo;
  solvedThemesStorage: string[];
  remainingLives: number;
  attempts: ZAttempt[];
}

const gameStorageKey = 'GameStorage'

export const saveGameStorage = (GameStorageParameter: GameStorage) => {
  localStorage.setItem(gameStorageKey, JSON.stringify(GameStorageParameter))
}

export const loadGameStorage = () => {
  const loadedGame = localStorage.getItem(gameStorageKey)
  return loadedGame ? (JSON.parse(loadedGame) as GameStorage) : null
}
