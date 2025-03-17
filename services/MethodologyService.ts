import { useHttp } from "~/composables/useHttp"
import type { AsyncData } from "~/types/index.ts"
import { MethodologyQuery } from "~/queries/methodology"


const baseUrl = (): string => {
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.graphqlURL as string
}

export default {
    get: (): AsyncData<any> => {
        return useHttp('graphql', {
            baseURL: baseUrl,
            key: 'methodology',
            body: {
                query: MethodologyQuery
            }
        })
    }
}
