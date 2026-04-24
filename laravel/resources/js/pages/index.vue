<script setup lang="ts">
//import Welcome from "../features/Welcome.vue";
import Header from '../components/Header.vue'
import TextareaForm from '../components/TextareaForm.vue'
import MemoList from '../components/MemoList.vue'
</script>

<template>
  <Header />
    <main class="bg-orange-50 py-4">
        <TextareaForm />
        <MemoList />
    </main>
</template>
