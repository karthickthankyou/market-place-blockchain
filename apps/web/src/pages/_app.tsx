import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const a = 0
  a = ''
  return <Component {...pageProps} />
}
