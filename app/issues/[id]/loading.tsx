import { Skeleton } from '@/components'
import { Box, Card } from '@radix-ui/themes'

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