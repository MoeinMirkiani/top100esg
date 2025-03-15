<template>
    <div class="space-y-4">
        <span v-if="loading">{{ t('Loading filters...') }}</span>
        <template v-else>
            <AppSelect :label="t('Section')" :options="sections" v-model="section" @change="$emit('close')" />
            <AppSelect :label="t('Variable')" :options="variables" v-model="variable" @change="$emit('close')" />
            <AppSelect :label="t('Year')" :options="years" v-model="year" @change="$emit('close')" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { useCompanyStore } from "~/stores/useCompanyStore"
import CompanyService from "~/services/CompanyService"

const { t } = useI18n()

const { data: apiData } = await CompanyService.list(100, '')
const { companies, filters } = useTransform(apiData.value.data.companies.nodes)

// import companiesDB from '~/db.json'
// const { data } = companiesDB

const { setCompanies } = useCompanyStore()
setCompanies(companies)

// Section filter
const sections = computed<string[]>(() => {
    return filters.sections.map(s => s.section)
})

const section = ref<string>(sections.value[0])

// Variable filter
const variables = computed<string[]>(() => {
    return filters.sections.find(s => s.section === section.value)?.variables ?? []
})

const variable = ref<string>(variables.value[0])
watch(section, () => {
    variable.value = variables.value[0] ?? ''
})

// // Year filter
const years = computed<string[]>(() => {
    return filters.years.map(y => y.toString())
})

const year = ref<string>(years.value[0])

const loading = computed<boolean>(() => {
    return sections.value.length === 0 || variables.value.length === 0 || years.value.length === 0
})

const { setFilter } = useFilterStore()
watch([section, variable, year], () => {
    setFilter({
        section: section.value,
        variable: variable.value,
        year: parseInt(year.value)
    })
})

setFilter({
    section: section.value,
    variable: variable.value,
    year: parseInt(year.value)
})
</script>
