import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { fireEvent, render, screen } from "@testing-library/react";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock('@/heroes/hooks/usePaginateHero.tsx');

const mockUsePaginatedHero = vi.mocked(usePaginateHero);

mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof mockUsePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter >
    )
}

describe('HomePage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should render HomePage with default values', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    })

    test('should hook usePaginateHero with default values', () => {
        renderHomePage();
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
    })

    test('should hook usePaginateHero with custom query params', () => {
        renderHomePage(['/?page=2&limit=10&category=villains']);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'villains');
    })

    test('should hook usePaginateHero with default page and same limit on tab clicked', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);
        const [, , , villains] = screen.getAllByRole('tab');
        fireEvent.click(villains);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
    })
})