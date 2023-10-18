import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { DeckPack } from '@/features/deck-pack'
import { Cards } from '@/features/cards/Cards.tsx'
import { Login } from '@/features/login'
import { useMeQuery } from '@/services/auth-service/auth-service.ts'
import { Header } from '@/components/ui/header'
import { Registration } from '@/features/registration'
import { RecoverPassword } from '@/features/recoverPassword'
import { CheckEmailCard } from '@/components/auth/check-email-card'
import { ResetPassword } from '@/features/resetPassword'
import { PageNotFound } from '@/components/ui/404'
import { CardPage } from '@/features/CardPage'

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
    element: <DeckPack />,
  },
  {
    path: '/cards',
    element: <Cards />,
  },
  {
    path: '/learn/:deckName/:deckId',
    element: <CardPage />,
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
