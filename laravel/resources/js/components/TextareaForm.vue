<script setup lang="ts">
import {ref, watch} from 'vue'
import PlusSvg from './svgs/PlusSvg.vue'
import axios from 'axios'

const memoContent = ref("")

const placeholderText = 'メモを入力してください...\n' +
    '　(Enterで保存、Shift+Enterで改行)'

const isButtonDisabled = ref(true)

const emit = defineEmits(['save-success'])

const submitMemo = async () => {
    if (memoContent.value === "") {
        return;
    }

    try{
        const response = await axios.post('/api/memos',{
            memoContent: memoContent.value
        });

        console.log("保存しました。内容：", response.data);
        memoContent.value = "";
        emit('save-success');
    } catch (error){
        console.error("保存に失敗しました。", error);
        alert("メモの保存に失敗しました。");
    }
}

function judgeDisabled(memoContent){
    isButtonDisabled.value = memoContent.length <= 0;
}
watch(memoContent,judgeDisabled)

</script>

<template>
    <div class="max-w-xl mx-auto border bg-white rounded-xl shadow-xl py-6 px-6 my-4">
        <div class="flex gap-2 items-center mb-4">
            <PlusSvg />
            <p class="text-lg font-bold">新しいメモ</p>
        </div>
        <div>
            <form @submit.prevent="submitMemo">
                <textarea @keydown.enter.exact.prevent="submitMemo" v-model="memoContent" :placeholder="placeholderText" class="w-full border rounded-xl resize-none focus:border-blue-400 outline-none mb-4 h-32 p-4"></textarea><br/>
                <button @click.prevent="submitMemo" :disabled="isButtonDisabled" class="border rounded-xl w-full bg-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed py-3 transition-all">＋ メモを保存</button>
            </form>
        </div>
    </div>
</template>
