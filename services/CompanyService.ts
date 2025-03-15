import { useHttp } from "~/composables/useHttp"
import type { AsyncData } from "~/types/index.ts"
import { CompaniesQuery } from "~/queries/companies"

const baseUrl = (): string => {
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.graphqlURL as string
}

export default {
    list: (first: number, after: string) : AsyncData<any> => {
        return useHttp('graphql', {
            baseURL: baseUrl,
            key: 'company-list',
            body: {
                query: CompaniesQuery,
                variables: {
                    first,
                    after
                }
            }
        })
    }
}
