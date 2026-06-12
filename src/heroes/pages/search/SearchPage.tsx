import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron
                title="Busqueda de SuperHeroes"
                description="Descubre, edxplora y administra super heroes y villanos"
            />
            <HeroStats />
            <SearchControls />
        </>
    )
}

