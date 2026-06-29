import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"
import { searchHerosAction } from "@/heroes/actions/search-heros.action"
import { useSearchParams } from "react-router"

export const SearchPage = () => {

    const [searchParams] = useSearchParams();

    const options = {
        team: searchParams.get('team') ?? '',
        universe: searchParams.get('universe') ?? '',
        name: searchParams.get('name') ?? '',
        category: searchParams.get('category') ?? '',
        status: searchParams.get('status') ?? '',
        strength: searchParams.get('strength') ?? ''
    }

    const { data = [] } = useQuery({
        queryKey: ['heroes', 'search', { options }],
        queryFn: () => searchHerosAction(options),
        staleTime: 1000 * 60 * 5
    })

    return (
        <>
            <CustomJumbotron
                title="Busqueda de SuperHeroes"
                description="Descubre, edxplora y administra super heroes y villanos"
            />
            <CustomBreadcrumb currentaPage="Buscador de Heroes"
                breadCrumbs={
                    [
                    ]
                }
            />
            <HeroStats />
            <SearchControls />
            <HeroGrid heroes={data} />
        </>
    )
}

