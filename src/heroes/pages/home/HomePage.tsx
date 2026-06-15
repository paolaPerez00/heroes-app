import {
    Heart,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useEffect, useState } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { getHeroesByPage } from "@/heroes/actions/get-heroes-by-page.actions"

export const HomePage = () => {

    useEffect(() => {
        getHeroesByPage().then((heroes) => {
            console.log("heroes ", heroes)
        })
    }, [])


    const [activeTab, setActiveTab] = useState('all');
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
            <Tabs value={activeTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="all"
                        onClick={() => setActiveTab('all')}
                    >All Characters (16)</TabsTrigger>
                    <TabsTrigger value="favorites"
                        className="flex items-center gap-2"
                        onClick={() => setActiveTab('favorites')}
                    >
                        <Heart className="h-4 w-4" />
                        Favorites (3)
                    </TabsTrigger>
                    <TabsTrigger value="heroes" onClick={() => setActiveTab('heroes')}>Heroes (12)</TabsTrigger>
                    <TabsTrigger value="villains" onClick={() => setActiveTab('villains')}>Villains (2)</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <HeroGrid />
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
            <HeroGrid />

            {/* Pagination */}
            <CustomPagination totalPages={8} />
        </>
    )
}
