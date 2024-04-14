<script setup lang="ts">
    interface PostProps {
        userId: number
        title: string
        body: string
    }

    const props = defineProps<PostProps>()
</script>

<template>
    <div class="border border-blue-300 shadow rounded-md p-4 w-full max-w-prose">
        <div class="flex space-x-4">
            <div class="flex justify-center items-center rounded-full bg-slate-200 h-10 w-10">
                {{ props.userId }}
            </div>
            <div class="flex-1 space-y-2">
                <div class="text-xl font-semibold">
                    {{ props.title }}
                </div>
                <div class="text-base">
                    {{ props.body }}
                </div>
                <slot/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
