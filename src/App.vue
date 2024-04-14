<script setup lang="ts">
    import Dislike from '@/assets/icon/dislike.svg'
    import Like from '@/assets/icon/like.svg'
    import Pagination from '@/components/Pagination.vue'
    import Post from '@/components/Post.vue'
    import Remove from '@/assets/icon/remove.svg'
    import { StoreGeneric, storeToRefs } from 'pinia'
    import { onMounted } from 'vue'
    import { usePostsStore } from '@/store/postsStore'

    const store = usePostsStore()
    const { filteredPosts, page, perPage, paginationPosts, likedPosts, dislikedPosts } = storeToRefs(<StoreGeneric>store)
    const { fetchPosts, setPage, like, dislike, remove } = store

    onMounted(() => {
        fetchPosts()
    })
</script>

<template>
    <div class="flex justify-center items-center flex-col gap-6 p-10">
        <div class="text-xl font-semibold">Posts</div>
        <Post
            v-for="post in paginationPosts"
            :userId="post.userId"
            :title="post.title"
            :body="post.body"
        >
            <div class="flex justify-end gap-3">
                <Like class="h-5 w-5 cursor-pointer hover:text-blue-500" @click="like(post.id)"/>
                <Dislike class="h-5 w-5 cursor-pointer hover:text-blue-500" @click="dislike(post.id)"/>
            </div>
        </Post>

        <Pagination
            :page="page"
            :total="filteredPosts.length"
            :per-page="perPage"
            @paginate="setPage"
        />

        <div class="grid grid-cols-2 gap-3">
            <div class="flex items-center flex-col gap-4">
                <div class="text-xl font-semibold">Liked</div>
                <Post
                    v-for="post in likedPosts"
                    :userId="post.userId"
                    :title="post.title"
                    :body="post.body"
                >
                    <div class="flex justify-end gap-3">
                        <Remove class="h-5 w-5 cursor-pointer hover:text-blue-500" @click="remove(post.id)"/>
                    </div>
                </Post>
            </div>
            <div class="flex items-center flex-col gap-4">
                <div class="text-xl font-semibold">Disliked</div>
                <Post
                    v-for="post in dislikedPosts"
                    :userId="post.userId"
                    :title="post.title"
                    :body="post.body"
                >
                    <div class="flex justify-end gap-3">
                        <Remove class="h-5 w-5 cursor-pointer hover:text-blue-500" @click="remove(post.id)"/>
                    </div>
                </Post>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>
