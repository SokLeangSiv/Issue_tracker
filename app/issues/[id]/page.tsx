import { ShowBageStatus } from '@/components'
import prisma from '@/prisma/client'
import { Box, Card, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'


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

        <Grid columns={{ initial: "1", md: "2" }} gap='5' >
            <Box>
                <IssueDetail issue={issue} />
            </Box>

            <Box >
                <EditIssueButton issueId={issue.id} />
            </Box>

        </Grid>
    )
}



export default IssueDetailPage