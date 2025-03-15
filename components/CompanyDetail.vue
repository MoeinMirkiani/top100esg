<template>
    <div class="h-max min-h-screen overflow-y-auto p-6 text-white" :class="dynamicClasses">
        <div class="h-14 flex items-center justify-between">
            <span class="uppercase">{{ t(dynamicTitle) }}</span>
            <CloseIcon @click="$emit('close')" filled :font-controlled="false" class="size-6 cursor-pointer" />
        </div>

        <div class="py-6">
            <p class="uppercase text-xs text-white/50">{{ t('Company name') }}</p>
            <p class="uppercase text-[28px]">{{ props.company?.title }}</p>

            <div class="mt-5 mb-3 flex items-center justify-start gap-2">
                <LocationIcon filled :font-controlled="false" class="size-4" />
                <p class="text-xs">{{ t('Company headquarters') }} {{ props.company?.headquartersLocation ?? ''}}</p>
            </div>

            <div class="mb-3">
                <div class="flex items-center justify-start gap-2 mb-1">
                    <BillIcon filled :font-controlled="false" class="size-4" />
                    <p class="text-xs">{{ t('Consolidated financial statements') }}</p>
                </div>

                <div v-for="cfs in rankings[0].consolidatedFinancialStatements" class="flex items-center justify-start gap-2 pl-6">
                    <span class="text-xs">{{ cfs.year }}</span>
                    <span class="text-xs">{{ cfs.value }}</span>
                </div>
            </div>

            <div class="mb-3">
                <div class="flex items-center justify-start gap-2 mb-1">
                    <BillIcon filled :font-controlled="false" class="size-4" />
                    <p class="text-xs">{{ t('Sustainability report') }}</p>
                </div>

                <div v-for="cfs in rankings[0].sustainabilityReport" class="flex items-center justify-start gap-2 pl-6">
                    <span class="text-xs">{{ cfs.year }}</span>
                    <span class="text-xs">{{ cfs.value }}</span>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-start gap-2 mb-1">
                    <CalendarIcon filled :font-controlled="false" class="size-4" />
                    <p class="text-xs">{{ t('Fiscal year end') }}</p>
                </div>

                <div v-for="cfs in rankings[0].fiscalYearEnd" class="flex items-center justify-start gap-2 pl-6">
                    <span v-if="cfs.value" class="text-xs">{{ cfs.year }}</span>
                    <span v-if="cfs.value" class="text-xs">{{ cfs.value ?? '' }}</span>
                </div>
            </div>


        </div>

        <div class="h-0.5 bg-white"></div>

        <div v-for="ranking in rankings">
            <div v-if="ranking.section.toLowerCase() === props.section?.toLowerCase()">
                <div v-for="variable in ranking.variables" class="py-4 border-b border-white">
                    <p>{{ t(variable.name) }}</p>
                    <div class="grid grid-cols-4 gap-2">
                        <span class="col-span-1 uppercase text-xs text-white/50">{{ t('Year') }}</span>
                        <span class="col-span-2 uppercase text-xs text-white/50">{{ t('Value') }}</span>
                        <span class="col-span-1 uppercase text-xs text-white/50">{{ t('Ranking') }}</span>
                    </div>
                    <div v-for="item in variable.years" class="grid grid-cols-4 gap-2">
                        <span class="col-span-1 uppercase text-xs text-white">{{ item.year }}</span>
                        <span class="col-span-2 uppercase text-xs text-white">{{ item.value }}</span>
                        <span class="col-span-1 uppercase text-xs text-white">{{ item.rank }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CloseIcon from "~/assets/icons/close.svg"
import LocationIcon from "~/assets/icons/location.svg"
import BillIcon from "~/assets/icons/bill.svg"
import CalendarIcon from "~/assets/icons/calendar.svg"
import type { Company } from "~/types"

const { t } = useI18n()

enum Section {
    FINANCIAL = 'financial',
    ENVIRONMENT = 'environment',
    SOCIAL = 'social',
    GOVERNANCE = 'governance'
}

interface Ranking {
    consolidatedFinancialStatements: {
        value: string
        year: number
    }[],
    sustainabilityReport: {
        value: string
        year: number
    }[],
    fiscalYearEnd: {
        value: string
        year: number
    }[],
    section: string
    variables: {
        name: string
        years: {
            value: string
            rank: number | null
            year: number
        }[]
    }[]
}

const props = defineProps<{
    company?: Company
    section?: string
}>()

const dynamicClasses = computed(() => {
    return {
        'bg-[#3B28CC]': (props.section)?.toLowerCase() === Section.FINANCIAL,
        'bg-[#157F1F]': (props.section)?.toLowerCase() === Section.ENVIRONMENT,
        'bg-[#9E2A2B]': (props.section)?.toLowerCase() === Section.SOCIAL,
        'bg-[#5E503F]': (props.section)?.toLowerCase() === Section.GOVERNANCE
    }
})

const dynamicTitle = computed(() => {
    return `Overview ${props.section}`
})

const rankings = computed((): Ranking[] => {
    if (!props.company) return []

    // Create a map to hold consolidated data for each section
    const sectionsMap = new Map<string, {
        variables: Map<string, { year: number, value: string, rank: number | null }[]>,
        consolidatedFinancialStatements: { year: number, value: string }[],
        sustainabilityReport: { year: number, value: string }[],
        fiscalYearEnd: { year: number, value: string }[]
    }>()

    // Process each ranking (year) in the company data
    props.company.rankings.forEach(yearRanking => {
        // For each section in this year's ranking
        yearRanking.sections.forEach(section => {
            // Get or create the section data
            if (!sectionsMap.has(section.section)) {
                sectionsMap.set(section.section, {
                    variables: new Map(),
                    consolidatedFinancialStatements: [],
                    sustainabilityReport: [],
                    fiscalYearEnd: []
                })
            }
            const sectionData = sectionsMap.get(section.section)!

            // Add yearly reports data
            sectionData.consolidatedFinancialStatements.push({
                year: yearRanking.year,
                value: yearRanking.consolidatedFinancialStatements
            })
            sectionData.sustainabilityReport.push({
                year: yearRanking.year,
                value: yearRanking.sustainabilityReport
            })
            sectionData.fiscalYearEnd.push({
                year: yearRanking.year,
                value: yearRanking.fiscalYearEnd
            })

            // Process each variable in this section
            section.variables.forEach(variable => {
                // Get or create the array for this variable
                if (!sectionData.variables.has(variable.variable)) {
                    sectionData.variables.set(variable.variable, [])
                }

                // Add this year's data for the variable
                sectionData.variables.get(variable.variable)!.push({
                    year: yearRanking.year,
                    value: variable.value,
                    rank: variable.rank
                })
            })
        })
    })

    // Convert the nested maps to the Ranking interface format
    return Array.from(sectionsMap).map(([sectionName, sectionData]) => ({
        section: sectionName,
        consolidatedFinancialStatements: sectionData.consolidatedFinancialStatements,
        sustainabilityReport: sectionData.sustainabilityReport,
        fiscalYearEnd: sectionData.fiscalYearEnd,
        variables: Array.from(sectionData.variables).map(([variableName, yearData]) => ({
            name: variableName,
            years: yearData.map(data => ({
                value: data.value,
                rank: data.rank as any, // Using 'any' due to the circular reference in the interface
                year: data.year
            }))
        }))
    }))
})
</script>
