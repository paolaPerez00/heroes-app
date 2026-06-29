import { describe, expect, test, vi } from "vitest";
import { getHeroAction } from "./get-hero.action";
import { heroApi } from "../api/heroe.api";

vi.mock("../api/heroe.api", () => ({
    heroApi: {
        get: vi.fn()
    }
}));

const mockedHeroApi = vi.mocked(heroApi);

describe('getHeroAction', () => {
    test('should fetch hero data and return with complete image url', async () => {
        const mockHero = {
            id: 1,
            name: 'Clark Kent',
            slug: 'clark-kent',
            image: 'clark-kent.jpg'
        };

        mockedHeroApi.get.mockResolvedValue({ data: mockHero });

        const result = await getHeroAction('clark-kent');

        expect(mockedHeroApi.get).toHaveBeenCalledWith('/clark-kent');
        expect(result).toEqual({
            ...mockHero,
            image: expect.stringContaining('clark-kent.jpg')
        });
    });

    test('should throw an error if hero is not found ', async () => {
        mockedHeroApi.get.mockRejectedValue(new Error('Not found'));
        await expect(getHeroAction('123')).rejects.toThrow();
    })
})