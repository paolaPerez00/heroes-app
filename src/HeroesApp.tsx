import { RouterProvider } from "react-router"
import { router } from "./router/app.router"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext"

// Create a client
const queryClient = new QueryClient()

export const HeroesApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </FavoriteHeroProvider>
    </QueryClientProvider>

  )
}
