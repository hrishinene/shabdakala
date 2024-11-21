import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus,
  size?: string
  onChar?: (value: string) => void
}

export const Cell = ({ value, status, size = 'small', onChar}: Props) => {
  const classes = classnames(
    'border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'shadowed bg-lime-500 text-white border-lime-500': status === 'correct',
      'shadowed bg-yellow-500 dark:bg-yellow-700 text-white border-yellow-500 dark:border-yellow-700':
        status === 'present',
      'cell-animation': !!value,
      'w-16 h-12': size === 'big',
      'w-14 h-10': size === 'small',
      'w-12 h-8': size === 'micro',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onChar && value)
      onChar(value)
    event.currentTarget.blur()
  }
  //return <div className={classes}>{value}</div>
  // Make it a button instead of div cell - so that itls 
  return <button className={classes} onClick={handleClick}>{value}</button>
}
