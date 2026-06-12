import {
    Heart,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"

export const HomePage = () => {


    const [activeTab, setActiveTab] = useState('all');
    return (
        <>
            {/* Header */}
            <CustomJumbotron
                title="Universo de SuperHeroes"
                description="Descubre, edxplora y administra super heroes y villanos"
            />

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
            <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>

                <Button variant="default" size="sm">
                    1
                </Button>
                <Button variant="outline" size="sm">
                    2
                </Button>
                <Button variant="outline" size="sm">
                    3
                </Button>
                <Button variant="ghost" size="sm" disabled>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </>
    )
}
