import request from './request';
export const GetHome = () => request.get('/preprocess/schedule/progress/'); // 进度条
export const VerifyLogin = (data) => request.post('/config/user_login/', data); // 登录
export const GetProgramData = () => request.get('/config/get_program_data/'); // 登录