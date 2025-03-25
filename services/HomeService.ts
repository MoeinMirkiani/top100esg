import { useHttp } from "~/composables/useHttp"
import type { AsyncData } from "~/types/index.ts"
import { HomeQuery } from "~/queries/home"


const baseUrl = (): string => {
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.graphqlURL as string
}

const transform = (data: any) => {
    return data.data.page.homeAcf.home.map((entry: any) => {
        return {
            ...entry,
            language: entry.language[0]
        }
    })
}

export default {
    get: (): AsyncData<any> => {
        return useHttp('graphql', {
            baseURL: baseUrl,
            key: 'home',
            body: {
                query: HomeQuery
            },
            transform
        })
    }
}
