import { type AsyncData as NuxtAsyncData } from "#app"
import { FetchError } from "ofetch"

export interface CompanyResponse {
    title: string
    id: string
    companyAcf: {
        headquartersLocation: string
        rankings: {
            year: number
            consolidatedFinancialStatements: string
            sustainabilityReport: string
            fiscalYearEnd: string
            sectionsVariables: {
                section: string[]
                variable: string[]
                value: string
                rank: number | null
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
    headquartersLocation: string
    rankings: {
        year: number
        consolidatedFinancialStatements: string
        sustainabilityReport: string
        fiscalYearEnd: string
        sections: {
            section: string
            variables: {
                variable: string
                value: string
                rank: number | null
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

export type AsyncData<T> = Promise<NuxtAsyncData<T, FetchError | null>>

export type NavigateToData = {
    path: string,
    statusCode: number
}
