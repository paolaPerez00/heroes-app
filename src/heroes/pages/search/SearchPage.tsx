import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron
                title="Busqueda de SuperHeroes"
                description="Descubre, edxplora y administra super heroes y villanos"
            />
            <HeroStats />
        </>
    )
}

