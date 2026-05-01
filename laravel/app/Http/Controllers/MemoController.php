<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Memo;

class MemoController extends Controller
{
    public function store(Request $request){
        $memo = Memo::create([
            'content' => $request['memoContent'],
            'created_time' => Carbon::now(),
        ]);

        return response()->json([
            'message' => 'Memo created successfully',
            'memo' => $memo
        ], 201);
    }

    public function index(){
        //$memos = Memo::all();

        //return response()->json($memos);
        return Memo::latest()->get();
    }

    public function delete($id){
        $memo = Memo::find($id);

        $memo->delete();

        return response()->json([],200);
    }

    public function update(Request $request, $id){
        $memo = Memo::find($id);

        $memo->content = $request['editContent'];
        $memo->created_time = Carbon::now();
        $memo->save();

        return response()->json([
            'message' => 'Memo updated successfully',
            'memo' => $memo
        ], 200);
    }
}
