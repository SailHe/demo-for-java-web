package com.nit.lab.dto.utils;
/**
 * Response回复类
 */
public class GridResponseDto {
    private Integer totalPage;
    private Integer currentPage;
    private Integer totalRecord;
    private Object jsonArray;

    public GridResponseDto() {
    }

    /// <summary>
    /// 带4个参数的构造函数
    /// </summary>
    /// <param name="rows">每页显示行数</param>
    /// <param name="currentPage">当前页</param>
    /// <param name="totalRecord">结果总记录数</param>
    /// <param name="jsonArray">JSON数据</param>
    public GridResponseDto(Integer rows, Integer currentPage, Integer totalRecord, Object jsonArray)
    {
        this.totalPage = this.CalculateTotalPage(rows, totalRecord);
        this.currentPage = currentPage;
        this.totalRecord = totalRecord;
        this.jsonArray = jsonArray;
    }

    /// <summary>
    /// 根据每页显示数与总记录数计算出总页数
    /// </summary>
    /// <param name="rows">每页显示数</param>
    /// <param name="totalRecord">结果总记录数</param>
    /// <returns></returns>
    public Integer CalculateTotalPage(Integer rows, Integer totalRecord) {
        if (rows == 0){
            return 0;
        }
        else{
            //向上取整
            return Integer.valueOf((int)Math.ceil((double) totalRecord / (double) rows));
        }
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(Integer totalRecord) {
        this.totalRecord = totalRecord;
    }

    public Object getJsonArray() {
        return jsonArray;
    }

    public void setJsonArray(Object jsonArray) {
        this.jsonArray = jsonArray;
    }
}
