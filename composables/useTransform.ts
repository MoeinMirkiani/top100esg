import type { CompanyResponse, Company, Filters } from '~/types'

export const useTransform = (companyResponses: CompanyResponse[]) : { companies: Company[], filters: Filters } => {
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
                        if (!existingSection.variables.includes(variable.variable)) {
                            existingSection.variables.push(variable.variable)
                        }
                    })
                } else {
                    filters.sections.push({
                        section: section.section,
                        variables: section.variables.map(v => v.variable)
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