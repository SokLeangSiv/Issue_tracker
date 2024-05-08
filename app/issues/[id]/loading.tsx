import ShowBageStatus from '@/components/ShowBageStatus'
import { Box, Heading, Card, Text } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>  {/** Box is a div with some extra styles */}
      <Skeleton />

      <div className="flex gap-x-4 mb-4">

           <Skeleton width='3rem'/>
           <Skeleton width='6rem'/>
        
      </div>
      <Card >
        <Skeleton count={5}/>
      </Card>

    </Box>
  )
}

export default LoadingIssueDetailPage