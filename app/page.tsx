import { Grid, Flex } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import LatestIssue from "./LatestIssue";
import SummaryIssue from "./SummaryIssue";
import prisma from '@/prisma/client';


export default async function Home({ searchParams }: { searchParams: { page: string } }) {

  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProcess = await prisma.issue.count({ where: { status: 'IN_PROCESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="2">
      <Flex direction="column" gap="5">
        <SummaryIssue open={open} Inprogress={inProcess} closes={closed} />
        <IssueChart open={open} Inprogress={inProcess} closes={closed} />
      </Flex>
      <LatestIssue/>
    </Grid>
  );
}
