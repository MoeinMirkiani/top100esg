import type { CompanyResponse, Company, Filters } from '~/types'

export const useTransform = (companyResponses: CompanyResponse[]): { companies: Company[], filters: Filters } => {
    const companies: Company[] = companyResponses.map(companyResponse => {
        const { companyAcf, ...rest } = companyResponse

        // Transform rankings
        const rankings = companyAcf.rankings.map(ranking => {
            const { sectionsVariables, ...rankingRest } = ranking

            // Group variables by section
            const sectionsMap = new Map<string, { variable: string, value: string, rank: number | null }[]>()
            sectionsVariables.forEach(({ section, variable, value, rank }) => {
                const sectionKey = section[0] // Since section is always a single string array
                if (!sectionsMap.has(sectionKey)) {
                    sectionsMap.set(sectionKey, [])
                }
                sectionsMap.get(sectionKey)!.push({ variable: variable[0], value, rank })
            })

            // Convert the map to the desired sections format
            const sections = Array.from(sectionsMap.entries()).map(([section, variables]) => ({
                section,
                variables,
            }))

            return {
                ...rankingRest,
                sections,
            }
        })

        return {
            ...rest,
            fiscalYearEnd: companyAcf.fiscalYearEnd,
            headquartersLocation: companyAcf.headquartersLocation,
            rankings,
        }
    })

    // Generate filters
    const filters: Filters = {
        years: Array.from(new Set(companyResponses.flatMap(company => company.companyAcf.rankings.map(ranking => ranking.year)))),
        sections: Array.from(new Set(companyResponses.flatMap(company => company.companyAcf.rankings.flatMap(ranking => ranking.sectionsVariables.map(variable => variable.section[0])))))
            .map(section => ({
                section,
                variables: Array.from(new Set(companyResponses.flatMap(company => company.companyAcf.rankings.flatMap(ranking => ranking.sectionsVariables.filter(variable => variable.section[0] === section).map(variable => variable.variable[0])))))
            }))
    }

    return { companies, filters }
}