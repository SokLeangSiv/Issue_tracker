import prisma from '@/prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import ShowBageStatus from '@/components/ShowBageStatus'
import ReactMarkDown from 'react-markdown'


type IssueDetailPageProps = {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }


    })

    if (!issue) {
        notFound();
    }



    return (
        <div>
            <Heading as='h2'>{issue.title}</Heading>

            <div className="flex gap-x-4 mb-4">

                <ShowBageStatus status={issue.status} />
                <Text>{issue.created_at.toDateString()}</Text>
            </div>
            <Card >
                <ReactMarkDown className='prose lg:prose-xl'>

                {issue.description}
                </ReactMarkDown>
            </Card>

        </div>
    )
}

export default IssueDetailPage