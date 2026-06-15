import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron
                title="Busqueda de SuperHeroes"
                description="Descubre, edxplora y administra super heroes y villanos"
            />
            <CustomBreadcrumb currentaPage="Buscador de Heroes"
                breadCrumbs={
                    [
                        { label: 'Home 1', to: '/' },
                        { label: 'Home 2', to: '/' },
                        { label: 'Home 3', to: '/' },
                        { label: 'Home 4', to: '/' }
                    ]
                }
            />
            <HeroStats />
            <SearchControls />
        </>
    )
}

