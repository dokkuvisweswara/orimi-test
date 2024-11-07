
import Image from 'next/image'
export default function MainPlayer() {
  return (
    <main className="flex flex-col h-screen overflow-hidden  text-primaryColor bg-primaryBgColor">
      <div className="top-0 right-0 p-12">
        <div className='mb-20'>
          <p className="text-xs">PLAYING FROM PLAYLIST</p>
          <p className="">Isolation</p>
        </div>
        <div className='flex justify-between mt-20'>
          <div className="w-40 h-40 bg-dotsLoaderBgColor rounded-md">
          </div>
          <div className="text-sm">
            <p>I watch the current moving through her</p>
            <p>I watch the current moving through her</p>
            <p>I watch the current moving through her</p>
            <p>I watch the current moving through her</p>
            <p>I watch the current moving through her</p>
          </div>
        </div>

        <div className='mt-20 mb-20'>
          <h1 className='mt-10'>out of the sight</h1>
          <p>Tyler Shaw</p>
        </div>


      </div>
    </main>


  )
}