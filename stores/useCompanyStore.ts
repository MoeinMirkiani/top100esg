import { defineStore } from "pinia"
import type { Company } from "~/types"


export const useCompanyStore = defineStore('company', () => {
    const companies = ref<Company[]>()

    const setCompanies = (newCompanies: Company[]) => {
        companies.value = newCompanies
    }

    return {
        companies,
        setCompanies
    }
})
