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
const queryClient = new QueryClient()

if (isBrowser()) {
  store.dispatch(checkLogin())
}
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { i18n } = useTranslation()

  useNProgress()
  const getLayout = Component.getLayout || ((page) => page)
  useEffect(() => {
    i18n.changeLanguage(
      localStorage.getItem(LOCALSTORAGE.LANGUAGE) || LANGUAGE.ENGLISH
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayoutBase>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <Provider store={store}>
              {getLayout(
                <Hydrate state={pageProps.dehydratedState}>
                  <CacheProvider value={cache}>
                    <StyledEngineProvider injectFirst>
                      <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                      </ThemeProvider>
                    </StyledEngineProvider>
                  </CacheProvider>
                </Hydrate>
              )}
            </Provider>
          </GoogleOAuthProvider>
        </LayoutBase>
      </QueryClientProvider>
    </>
  )
}
