<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => [
                'required',
                'string',
                'regex:/^[a-zA-Zа-яА-я0-9_]+$/',
                'min:6',
                'max:255',
                'unique:users,username'
            ],
            'gender' => 'required',
            'question_id' => 'required|integer|exists:questions,id',
            'answer' => 'required|string|min:3|max:255',
            'password' => [
                'required',
                'string',
                'min:8'
            ],
        ], [
            'username.required' => 'Имя пользователя обязательно для заполнения.',
            'username.string' => 'Имя пользователя должно быть строкой.',
            'username.regex' => 'Имя пользователя должно содержать только буквы, цифры и подчеркивания.',
            'username.min' => 'Имя пользователя не может быть меньше 6 символов.',
            'username.max' => 'Имя пользователя не может превышать 255 символов.',
            'username.unique' => 'Данное имя пользователя уже занято.',
            'gender.required' => 'Пол обязательно для заполнения.',
            'question_id.required' => 'Вопрос обязателен для заполнения.',
            'question_id.integer' => 'Поле идентификатор вопроса должно быть целым числом.',
            'question_id.exists' => 'Выбранный вопрос не существует.',
            'answer.required' => 'Ответ обязателен для заполнения.',
            'answer.string' => 'Ответ должен быть строкой.',
            'answer.min' => 'Ответ не может быть меньше 3 символов.',
            'answer.max' => 'Ответ не может превышать 255 символов.',
            'password.required' => 'Пароль обязательно для заполнения.',
            'password.regex:/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z0-9а-яА-Я]+$/',
            'password.string' => 'Пароль должен быть строкой.',
            'password.min' => 'Пароль должен содержать минимум 8 символов.',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        }
        $credentials = $request->only('username', 'gender', 'question_id', 'answer', 'password');
        $credentials['password'] = bcrypt($credentials['password']);
        $user = User::create($credentials);

        return response()->json([
            'status' => 200,
            'message' => 'Пользователь успешно создан.',
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ], [
            'username.required' => 'Имя пользователя обязательно для заполнения.',
            'password.required' => 'Пароль обязательно для заполнения.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 40,
                'validate_err' => $validator->messages(),
            ]);
        }

        $credentials = $request->only('username', 'password');

        if (!$token = auth()->attempt($credentials)) {
            $user = User::where('username', $request->input('username'))->first();
            if (!$user) {
                return response()->json([
                    'status' => 401,
                    'error' => 'Пользователь с таким именем не существует.',
                ]);
            } else {
                return response()->json([
                    'status' => 401,
                    'error' => 'Неправильный пароль.',
                ]);
            }
        }

        return $this->respondWithToken($token);
    }

    public function logout(Request $request)
    {
        auth()->logout();

        return response()->json([
            'status' => 200,
            'message' => 'Вы успешно разлогинились.',
        ]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function existsUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
        ], [
            'username.required' => 'Имя пользователя обязательно для заполнения.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $username = $request->input('username');
            $users = DB::table('users')->where('username', $username)->first();

            if (!$users) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Пользователь не существует.',
                ]);
            } else {
                $question = DB::table('questions')->where('id', $users->question_id)->first();
                $answer = $users->answer;

                return response()->json([
                    'status' => 200,
                    'message' => 'Пользователь существует.',
                    'question' => $question,
                    'answer' => $answer,
                ]);
            }
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => [
                'required',
                'string',
                'min:8', 
                'regex:/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z0-9а-яА-Я]+$/',
            ],
        ], [

            'password.required' => 'Пароль обязательно для заполнения.',
            'password.string' => 'Пароль должно быть строкой.',
            'password.min' => 'Пароль должен содержать минимум 8 символов.',
            'password.regex' => 'Пароль должен содержать минимум 1 заглавную букву, 1 строчную букву и 1 цифру.',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $credentials = request(['username', 'password']);
            $credentials['password'] = bcrypt($credentials['password']);

            DB::table('users')
                ->where('username', $request->input('username'))
                ->update($credentials);

            return response()->json([
                'status' => 200,
                'message' => 'Пароль успешно изменен.',
            ]);
        }
    }
}
