import { heroApi } from "../api/heroe.api"

export const getHeroesByPage = async () => {
    const { data } = await heroApi.get(`/`)
    return { data };
}