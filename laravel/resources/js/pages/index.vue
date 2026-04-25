<script setup lang="ts">
//import Welcome from "../features/Welcome.vue";
import {ref} from 'vue'
import Header from '../components/Header.vue'
import TextareaForm from '../components/TextareaForm.vue'
import MemoList from '../components/MemoList.vue'

const memoListRef = ref();

const MemoSaved = () => {
    if(memoListRef.value){
        memoListRef.value.fetchMemos();
    }
};
</script>

<template>
  <Header />
    <main class="bg-orange-50 py-4">
        <TextareaForm @save-success="MemoSaved" />
        <MemoList ref="memoListRef" />
    </main>
</template>
