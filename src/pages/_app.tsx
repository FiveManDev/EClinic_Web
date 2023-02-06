import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import { useNProgress } from "hooks/useNProgress"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { isBrowser } from "shared/helpers/helper"
import { theme } from "shared/theme/theme"
import { checkLogin } from "store/module/auth/action-creators"
import { store } from "store/store"
import "styles/globals.scss"
import { NextPageWithLayout } from "./page"
import "../assets/styles/app.scss"
import "i18n/i18n"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { LANGUAGE, LOCALSTORAGE } from "shared/constant/constant"

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
      <Provider store={store}>
        {getLayout(
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <CacheProvider value={cache}>
                <StyledEngineProvider injectFirst>
                  <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                  </ThemeProvider>
                </StyledEngineProvider>
              </CacheProvider>
            </Hydrate>
          </QueryClientProvider>
        )}
      </Provider>
    </>
  )
}
