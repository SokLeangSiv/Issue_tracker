import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'

import React from 'react'

const IssueStatus = () => {

    const issueStatus : {label: string, value?: Status}[] = [
    {
        label: 'All',
        
    },
    {
        label: 'Open',
        value: "OPEN"
    },
    {
        label: 'In Process',
        value: "IN_PROCESS"
    },
    {
        label: 'CLOSED',
        value: "CLOSED"
    
    }
]

    return (
        <Select.Root>
            <Select.Trigger placeholder='All'>Open</Select.Trigger>
            <Select.Content>
                {issueStatus.map((status) => (
                    <Select.Item key={status.label} value={status.value}>{status.label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatus