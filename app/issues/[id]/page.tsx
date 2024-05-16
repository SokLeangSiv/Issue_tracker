import authOption from '@/app/auth/authOption'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import AssignSelect from './AssignSelect'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'


type IssueDetailPageProps = {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {

    const  session = await getServerSession(authOption);

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

            {session && <Box >
                <Flex direction={'column'} gap='3'>
                    <AssignSelect issue={issue}/>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}

        </Grid>
    )
}



export default IssueDetailPage