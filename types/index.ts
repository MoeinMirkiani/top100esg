export interface CompanyResponse {
    title: string
    id: string
    companyAcf: {
        consolidatedFinancialStatements: string
        fiscalYearEnd: string
        headquartersLocation: string
        sustainabilityReport: string
        rankings: {
            year: number
            sectionsVariables: {
                section: string[]
                variable: string[]
                value: string
            }[]
        }[]
    }
}

export interface CompaniesResponse {
    data: {
        companies: {
            nodes: CompanyResponse[]
        }
    }
    extensions: {
        debug: [
            {
                type: string
                message: string
            }
        ]
    }
}

export interface Company {
    title: string
    id: string
    consolidatedFinancialStatements: string
    fiscalYearEnd: string
    headquartersLocation: string
    sustainabilityReport: string
    rankings: {
        year: number
        sections: {
            section: string
            variables: {
                variable: string
                value: string
            }[]
        }[]
    }[]
}

export interface Filters {
    years: number[],
    sections: {
        section: string
        variables: string[]
    }[]
}

export interface ActiveFilter {
    year: number
    section: string
    variable: string
}
