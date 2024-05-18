'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import React from 'react'

const IssueStatus = () => {

    const issueStatus: { label: string, value?: Status }[] = [
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

    const router = useRouter()

    return (
        <Select.Root onValueChange={(status) => {
            const query = status === "All" ? "" : `?status=${status}`
            router.push('/issues/list' + query)
        }}>
            <Select.Trigger placeholder='All'/>
            <Select.Content>

                {issueStatus.map((status) => {
                    return (
                        <Select.Item key={status.label} value={status.value || "All"}>{status.label}</Select.Item>
                    )
                })}

            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatus