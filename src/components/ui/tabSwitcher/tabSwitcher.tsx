import * as Tabs from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'


export type TabType = {
    id: string,
    title: string,
    titleClassname?: string,
    disabledTab?: boolean,
    defaultTab?: boolean,
}

export type TabSwitcherProps = {
    orientation?: 'vertical' | 'horizontal',
    tabs: TabType[],
    setActiveTab?: (id: string) => void,
}

export const TabSwitcher = (
    props: TabSwitcherProps
) => {
    const {orientation = 'horizontal', tabs, setActiveTab } = props

    const defaultTab = tabs.find(tab => tab.defaultTab)

    return (
        <Tabs.Root defaultValue={defaultTab?.id} orientation={orientation}>
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
                            {tab.title}
                        </Tabs.Trigger>
                    )
                })}
            </Tabs.List>
        </Tabs.Root>
    )
}
