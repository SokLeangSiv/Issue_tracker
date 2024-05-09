"use client "
import { usePathname } from 'next/navigation'
import { Table, } from '@radix-ui/themes'
import { Link, ShowBageStatus } from '@/components'
import React from 'react'

import prisma from '@/prisma/client'
import delay from 'delay'
import IssueAction from './IssueAction'

const IssuePage = async () => {

  const issuse = await prisma.issue.findMany()

  await delay(2000)


  return (
    <div>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {issuse.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell >
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                  </Link>
                  <div className='block md:hidden'>
                    <ShowBageStatus status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell bg-red-500'>
                  <ShowBageStatus  status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.created_at.toDateString()}</Table.Cell>
              </Table.Row>
            )
          })}

        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuePage