import { defineStore } from "pinia"
import type { ActiveFilter, Filters } from "~/types"


export const useFilterStore = defineStore('filter', () => {
    const filters = ref<Filters>()
    const setFilters = (newFilters: Filters) => {
        filters.value = newFilters
    }

    const activeFilter = ref<ActiveFilter>()
    const setActiveFilter = (newFilters: ActiveFilter) => {
        activeFilter.value = newFilters
    }

    return {
        filters,
        setFilters,
        activeFilter,
        setActiveFilter
    }
})
