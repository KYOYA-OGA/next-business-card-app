import { AppProps } from 'next/dist/shared/lib/router/router'
import 'tailwindcss/tailwind.css'
import { Provider } from 'next-auth/client'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
