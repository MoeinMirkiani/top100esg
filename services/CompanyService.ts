import { useHttp } from "~/composables/useHttp"
import type { AsyncData, CompanyResponse, Company, Filters } from '~/types'
import { CompaniesQuery } from "~/queries/companies"

const baseUrl = (): string => {
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.graphqlURL as string
}

const transform = (d: any): { companies: Company[], filters: Filters } => {
    const companyResponses: CompanyResponse[] = d.data.companies.nodes

    // Variables to exclude from filters
    const excludedVariables = [
        "Nr. of board members"
    ]

    const filters: Filters = {
        years: [],
        sections: []
    }

    const companies: Company[] = companyResponses.map(companyResponse => {
        const { title, id, companyAcf } = companyResponse
        const { headquartersLocation, rankings } = companyAcf

        // Transform rankings
        const transformedRankings = rankings.map(ranking => {
            const { year, consolidatedFinancialStatements, sustainabilityReport, fiscalYearEnd, sectionsVariables } = ranking

            // Group sectionsVariables by section
            const sectionsMap = new Map<string, { section: string, variables: { variable: string, value: string, rank: number | null }[] }>()
            sectionsVariables.forEach(sv => {
                const sectionKey = sv.section[0] // Assuming section is always a single string in an array
                if (!sectionsMap.has(sectionKey)) {
                    sectionsMap.set(sectionKey, { section: sectionKey, variables: [] })
                }
                sectionsMap.get(sectionKey)!.variables.push({
                    variable: sv.variable[0], // Assuming variable is always a single string in an array
                    value: sv.value,
                    rank: sv.rank
                })
            })

            // Convert Map to array
            const sections = Array.from(sectionsMap.values())

            // Update filters
            if (!filters.years.includes(year)) {
                filters.years.push(year)
            }
            sections.forEach(section => {
                const existingSection = filters.sections.find(s => s.section === section.section)
                if (existingSection) {
                    section.variables.forEach(variable => {
                        // Only add variable to filters if it's not in the excluded list
                        if (!existingSection.variables.includes(variable.variable) &&
                            !excludedVariables.includes(variable.variable)) {
                            existingSection.variables.push(variable.variable)
                        }
                    })
                } else {
                    filters.sections.push({
                        section: section.section,
                        // Filter out excluded variables when creating new section
                        variables: section.variables
                            .filter(v => !excludedVariables.includes(v.variable))
                            .map(v => v.variable)
                    })
                }
            })

            return {
                year,
                consolidatedFinancialStatements,
                sustainabilityReport,
                fiscalYearEnd,
                sections
            }
        })

        return {
            title,
            id,
            headquartersLocation,
            rankings: transformedRankings
        }
    })

    return { companies, filters }
}

export default {
    list: (first: number, after: string) : AsyncData<{ companies: Company[], filters: Filters }> => {
        return useHttp('graphql', {
            baseURL: baseUrl,
            key: 'company-list',
            body: {
                query: CompaniesQuery,
                variables: {
                    first,
                    after
                }
            },
            transform
        })
    }
}
