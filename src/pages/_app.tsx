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
import "styles/globals.css"
import { NextPageWithLayout } from "./page"
import "../assets/styles/app.scss"

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}
const cache = createCache({
  key: "css",
  prepend: true
})
//checking is authenticated
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useNProgress()
  const getLayout = Component.getLayout || ((page) => page)
  if (isBrowser()) {
    store.dispatch(checkLogin())
  }
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
