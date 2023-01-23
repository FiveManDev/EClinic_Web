import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import "styles/globals.css"
import { NextPageWithLayout } from "./page"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { theme } from "shared/theme/theme"
import { Provider } from "react-redux"
import { store } from "store/store"
interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}
const cache = createCache({
  key: "css",
  prepend: true
})
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <Provider store={store}>
      <CacheProvider value={cache}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </Provider>
  )
}
