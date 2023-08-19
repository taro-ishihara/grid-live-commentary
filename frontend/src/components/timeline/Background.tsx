import { xor } from '../../utilities/xor'

type Props = {
  numPlayers: number
  reverse: boolean
}

const Background = (props: Props) => {
  const numPlayers = props.numPlayers
  const reverse = props.reverse

  const rows = Array.from({ length: numPlayers }, () => (
    <div className="h-6"></div>
  ))

  return (
    <div>
      {Array.from({ length: 2 }, (_, index) => (
        <div
          className={`${
            xor(!Boolean(index), reverse) ? 'bg-indigo-100' : 'bg-rose-100'
          } my-2 divide-y divide-slate-400 border border-l-0 border-slate-500`}
        >
          {rows}
        </div>
      ))}
    </div>
  )
}

export { Background }
