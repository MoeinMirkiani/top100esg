<template>
    <UContainer class="py-16 md:py-32">
        <div v-for="page in data" :key="page.language">
            <div v-if="page.language === locale">
                <h1 class="text-3xl font-bold uppercase max-w-3xl mb-10 md:text-5xl">{{ page.pageContent.title }}</h1>

                <div class="mb-16 page-description max-w-4xl md:mb-32" v-html="page.pageContent.description" />

                <p class="mb-6">{{ t('A project by') }}</p>
                <NuxtLink external target="_blank" :href="`https://www.unibz.it/${locale}/home/research/competence-centre-economic-ecological-social-sustainability/`">
                    <img :src="ccsLogo" alt="CCS Logo" class="mb-16 w-[520px] max-w-full md:mb-32" />
                </NuxtLink>

                <h4 class="text-3xl font-medium mb-10">{{ page.pageContent.metrics.title }}</h4>
                <div class="flex flex-col gap-10 md:flex-row">
                    <div v-for="(item, i) in page.pageContent.metrics.metricsItems" :key="i" class="flex-1">
                        <EnvironmentIcon filled :font-controlled="false" class="size-10 mb-2.5" v-if="i === 0" />
                        <SocialIcon filled :font-controlled="false" class="size-10 mb-2.5" v-if="i === 1" />
                        <GovernanceIcon filled :font-controlled="false" class="size-10 mb-2.5" v-if="i === 2" />
                        <h5 class="font-bold mb-2">{{ item.metric }}</h5>
                        <p>{{ item.description }}</p>
                    </div>
                </div>

                <div class="my-16 p-10 bg-[#1C1B1F] rounded-lg text-center md:my-32 md:py-16 md:px-40">
                    <h4 class="text-3xl font-semibold text-white mb-6">{{ page.pageContent.bannerTitle }}</h4>
                    <p class="text-white mb-10">{{ page.pageContent.bannerDescription }}</p>
                    <NuxtLinkLocale :to="{ name: 'rankings' }" class="flex items-center justify-center gap-2 mx-auto px-6 py-3.5 bg-white rounded-lg max-w-max">
                        <span>{{ t('Explore ranking') }}</span>
                        <ArrowRightIcon filled :font-controlled="false" class="h-6 w-6" />
                    </NuxtLinkLocale>
                </div>

                <h5 class="text-2xl font-medium mb-2">{{ page.pageContent.reportTitle }}</h5>
                <div class="mb-16 report-description md:mb-32" v-html="page.pageContent.reportDescription" />

                <h6 class="text-2xl font-medium mb-2">{{ page.pageContent.team.title }}</h6>
                <p class="mb-10">{{ page.pageContent.team.description }}</p>
                <div class="flex flex-col gap-10 md:flex-row">
                    <div v-for="(item, i) in page.pageContent.team.members" :key="i" class="flex-1">
                        <h6 class="text-xl font-medium mb-2">{{ item.fullName }}</h6>
                        <p>{{ item.affiliation }}</p>
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
import ccsLogo from '~/assets/images/ccs-logo.png'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg'
import EnvironmentIcon from '~/assets/icons/environment.svg'
import SocialIcon from '~/assets/icons/social.svg'
import GovernanceIcon from '~/assets/icons/governance.svg'
import HomeService from '~/services/HomeService'


const { t, locale } = useI18n()

useHead({
    title: t('Start')
})

const { data } = await HomeService.get()
</script>

<style lang="scss" scoped>
:deep() {
    .page-description {
        p {
            @apply mb-2;
        }
    }

    .report-description {
        a {
            @apply underline;
        }
    }
}
</style>
