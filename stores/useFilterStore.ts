import { defineStore } from "pinia"
import type { ActiveFilter } from "~/types"


export const useFilterStore = defineStore('filter', () => {
    const activeFilter = ref<ActiveFilter>()

    const setFilter = (newFilters: ActiveFilter) => {
        activeFilter.value = newFilters
    }

    return {
        activeFilter,
        setFilter
    }
})
