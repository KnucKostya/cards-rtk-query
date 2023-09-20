import {useState} from 'react';

import {TabSwitcher} from '@/components/ui/tabSwitcher';

export function App() {
    const [activeTab, setActiveTab] = useState<string>('01');

    const tabs = [
        {
            id: '01',
            title: 'tab 01',
            disabledTab: false,
            defaultTab: true,
        },
        {
            id: '02',
            title: 'tab 02',
            disabledTab: false,
            defaultTab: false,
        },
        {
            id: '03',
            title: 'tab 03',
            disabledTab: false,
            defaultTab: false,
        },
        {
            id: '04',
            title: 'tab 04',
            disabledTab: false,
            defaultTab: false,
        },
        {
            id: '05',
            title: 'tab 05',
            disabledTab: true,
            defaultTab: false,
        },
    ]

    console.log(activeTab);

    return (
        <TabSwitcher
            orientation={'vertical'}
            tabs={tabs}
            setActiveTab={setActiveTab}
        />
    )
}
