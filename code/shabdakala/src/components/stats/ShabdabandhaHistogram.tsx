import { GameStats, ShabdabandhaStats } from '../../lib/localStorage'
import { Progress } from './Progress'

type Props = {
  gameStats: ShabdabandhaStats
}

export const ShabdabandhaHistogram = ({ gameStats }: Props) => {
  const winDistribution = gameStats.attemptsRequired
  const maxValue = Math.max(...winDistribution)

  return (
    <div className="columns-1 justify-left m-2 text-sm dark:text-white">
      {winDistribution.map((value, i) => (
        value > 0 ? (
          <Progress
            key={i}
            index={i}
            size={90 * (value / maxValue)}
            label={String(value)}
          />
        ) : null
      ))}
    </div>
  )
}
