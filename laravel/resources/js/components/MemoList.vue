<script setup>
import {ref} from 'vue'
import DocumentSvg from './svgs/DocumentSvg.vue'

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

<template class="">
    <div>
        <div class="flex gap-2 items-center">
            <DocumentSvg class="w-6 h-6"/>
            <p class="text-lg font-bold">保存されたメモ</p>
        </div>
    </div>
</template>
