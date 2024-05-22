import { Status } from '@prisma/client'
import { Flex, Card, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
    open: number,
    Inprogress: number,
    closes: number

}

const SummaryIssue = ({open, Inprogress, closes}:Props) => {

    const containers: {label:string, value: number, status : Status}[] = [
        {
            label:'Open Issues', value : open, status: 'OPEN'
        },
        {
            label:'In Progress', value : Inprogress, status: 'IN_PROCESS'
        },
        {
            label:'Closed', value : closes, status: 'CLOSED'
        },
    ]

  return (
   <Flex gap='4'>
    {containers.map(contianer => {
        return (
            <Card key={contianer.label}>
                <Flex direction='column'>
                    <Link className='font-medium text-sm' href={`/issues/list?status=${contianer.status}`}>{contianer.label}</Link>
                    <Text size="5" className='font-bold'>{contianer.value}</Text>
                </Flex>
            </Card>
        )
    })}
   </Flex>
  )
}

export default SummaryIssue