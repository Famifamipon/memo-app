<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import DocumentSvg from './svgs/DocumentSvg.vue'
import TrashSvg from './svgs/TrashSvg.vue'

const memos = ref([])

const fetchMemos = async () => {
    try {
        const response = await axios.get('/api/memos');
        memos.value = response.data;
    } catch(error){
        console.error("データの取得に失敗しました", error);
    }
}

onMounted(() => {
    fetchMemos();
})

</script>

<template>
    <div class="max-w-xl mx-auto">
        <div class="flex justify-between items-center">
            <div class="flex gap-2 items-center mb-4">
                <DocumentSvg class="w-6 h-6"/>
                <p class="text-lg font-bold">保存されたメモ</p>
            </div>
            <span class="text-sm text-slate-500 rounded-xl bg-orange-100 px-2 mb-3">
                {{memos.length}}件
            </span>
        </div>
        <div v-for="memo in memos" :key="memo.id" class="bg-white border rounded-xl shadow-sm mb-4 relative group">
            <p class="m-4">{{memo.content}}</p>
            <p class="text-xs text-slate-400 mb-4 mx-4">{{memo.created_time}}</p>

            <button class="absolute top-4 right-4 invisible group-hover:visible text-slate-400 p-2">
                <TrashSvg />
            </button>
        </div>
    </div>
</template>
