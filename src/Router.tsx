import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { DeckPack } from '@/features/deck-pack'
import { Login } from '@/features/login'
import { useMeQuery } from '@/services/auth-service/auth-service.ts'
import { Header } from '@/components/ui/header'
import { Registration } from '@/features/registration'
import { CheckEmailCard } from '@/components/auth/check-email-card'
import { PageNotFound } from '@/components/ui/404'
import { ResetPassword } from '@/features/reset-password'
import { RecoverPassword } from '@/features/recover-password'
import { LearnCard } from '@/features/card-learn'
import { CardsPack } from '@/features/cards-pack'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/recover-password',
    element: <RecoverPassword />,
  },
  {
    path: '/check-email',
    element: <CheckEmailCard />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/decks'} />,
  },
  {
    path: '/decks',
    element: <DeckPack />,
  },
  {
    path: '/decks/:deckName/cards',
    element: <CardsPack />,
  },
  {
    path: '/decks/:deckName/learn',
    element: <LearnCard />,
  },
]

const router = createBrowserRouter([
  { element: <PrivateRoutes />, children: privateRoutes },
  { element: <PublicRoutes />, children: publicRoutes },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError } = useMeQuery()

  const isAuthorized = !isError

  if (isAuthorized) {
    return (
      <>
        <Header isAuth={true} />
        <Outlet />
      </>
    )
  } else {
    return <Navigate to="/login" />
  }
}

function PublicRoutes() {
  return (
    <>
      <Header isAuth={false} />
      <Outlet />
    </>
  )
}
