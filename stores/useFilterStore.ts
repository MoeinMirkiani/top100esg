import { defineStore } from "pinia"
import type { ActiveFilter } from "~/types"

export const useFilterStore = defineStore('filters', () => {
    const activeFilter = ref<ActiveFilter>()

    const setFilter = (newFilters: ActiveFilter) => {
        console.log(newFilters)
        activeFilter.value = newFilters
    }

    return {
        activeFilter,
        setFilter
    }
})
