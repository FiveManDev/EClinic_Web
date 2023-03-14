import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import { GoogleOAuthProvider } from "@react-oauth/google"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import { useNProgress } from "hooks/useNProgress"
import "i18n/i18n"
import LayoutBase from "layout/LayoutBase"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Provider } from "react-redux"
import { LANGUAGE, LOCALSTORAGE } from "shared/constant/constant"
import { isBrowser } from "shared/helpers/helper"
import { theme } from "shared/theme/theme"
import { checkLogin } from "store/module/auth/action-creators"
import { store } from "store/store"
import "styles/globals.scss"
import "../assets/styles/app.scss"
import { NextPageWithLayout } from "./page"
interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}
const cache = createCache({
  key: "css",
  prepend: true
})
//checking is authenticated
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { i18n } = useTranslation()

  useNProgress()
  const getLayout = Component.getLayout || ((page) => page)
  useEffect(() => {
    store.dispatch(checkLogin())
    i18n.changeLanguage(
      localStorage.getItem(LOCALSTORAGE.LANGUAGE) || LANGUAGE.ENGLISH
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
            >
              <StyledEngineProvider injectFirst>
                <CacheProvider value={cache}>
                  <ThemeProvider theme={theme}>
                    <LayoutBase>
                      {getLayout(<Component {...pageProps} />)}
                    </LayoutBase>
                  </ThemeProvider>
                </CacheProvider>
              </StyledEngineProvider>
            </GoogleOAuthProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
