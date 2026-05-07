import {ref, computed} from 'vue';
import axios from 'axios';
import {Memo} from '@/types';

const memos = ref<Memo[]>([]);
const filterText = ref<string>("");
const editId = ref<number | null>(null);
const editContent = ref<string>("");

function compareFunc(a: Memo, b: Memo){
    return b.is_starred - a.is_starred;
}
export function useMemos(){
    const fetchMemos = async () => {
        try {
            const response = await axios.get('/api/memos');
            memos.value = response.data;
        } catch(error){
            console.error("データの取得に失敗しました", error);
        }
    };

    const deleteMemo = async (id) => {
        try {
            await axios.delete('/api/memos/' + id);

            await fetchMemos();
        } catch (error){
            console.error("削除に失敗しました。", error);
            alert("メモの削除に失敗しました。");
        }
    };

    const judgeEditId = (memo: Memo) => {
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
    };

    const toggleStar = async(memo: Memo) => {
        try{
            await axios.patch('/api/memos/' + memo.id + '/star');
            memo.is_starred = !memo.is_starred;
        } catch(error){
            console.error("更新に失敗しました。", error);
        }
    };

    const filteredMemos = computed(() => {
        let result = memos.value.filter((memo) => memo.content.includes(filterText.value));
        return result.sort(compareFunc);
    });

    return {
        memos,
        fetchMemos,
        deleteMemo,
        editId,
        editContent,
        judgeEditId,
        editMemo,
        toggleStar,
        filterText,
        filteredMemos
    };
}
