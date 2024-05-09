import { ShowBageStatus } from '@/components'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import DeleteIssueButton from './DeleteIssueButton'


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

        <Grid columns={{ initial: "1", sm: "5" }} gap='5' >
            <Box className='md:col-span-4'>
                <IssueDetail issue={issue} />
            </Box>

            <Box >
                <Flex direction={'column'} gap='3'>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>

        </Grid>
    )
}



export default IssueDetailPage