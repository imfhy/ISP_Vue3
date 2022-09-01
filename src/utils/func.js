// 常用函数

import XLSX from 'xlsx'

// 前端导出Excel，传入请求到的数据表格数据[{},{}...]、列名、列名映射以及导出的文件命名
function downloadExcel(res, fileName){
    let sheetData = res.data.table_data
    let fields = res.data.fields
    let fields_display = res.data.fields_display
    let newData = [fields_display, ...sheetData]
    let sheet = XLSX.utils.json_to_sheet(newData, {header:fields, skipHeader:true})
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, fileName);
    XLSX.writeFile(wb, fileName + ".xlsx");
}

export { downloadExcel }