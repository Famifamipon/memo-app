<script setup>
import {ref} from 'vue'
import DocumentSvg from './svgs/DocumentSvg.vue'
import TrashSvg from './svgs/TrashSvg.vue'

const memos = ref([
    {
        id:1,
        content:"mockデータぴえん",
        created_time:"2005-01-24 00:00"
    },
    {
        id:2,
        content:"mockデータ2ぴえん",
        created_time:"2026-04-24 15:59"
    },
])
</script>

<template>
    <div class="max-w-xl mx-auto">
        <div class="flex gap-2 items-center mb-4">
            <DocumentSvg class="w-6 h-6"/>
            <p class="text-lg font-bold">保存されたメモ</p>
        </div>
        <div v-for="memo in memos" :key="memo.id" class="border rounded-xl shadow-sm mb-4 relative group">
            <p class="m-4">{{memo.content}}</p>
            <p class="text-xs text-slate-400 mb-4 mx-4">{{memo.created_time}}</p>

            <button class="absolute top-4 right-4 invisible group-hover:visible text-slate-400 p-2">
                <TrashSvg />
            </button>
        </div>
    </div>
</template>
