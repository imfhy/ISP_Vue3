// 常用函数

// 下载Excel函数
function downloadExcel(res){
    const link = document.createElement('a')
    let blob = new Blob([res.data])
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    let temp = res.headers["content-disposition"].split("attachment;filename=")[1]
    let file_name = decodeURIComponent(temp)
    link.download = file_name
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href) // 释放URL对象
    document.body.removeChild(link)
}

export { downloadExcel }