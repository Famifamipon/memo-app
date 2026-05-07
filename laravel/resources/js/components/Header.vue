<script setup lang="ts">
import DocumentSvg from './svgs/DocumentSvg.vue'
</script>

<template>
    <header class="bg-white">
        <div class="flex gap-2 justify-center items-center pt-6 pb-2">
            <DocumentSvg class="w-10 h-10"/>
            <p class="text-orange-500 text-3xl inline-block scale-y-110">かんたんメモ</p>
        </div>
        <div class="flex justify-center mb-6">
            <p class="text-xs">思いついたことをサッと記録しよう</p>
        </div>
    </header>

</template>
