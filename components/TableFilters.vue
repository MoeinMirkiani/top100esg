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
const { t } = useI18n()

// import companiesDB from '~/db.json'
// const { data } = companiesDB

const loading = computed<boolean>(() => {
    return sections.value.length === 0 || variables.value.length === 0 || years.value.length === 0
})

const filterStore = useFilterStore()
const { filters, activeFilter } = storeToRefs(filterStore)
const { setActiveFilter } = useFilterStore()

// Section filter
const sections = computed<string[]>(() => {
    return filters.value?.sections.map(s => s.section) ?? []
})

const section = computed<string>({
    get: () => activeFilter.value?.section ?? '',
    set: (value) => {
        setActiveFilter({
            section: value,
            variable: variables.value[0] ?? '',
            year: parseInt(year.value)
        })
    }
})

// Variable filter
const variables = computed<string[]>(() => {
    return filters.value?.sections.find(s => s.section === section.value)?.variables ?? []
})

const variable = ref<string>(activeFilter.value?.variable ?? '')
watch(section, () => {
    variable.value = variables.value[0] ?? ''
})

// // Year filter
const years = computed<string[]>(() => {
    return filters.value?.years.map(y => y.toString()) ?? []
})

const year = computed<string>({
    get: () => activeFilter.value?.year.toString() ?? '',
    set: (value) => {
        setActiveFilter({
            section: section.value,
            variable: variable.value,
            year: parseInt(value)
        })
    }
})

watch([section, variable, year], () => {
    setActiveFilter({
        section: section.value,
        variable: variable.value,
        year: parseInt(year.value)
    })
})
</script>
