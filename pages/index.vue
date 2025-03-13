<template>
    <ClientOnly>
        <UTable :columns :rows="companies" :sort="sort" @select="selectCompany">
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
    </ClientOnly>
</template>

<script lang="ts" setup>
import type { Company } from "~/types"

interface TableCompany {
    rank: number | null
    title: string
    value: string
    id: string
}

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

definePageMeta({
    layout: 'filters'
})

useHead({
    title: t('Rankings')
})

const { companies: allCompanies } = useCompanyStore()
const filterStore = useFilterStore()
const { activeFilter } = storeToRefs(filterStore)

const companies = ref<TableCompany[]>([])

watch([allCompanies, activeFilter], () => {
    companies.value = allCompanies?.map(c => mapCompanyToTableCompany(c)).filter(c => c !== null) as TableCompany[]
})

function mapCompanyToTableCompany(company: Company): TableCompany | null {
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
        rank: variable.rank ?? null,
        title: company.title,
        value: variable.value,
        id: company.id
    }
}

companies.value = allCompanies?.map(c => mapCompanyToTableCompany(c)).filter(c => c !== null) as TableCompany[]

const selectCompany = (row: TableCompany) => {
    console.log(row.id)
}
</script>
