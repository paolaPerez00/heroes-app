import { AdminPage } from '@/admin/pages/AdminPage';
import { AdminLayout } from '@/admin/pages/layouts/AdminLayout';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { SearchPage } from '@/heroes/pages/search/SearchPage';
import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter([
    {
        path: '/',
        element: < HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/heroes/:idSlug',
                element: <HeroPage />
            },
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <Navigate to="/" />
            },
        ]
    },
    {
        path: '/admin',
        element: < AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    }
])