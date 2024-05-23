

import dynamic from 'next/dynamic'
import IssueSkeleton from './loading'

const IssueForm = dynamic(() => import('../components/IssueForm'), { 
    ssr: false,
    loading: () => <IssueSkeleton/>
 })

const NewIssuePage = () => {

    return (
        <IssueForm />

    )
}

export default NewIssuePage