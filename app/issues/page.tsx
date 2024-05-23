
import { Link, ShowBageStatus } from '@/components'
import prisma from '@/prisma/client'
import { Button, Table, } from '@radix-ui/themes'
import delay from 'delay'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import IssueAction from './IssueAction'

import { Issue, Status } from '@prisma/client'
import { getServerSession } from 'next-auth'
import authOption from '../auth/authOption'
import Pagination from '@/components/Pagination'

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue, page: string }

}


const IssuePage = async ({ searchParams }: Props) => {


  const columnSort: { label: string, value: keyof Issue, className?: string }[] = [
    {
      label: "Title", value: "title"
    },

    {
      label: "Status", value: "status", className: "hidden md:table-cell"
    },

    {
      label: "Created", value: "created_at", className: "hidden md:table-cell"
    }
  ]


  //get  session in use client

  const session = await getServerSession(authOption)
  //validate if the user provide wrong status

  const issueStatus = Object.values(Status);

  console.log(issueStatus)
  const status = issueStatus.includes(searchParams.status) ? searchParams.status : undefined

  const orderBy = columnSort.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;


  const issuse = await prisma.issue.findMany({

    where: {
      status
    },

    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const IssueCount = await prisma.issue.count(
    {
      where: {
        status
      }
    })

  await delay(2000)

  // convert deleteissueButton to dynamic
  const DeleteIssueButton = dynamic(() => import('./[id]/DeleteIssueButton'), {
    ssr: false
  })


  return (
    <div>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>

            {columnSort.map((column) => {
              return (
                <Table.ColumnHeaderCell key={column.value}>
                  <NextLink href={
                    {
                      query: { ...searchParams, orderBy: column.value }
                    }
                  }>

                    {column.label}
                  </NextLink>
                  {column.value === searchParams.orderBy && '🔼'}
                </Table.ColumnHeaderCell>
              )
            })}

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
                  <ShowBageStatus status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.created_at.toDateString()}</Table.Cell>
                {session && <Table.Cell className='hidden md:table-cell'>
                  <Button color='gray' variant='classic' >
                    <Link href={`/issues//edit/${issue.id}`}>
                      Edit
                    </Link>
                  </Button>

                  <Button color='red'>
                    <DeleteIssueButton issueId={issue.id} />
                  </Button>
                </Table.Cell>}
              </Table.Row>
            )
          })}

        </Table.Body>
      </Table.Root>

      <Pagination pageSize={pageSize} currentPage={page} itemCount={IssueCount} />
    </div>
  )
}

export const revalidate = false

export default IssuePage