package com.nit.lab.dto.utils;

/**
*request 请求类
 */
public class GridRequestDto {
    private Integer rows;
    private Integer page;
    private Integer start;
    private String search;
    private String filters;
    private String queryData;
    private String sidx;
    private String sord;

    public GridRequestDto() {
    }

    public GridRequestDto(Integer rows, Integer page, Integer start, String search, String filters, String queryData, String sidx, String sord) {
        this.rows = rows;
        this.page = page;
        this.start = start;
        this.search = search;
        this.filters = filters;
        this.queryData = queryData;
        this.sidx = sidx;
        this.sord = sord;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getFilters() {
        return filters;
    }

    public void setFilters(String filters) {
        this.filters = filters;
    }

    public String getQueryData() {
        return queryData;
    }

    public void setQueryData(String queryData) {
        this.queryData = queryData;
    }

    public String getSidx() {
        return sidx;
    }

    public void setSidx(String sidx) {
        this.sidx = sidx;
    }

    public String getSord() {
        return sord;
    }

    public void setSord(String sord) {
        this.sord = sord;
    }
}

