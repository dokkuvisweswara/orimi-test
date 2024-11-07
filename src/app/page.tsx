
import Dashboard from '@/containers/dashboard/dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ORI MI',
}
 
export default function Home(props: any) {
  return ( <Dashboard screenIdParam={'HOME'}></Dashboard>)
}
