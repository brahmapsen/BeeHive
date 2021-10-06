import Head from '../components/auction/head'
//import readMe from '../README.md'
const readMe = 'hello';

import Markdown from '../components/auction/Markdown'
import { PageWrapper } from '../styles/comps'

export default function About() {
  return (
    <>
      <Head title={'About'} />
      <PageWrapper>
        <Markdown markdown={readMe}/>
      </PageWrapper> 
    </>
  )
}
