import * as Tabs from '@radix-ui/react-tabs'
import { Typography } from '@/components/ui/typography'
import s from './TabSwitcher.module.scss'

export type TabType = {
  id: string
  title: string
  titleClassname?: string
  disabledTab?: boolean
  defaultTab?: boolean
}

export type TabSwitcherProps = {
  label?: string
  orientation?: 'vertical' | 'horizontal'
  tabs: TabType[]
  setActiveTab?: (id: string) => void
}

export const TabSwitcher = (props: TabSwitcherProps) => {
  const { orientation = 'horizontal', tabs, setActiveTab, label } = props

  const defaultTab = tabs.find(tab => tab.defaultTab)

  return (
    <Tabs.Root className={s.root} defaultValue={defaultTab?.id} orientation={orientation}>
      <Typography className={s.label} variant={'body2'}>
        {label}
      </Typography>
      <Tabs.List aria-label="tabs">
        {tabs.map((tab, index, tabs) => {
          const finalClassName = `${s.tab}
                     + ' ' + ${index === 0 ? s.firstTab : ''}
                     + ' ' + ${index === tabs.length - 1 ? s.lastTab : ''}
                     + ' ' + ${tabs.length === 1 ? s.singleTab : ''}
                     + ' ' + ${tab.titleClassname}
                     `

          return (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={finalClassName}
              onClick={setActiveTab ? () => setActiveTab(tab.id) : undefined}
              disabled={tab.disabledTab}
            >
              <Typography variant={'body1'}>{tab.title}</Typography>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}
