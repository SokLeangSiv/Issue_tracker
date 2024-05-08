import { ShowBageStatus } from '@/components'
import { Issue } from '@prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import ReactMarkDown from 'react-markdown'


const IssueDetail = ({issue}: {issue:Issue}) => {
    return (
        <>
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
        </>
    )
}

export default IssueDetail