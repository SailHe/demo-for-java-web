package com.nit.lab.dto.utils;

/**
 * Created by SN on 2017/2/18.
 */
public class JsonMsgDto {
    private Boolean isSuccess;
    private Object jsonData;

    public JsonMsgDto () {
    }

    public JsonMsgDto ( Boolean isSuccess, Object jsonData) {
        this.isSuccess = isSuccess;
        this.jsonData = jsonData;
    }

    public Boolean getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public Object getJsonData() {
        return jsonData;
    }

    public void setJsonData(Object jsonData) {
        this.jsonData = jsonData;
    }

}
