<template>
    <div @click="filtersMenuIsOpen = true" class="h-14 bg-[#EFEFEF] flex items-center justify-between px-6 md:hidden">
        <span>{{ t('Ranking criteria') }}</span>
        <FiltersIcon class="h-8 w-auto" filled :font-controlled="false" />
    </div>

    <UTable :columns :rows="tableCompanies" :sort="sort" @select="selectCompany">
            <template #rank-header>
                <span></span>
            </template>

            <template #rank-data="{ row, index }">
                <span>{{ row.rank ?? (index + 1) }}</span>
            </template>

            <template #title-header>
                <span></span>
            </template>

            <template #value-header>
                <span></span>
            </template>
        </UTable>

    <USlideover v-model="filtersMenuIsOpen" :transition="false" side="top">
        <div class="bg-[#EFEFEF] px-4 py-6">
            <TableFilters @close="filtersMenuIsOpen = false" />
        </div>
    </USlideover>

    <USlideover v-model="companyDetailIsOpen" :transition="false" side="right">
        <CompanyDetail :company="focusedCompany" />
    </USlideover>
</template>

<script lang="ts" setup>
import FiltersIcon from "assets/icons/filters.svg"
import type { Company } from "~/types"

definePageMeta({
    layout: 'filters'
})

interface TableCompany {
    rank: number | null
    title: string
    value: string
    id: string
}

const filtersMenuIsOpen = ref<boolean>(false)
const companyDetailIsOpen = ref<boolean>(false)
const focusedCompany = ref<Company>()

const columns = [
    {
        key: 'rank',
        label: 'Rank',
    },
    {
        key: 'title',
        label: 'Title',
    },
    {
        key: 'value',
        label: 'Value',
    }
]

const sort = ref<{ column: string, direction: 'asc' | 'desc' }>({
    column: 'rank',
    direction: 'asc'
})

const { t } = useI18n()

useHead({
    title: t('Rankings')
})

const { companies } = useCompanyStore()
const filterStore = useFilterStore()
const { activeFilter } = storeToRefs(filterStore)

const tableCompanies = ref<TableCompany[]>([])

watch([companies, activeFilter], () => {
    tableCompanies.value = companies?.map(c => mapCompanyToTableCompany(c)).filter(c => c !== null) as TableCompany[]
})

function mapCompanyToTableCompany(company: Company): TableCompany | null {
    // Check if activeFilter is set
    if (!activeFilter.value) return null;

    // Find the ranking for the specified year
    const ranking = company.rankings.find(r => r.year === activeFilter.value?.year)
    if (!ranking) return null

    // Find the section within the ranking
    const section = ranking.sections.find(s => s.section === activeFilter.value?.section)
    if (!section) return null

    // Find the variable within the section
    const variable = section.variables.find(v => v.variable === activeFilter.value?.variable)
    if (!variable) return null

    // Return the TableCompany object with the rank, title, value, and id
    return {
        rank: variable.rank,
        title: company.title,
        value: variable.value,
        id: company.id
    }
}

tableCompanies.value = companies?.map(c => mapCompanyToTableCompany(c)).filter(c => c !== null) as TableCompany[]

const selectCompany = (row: TableCompany) => {
    focusedCompany.value = companies?.find(c => c.id === row.id)
    companyDetailIsOpen.value = true
}
</script>
