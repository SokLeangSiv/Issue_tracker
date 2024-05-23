import { Issue } from '@prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import prisma from '@/prisma/client';
import React from 'react'
import Link from 'next/link';
import IssueStatus from './issues/IssueStatus';
import { ShowBageStatus } from '@/components';



const LatestIssue = async () => {

    const issues = await prisma.issue.findMany({
        take: 5,
        orderBy: {
            created_at: 'desc'
        },

        include:{
            assignToUser:true  // use this for call the user image when we call the issue that we have relation them in schema like relationship
        }
    })

    return (
        <Card>
            <Heading size='4' mb='5'>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => {
                        return (
                            <Table.Row key={issue.id}>
                                <Table.Cell>
                                    <Flex justify='between'>
                                        <Flex direction="column" align='start' gap='2'>

                                            <Link href={`/issues/${issue.id}`}>
                                                {issue.title}

                                            </Link>

                                            <ShowBageStatus status={issue.status} />  
                                        </Flex>

                                        {issue.assignToUser && <Avatar src={issue.assignToUser.image!}  alt='image'  fallback="?" />}  
                                    </Flex>
                                </Table.Cell>

                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssue