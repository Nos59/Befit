<script setup lang="ts">
    import { computed } from 'vue'

    interface PaginationProps {
        page: number,
        perPage: number
        total: number
        size?: number
    }

    const emit = defineEmits(['paginate'])
    const props = withDefaults(defineProps<PaginationProps>(), {
        size: 7
    })

    const totalPages = computed(() => {
        return Math.ceil(props.total / props.perPage)
    })

    const range = (start: number, count: number) => {
        return Array.from({ length: count }, (_, index) => start + index)
    }

    const pages = computed(() => {
        if (props.size >= totalPages.value) {
            return range(1, totalPages.value)
        }

        const middlePages = Math.floor((props.size - 4) / 2)
        const leftLimit = 3 + middlePages
        const rightLimit = totalPages.value - 2 - middlePages

        if (props.page <= leftLimit) {
            return [...range(1, props.size - 2), '...', totalPages.value]
        }

        if (props.page >= rightLimit) {
            return [1, '...', ...range(rightLimit - middlePages, props.size - 2)]
        }

        return [1, '...', ...range(props.page - middlePages, props.size - 4), '...', totalPages.value]

    })

    const paginate = (value: number) => {
        emit('paginate', value)
    }
</script>

<template>
    <div class="flex justify-center items-center gap-6">
        <template v-for="item in pages">
            <div v-if="item === '...'" class="cursor-default text-blue-400">
                {{ item }}
            </div>
            <div
                v-else
                @click="paginate(Number(item))"
                class="flex justify-center items-center cursor-pointer text-blue-400 hover:text-blue-500 h-7 w-7"
                :class="[{'rounded-full bg-slate-200': item === props.page}]"
            >
                {{ item }}
            </div>
        </template>

    </div>
</template>

<style lang="scss" scoped>

</style>
