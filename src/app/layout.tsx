import WrapperLayout from '@/(layout)/v1/_layout';
import './globals.css';
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { lang: string }
})  {
  return ( <WrapperLayout params={params}>{children}</WrapperLayout>)
}
