import { Skeleton } from '@/components'
import { Table } from '@radix-ui/themes'
import IssueAction from './IssueAction'

const LoadingPage = () => {

    const issuse = [1, 2, 3, 4, 5]

    return (

        <>
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
                            <Table.Row key={issue}>
                                <Table.Cell >
                                    <Skeleton />
                                    <div className='block md:hidden'>
                                        <Skeleton />
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='hidden md:table-cell bg-red-500'>
                                    <Skeleton />
                                </Table.Cell>
                                <Skeleton />
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table.Root>
        </>
    )
}

export default LoadingPage