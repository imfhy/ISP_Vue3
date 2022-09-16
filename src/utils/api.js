// 所有接口
import axios from 'axios';
import { data } from 'jquery';
import request from './request';

// 控制面板相关接口
export const GetHome = () => request.get('/preprocess/schedule/progress/'); // 进度条

// 登录相关接口
export const VerifyLogin = (data) => request.post('/config/user_login/', data); // 登录

// 程序表相关接口
export const GetProgramData = (data) => request.post('/config/get_program_data/', data); // 获取程序表数据到表格
export const EditProgramData = (data) => request.post('/config/edit_program_data/', data); // 修改程序表数据
export const AddProgramData = (data) => request.post('/config/add_program_data/', data); // 程序表数据添加数据
export const DeleteProgramData = (data) => request.post('/config/delete_program_data/', data); // 程序表数据删除数据
export const GetAllProgramData = () => request.get('/config/get_all_program_data/'); // 获取程序表所有数据，用于导出

// 配置表相关接口
export const GetConfigData = () => request.get('/config/get_configdata/'); // 获取分析排程进度条信息

// 在线表格相关接口
export const CheckData = (data) => request.post('/config/check_luckysheet_data/', data); // 检查在线表格
export const ClearAnaProgress = () => request.get("/preprocess/excel/clear_progress/")  // 清空分析排程进度条
export const GetAnaProgress = () => request.get('/preprocess/excel/progress/'); // 获取分析排程进度条
export const AnalysisExcel = (data) => request.post('/preprocess/excel/analysis/', data); // 开始分析
export const GenerateAnaExcel = () => request.get('/preprocess/excel/confirm_output/'); // 生成表格
export const DownloadAnaExcel = () => { // 下载分析排程表格
    return axios({
        method: 'get',
        url: '/api/preprocess/excel/download_schedule/',
        responseType: 'blob'
    })
}
export const QuantifyData = (data) => request.post('/preprocess/schedule/quantify_excel/', data);  // 获取量化结果
export const GetAnaSelectItem = () => request.get('/preprocess/excel/get_analysis_select/');  // 获取分析排程历史结果选择项
export const GetAnaSelectData = (data) => request.post('/preprocess/excel/get_analysis_select_data/', data);  // 获取分析排程历史数据

// 控制面板相关接口
export const CheckExcel = (data) => request.post('/preprocess/schedule/check_input_excel/', data);  // 检查排程表格接口
export const ImportSchedule = (data) => request.post('/preprocess/schedule/import_schedule/', data);  // 导入排程接口
export const ComputSchedule = () => request.get('/preprocess/schedule/compute_schedule/')  // 计算排程接口
export const TrainModel = (data) => request.post('/preprocess/schedule/train_model/', data)  // 训练预测模型接口
export const StopTabu = () => request.get('/preprocess/schedule/stop/')  // 终止深度搜索接口
export const GetProgress = () => request.get('/config/get_progress/'); // 获取跑排程的进度条信息
export const DownloadSchedule = () => { // 下载最新排程接口
    return axios({
        method: 'get',
        url: '/api/preprocess/schedule/download/',
        responseType: 'blob'
    })
}
export const DownloadLatestLog = () => { // 下载最新日志接口
    return axios({
        method: 'get',
        url: '/api/preprocess/schedule/download_log/',
        responseType: 'blob'
    })
}
export const DownloadNoProgram = () => { // 下载无程序表接口
    return axios({
        method: 'get',
        url: '/api/preprocess/schedule/download_program/',
        responseType: 'blob'
    })
}