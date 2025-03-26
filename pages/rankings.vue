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

            <template #title-data="{ row }">
                <p class="max-w-24 truncate sm:max-w-full">{{ row.title }}</p>
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

    <USlideover v-model="companyDetailIsOpen" side="right">
        <CompanyDetail @close="companyDetailIsOpen = false" :company="focusedCompany" :section="activeFilter?.section" />
    </USlideover>
</template>

<script lang="ts" setup>
import FiltersIcon from "assets/icons/filters.svg"
import CompanyService from "~/services/CompanyService"
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

const companyStore = useCompanyStore()
const { companies } = storeToRefs(companyStore)
const filterStore = useFilterStore()
const { activeFilter } = storeToRefs(filterStore)

const tableCompanies = computed(() => {
    if (!companies || !activeFilter.value) return []

    return companies.value?.map(c => mapCompanyToTableCompany(c))
        .filter((c): c is TableCompany => c !== null)
})

function mapCompanyToTableCompany(company: Company): TableCompany | null {
    if (!activeFilter.value) return null

    const ranking = company.rankings.find(r => r.year === activeFilter.value?.year)
    if (!ranking) return null

    const section = ranking.sections.find(s => s.section === activeFilter.value?.section)
    if (!section) return null

    const variable = section.variables.find(v => v.variable === activeFilter.value?.variable)
    if (!variable) return null

    return {
        rank: variable.rank,
        title: company.title,
        value: variable.value,
        id: company.id
    }
}

const selectCompany = (row: TableCompany) => {
    if (activeFilter.value?.section.toLowerCase() !== 'overall esg') {
        focusedCompany.value = companies.value?.find(c => c.id === row.id)
        companyDetailIsOpen.value = true
    }
}

const { data } = await CompanyService.list(100, '')

const { setCompanies } = useCompanyStore()
setCompanies(data.value.companies)

const { setFilters, setActiveFilter } = useFilterStore()
setFilters(data.value.filters)
setActiveFilter({
    section: data.value.filters.sections[0].section,
    variable: data.value.filters.sections[0].variables[0],
    year: data.value.filters.years[0]
})
</script>
