import React, {lazy,Suspense} from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/pages/layout/index'
const Home = lazy(() => import('@/pages/home/index'))
const Login = lazy(() => import('@/pages/login/index'))


const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Suspense fallback={'加载中,,,'}>
                    <Home />
                </Suspense>
            },
            {
                path: '/home',
                element: <Suspense fallback={ '加载中,,,'}><Home /></Suspense>
            },
            {
                path: '/login',
                element: <Suspense fallback={ '加载中,,,'}><Login /></Suspense>
            }
        ]
    },
])

const root = document.querySelector('#app');
if(root) {
    createRoot(root).render(
        <React.StrictMode>
            <RouterProvider router={router}>
                {/* <App/> */}
            </RouterProvider>
      </React.StrictMode>
  )
}
