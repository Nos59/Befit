import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

interface Post {
    userId: number
    id: number
    title: string
    body: string
    like?: boolean
    dislike?: boolean
}

interface PostsStore {
    page: Ref<number>,
    perPage: Ref<number>
    filteredPosts: Ref<Post[]>,
    paginationPosts: Ref<Post[]>,
    likedPosts: Ref<Post[]>,
    dislikedPosts: Ref<Post[]>
    fetchPosts: () => void
    setPage: (value: number) => void
    like: (id: number) => void
    dislike: (id: number) => void
    remove: (id: number) => void
}

export const usePostsStore = defineStore('posts', (): PostsStore => {
    const posts = ref<Post[]>([])
    const perPage = ref(5)

    const page = ref(1)
    const setPage = (value: number) => {
        page.value = value
    }

    const paginationPosts = computed(() => {
        return filteredPosts.value.slice((page.value - 1) * perPage.value, page.value * perPage.value)
    })

    const filteredPosts = computed(() => {
        return posts.value.filter(item => !item?.like && !item.dislike)
    })

    const likedPosts = computed(() => posts.value.filter(post => post.like))
    const like = (id: number) => {
        posts.value = posts.value.map(item => item.id === id ? { ...item, like: true } : item)
    }

    const dislikedPosts = computed(() => posts.value.filter(post => post.dislike))
    const dislike = (id: number) => {
        posts.value = posts.value.map(item => item.id === id ? { ...item, dislike: true } : item)
    }

    const remove = (id: number) => {
        posts.value = posts.value.map(post => post.id === id ? { ...post, dislike: false, like: false } : post)
    }

    async function fetchPosts() {
        posts.value = await fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json())
    }

    return {
        page,
        perPage,
        filteredPosts,
        paginationPosts,
        likedPosts,
        dislikedPosts,
        fetchPosts,
        setPage,
        like,
        dislike,
        remove
    }
})
