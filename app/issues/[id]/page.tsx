import { ShowBageStatus } from '@/components'
import prisma from '@/prisma/client'
import { Box, Button, Card, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkDown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'


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

        <Grid columns={{ initial: "1", md: "2" }} >
            <Box>
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
            </Box>

            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>Edit button</Link>
                </Button>
            </Box>

        </Grid>
    )
}

export default IssueDetailPage