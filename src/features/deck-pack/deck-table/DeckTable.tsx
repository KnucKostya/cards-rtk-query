import { Table } from '@/components/ui/tables'
import { TableRow } from '@/components/ui/tables/TableRow'
import { TableBody } from '@/components/ui/tables/TableBody'
import { TableCell } from '@/components/ui/tables/TableCell'
import { TableHeadCellWithSort } from '@/components/ui/tables/SortTableHeader'
import { PlayCardIcon } from '@/assets/icons/components/PlayCardIcon.tsx'
import { TableHead } from '@/components/ui/tables/TableHead'
import { EditIcon } from '@/assets/icons/components/EditIcon.tsx'
import { DeleteIcon } from '@/assets/icons/components/DeleteIcon.tsx'
import { TableHeadCell } from '@/components/ui/tables/TableHeadCell'
import { Column, DeckModals } from '@/features/deck-pack'
import { Deck, Sort } from '@/services/deck-service'
import { useNavigate } from 'react-router-dom'
import s from './DeckTable.module.scss'

type Props = {
  onIconClick: (value: DeckModals | null, item: Deck) => void
  className?: string
  data: Deck[]
  sort?: Sort
  setSort?: (value: any) => void
  currentUserId?: string
}

const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'created',
    title: 'Created by',
  },
]

export const DeckTable = (props: Props) => {
  const { data, className, onIconClick, sort, setSort, currentUserId } = props

  const navigate = useNavigate()

  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          <TableHeadCellWithSort columns={columns} sort={sort} onSort={setSort} />
          <TableHeadCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(deck => {
          return (
            <TableRow key={deck.id}>
              <TableCell
                className={s.deckName}
                onClick={() =>
                  navigate(`${deck.name}/cards`, { state: { id: deck.id, author: deck.author.id } })
                }
              >
                {deck.name}
              </TableCell>
              <TableCell>{deck.cardsCount}</TableCell>
              <TableCell>{new Date(deck.updated).toLocaleDateString()}</TableCell>
              <TableCell>{deck.author.name}</TableCell>
              <TableCell className={s.iconsCell}>
                <div className={s.iconsWrapper}>
                  <PlayCardIcon
                    className={s.icon}
                    onClick={() => navigate(`${deck.name}/learn`, { state: { id: deck.id } })}
                  />
                  <EditIcon
                    onClick={() => onIconClick(DeckModals.UPDATE, deck)}
                    className={currentUserId === deck.author.id ? s.icon : s.disableIcon}
                  />
                  <DeleteIcon
                    onClick={() => onIconClick(DeckModals.DELETE, deck)}
                    className={currentUserId === deck.author.id ? s.icon : s.disableIcon}
                  />
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
