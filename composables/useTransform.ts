import type { CompanyResponse, Company, Filters } from "~/types"

export const useTransform = (companyResponses: CompanyResponse[]): { companies: Company[], filters: Filters } => {
    const filters: Filters = {
        years: [],
        sections: []
    }

    const companies = companyResponses.map(companyResponse => {
        const { companyAcf, ...rest } = companyResponse

        // Group sectionsVariables by section
        const groupedRankings = companyAcf.rankings.map(ranking => {
            const sectionsMap = new Map<string, { section: string, variables: { variable: string, value: string }[] }>()

            ranking.sectionsVariables.forEach(sv => {
                const sectionKey = sv.section[0] // Since section is always a single string in an array
                if (!sectionsMap.has(sectionKey)) {
                    sectionsMap.set(sectionKey, { section: sectionKey, variables: [] })
                }
                sectionsMap.get(sectionKey)!.variables.push({
                    variable: sv.variable[0], // Since variable is always a single string in an array
                    value: sv.value
                })

                // Collect unique variables for filters
                const sectionFilter = filters.sections.find(s => s.section === sectionKey)
                if (!sectionFilter) {
                    filters.sections.push({
                        section: sectionKey,
                        variables: [sv.variable[0]]
                    })
                } else if (!sectionFilter.variables.includes(sv.variable[0])) {
                    sectionFilter.variables.push(sv.variable[0])
                }
            })

            return {
                year: ranking.year,
                sections: Array.from(sectionsMap.values())
            }
        })

        // Collect unique years for filters
        companyAcf.rankings.forEach(ranking => {
            if (!filters.years.includes(ranking.year)) {
                filters.years.push(ranking.year)
            }
        })

        return {
            ...rest,
            consolidatedFinancialStatements: companyAcf.consolidatedFinancialStatements,
            fiscalYearEnd: companyAcf.fiscalYearEnd,
            headquartersLocation: companyAcf.headquartersLocation,
            sustainabilityReport: companyAcf.sustainabilityReport,
            rankings: groupedRankings
        }
    })

    return { companies, filters }
}
