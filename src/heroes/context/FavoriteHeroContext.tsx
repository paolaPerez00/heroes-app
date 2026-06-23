import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    //state
    favorites: Hero[];
    favoriteCount: number;

    //Methods
    isFavorite: (herp: Hero) => boolean;
    toogleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(
        getFavoritesFromLocalStorage()
    )
    const toogleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);

        if (heroExist) {
            setFavorites(favorites.filter(h => h.id !== hero.id))
            return;
        }
        setFavorites([...favorites, hero])
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

    return (
        <FavoriteHeroContext value={{
            favoriteCount: favorites.length,
            favorites: favorites,
            isFavorite: (hero: Hero) => favorites.some((h) => h.id === hero.id),
            toogleFavorite: toogleFavorite
        }}>
            {children}
        </FavoriteHeroContext>
    )
}

