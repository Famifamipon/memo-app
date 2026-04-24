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
}
