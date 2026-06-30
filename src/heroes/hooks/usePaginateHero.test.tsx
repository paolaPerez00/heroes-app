import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePaginateHero } from "./usePaginateHero";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.actions";
import type { HeroesResponse } from "../types/get-heroes.response";

vi.mock('../actions/get-heroes-by-page.actions', () => ({
    getHeroesByPageAction: vi.fn()
}))

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

const tanStackCustomProvider = () => {
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('usePaginateHero', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    })

    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => usePaginateHero(1, 6), {
            wrapper: tanStackCustomProvider()
        })
        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();
    })

    test('should return success state with data then API call succeeds', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        } as HeroesResponse;
        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginateHero(1, 6), {
            wrapper: tanStackCustomProvider()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        })
        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');
    })

    test('should call getHeroesByPageActions with arguments', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        } as HeroesResponse;
        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginateHero(2, 16, 'heroes'), {
            wrapper: tanStackCustomProvider()
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        })
        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, 'heroes');
    })

})