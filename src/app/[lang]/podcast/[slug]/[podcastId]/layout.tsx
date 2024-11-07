
// import { actGetMetaData } from '@/services/actions/init.action';
// import type { Metadata } from 'next'

// type Props = {
//     params: { podcastId: string }
//   }

//   export async function generateMetadata(
//     { params }: Props,
//   ): Promise<Metadata> {
//     let payLoad = {
//       id: params.podcastId
//     }
//     const product = await actGetMetaData(payLoad);
//     const title = (product && product.title)  ? `Listen ${product.title} on ORI MI` : 'ORI MI';   
//     return {
//       title: title,
//       openGraph: {
//         images: [product.thumbnail],
//       },
//     }
//   }
 
  
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { lang: string}
})  {
    
  return ( <>{children}</>)
}
