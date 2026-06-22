import {
    Heart,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { useSearchParams } from "react-router"
import { useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero"

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains']
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab])

    const { data: heroesResponse } = usePaginateHero(+page, +limit);
    const { data: summary } = useHeroSummary();

    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Universo de SuperHeroes"
                description="Descubre, edxplora y administra super heroes y villanos"
            />

            <CustomBreadcrumb currentaPage="Super Heroes" />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Tabs */}
            <Tabs value={selectedTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="all"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'all');
                            return prev;
                        })}
                    >All Characters ({summary?.totalHeroes})</TabsTrigger>
                    <TabsTrigger value="favorites"
                        className="flex items-center gap-2"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'favorites');
                            return prev;
                        })}
                    >
                        <Heart className="h-4 w-4" />
                        Favorites (3)
                    </TabsTrigger>
                    <TabsTrigger value="heroes"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'heroes');
                            return prev;
                        })}
                    >Heroes ({summary?.heroCount})</TabsTrigger>
                    <TabsTrigger value="villains"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'villains');
                            return prev;
                        })}
                    >Villains ({summary?.villainCount})</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <HeroGrid heroes={heroesResponse?.heroes} />
                    <h1>Todos los personajes</h1>
                </TabsContent>
                <TabsContent value="favorites">
                    <HeroGrid />
                    <h1>Favoritos</h1>
                </TabsContent>
                <TabsContent value="heroes">
                    <HeroGrid />
                    <h1>Héroes</h1>
                </TabsContent>
                <TabsContent value="villains">
                    <HeroGrid />
                    <h1>Villanos</h1>
                </TabsContent>
            </Tabs>

            {/* Character Grid */}
            {/* <HeroGrid /> */}

            {/* Pagination */}
            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        </>
    )
}
