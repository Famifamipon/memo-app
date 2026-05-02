<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import axios from 'axios'
import DocumentSvg from './svgs/DocumentSvg.vue'
import TrashSvg from './svgs/TrashSvg.vue'
import StarSvg from './svgs/StarSvg.vue'

const memos = ref([])
const fetchMemos = async () => {
    try {
        const response = await axios.get('/api/memos');
        memos.value = response.data;
    } catch(error){
        console.error("データの取得に失敗しました", error);
    }
}

defineExpose({
    fetchMemos
});

onMounted(() => {
    fetchMemos();
})

const deleteMemo = async (id) => {
    try {
        await axios.delete('/api/memos/' + id);

        await fetchMemos();
    } catch (error){
        console.error("削除に失敗しました。", error);
        alert("メモの削除に失敗しました。");
    }
}

const editId = ref(null)
const editContent = ref("")

const judgeEditId = (memo) => {
    editId.value = memo.id;
    editContent.value = memo.content;
}

const editMemo = async () => {
    if (editContent.value === "") {
        return;
    }

    try{
        const response = await axios.put('/api/memos/' + editId.value,{
            editContent: editContent.value
        });

        console.log("更新しました。内容：", response.data);
        editContent.value = "";
        editId.value = null;

        await fetchMemos();
    } catch (error){
        console.error("更新に失敗しました。", error);
        alert("メモの更新に失敗しました。");
    }
}

const toggleStar = async(memo) => {
    try{
        await axios.patch('/api/memos/' + memo.id + '/star');
        memo.is_starred = !memo.is_starred;
    } catch(error){
        console.error("更新に失敗しました。", error);
    }
}

const filterText = ref("")

function compareFunc(a, b){
    return b.is_starred - a.is_starred;
}

const filteredMemos = computed(() => {
    let result = memos.value.filter((memo) => memo.content.includes(filterText.value));
    return result.sort(compareFunc);
})

</script>

<template>
    <div class="max-w-xl mx-auto">
        <div class="flex justify-between items-center">
            <div class="flex gap-2 items-center mb-4">
                <DocumentSvg class="w-6 h-6"/>
                <p class="text-lg font-bold">保存されたメモ</p>
            </div>
            <span class="text-sm text-slate-500 rounded-xl
            bg-orange-100 px-2 mb-3">
                {{filteredMemos.length}}件
            </span>
        </div>
        <div class="mb-4">
            <label>🔍 検索：</label>
            <input v-model="filterText" placeholder="検索..." class="border
            outline-none focus:border-blue-400 rounded-lg w-64">
        </div>
        <div v-for="memo in filteredMemos" :key="memo.id" class="bg-white
        border rounded-xl shadow-sm mb-4 relative group">
            <template v-if="memo.id === editId">
                <textarea v-model="editContent" class="resize-none
                border rounded-xl focus:border-blue-400 outline-none
                m-4 w-80"></textarea>
                <p class="text-xs text-slate-400 mb-4 mx-4">投稿時間は編集時間に上書きされます</p>
            </template>
            <template v-else>
                <p class="whitespace-pre-wrap m-4">{{memo.content}}</p>
                <p class="text-xs text-slate-400 mb-4 mx-4">{{memo.created_time}}</p>
            </template>

            <button @click="deleteMemo(memo.id)" class="absolute
            top-4 right-4 invisible group-hover:visible text-slate-400
            hover:text-black p-2">
                <TrashSvg />
            </button>
            <button @click="toggleStar(memo)" class="absolute
            bottom-4 right-5">
                <StarSvg :class="memo.is_starred ? 'text-yellow-400' : 'text-slate-300'" />
            </button>
            <button v-if="memo.id === editId" @click="editMemo" class="absolute
            top-3 right-14 invisible group-hover:visible rounded-xl
            bg-blue-300 hover:bg-blue-500 transition-all text-white p-2">
                完了
            </button>
            <button v-else @click="judgeEditId(memo)" class="absolute
            top-3 right-14 invisible group-hover:visible text-slate-400
            hover:text-black p-2">
                編集
            </button>
        </div>
    </div>
</template>
