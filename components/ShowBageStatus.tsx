import React from 'react'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROCESS: { label: 'In Process', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

const ShowBageStatus = ({ status }: { status: Status }) => {
    return (
        <Badge variant="soft" color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge >
    )
}

export default ShowBageStatus