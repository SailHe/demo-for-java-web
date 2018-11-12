package com.nit.lab.dto;

import javax.persistence.*;

public class BasicProvinceDto {
    private Integer id;
    private String provinceCode;
    private String provinceName;
    private String provinceAbbreviation;
    private String provinceLetter;

    public BasicProvinceDto(Integer id, String provinceCode, String provinceName, String provinceAbbreviation, String provinceLetter) {
        this.id = id;
        this.provinceCode = provinceCode;
        this.provinceName = provinceName;
        this.provinceAbbreviation = provinceAbbreviation;
        this.provinceLetter = provinceLetter;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getProvinceAbbreviation() {
        return provinceAbbreviation;
    }

    public void setProvinceAbbreviation(String provinceAbbreviation) {
        this.provinceAbbreviation = provinceAbbreviation;
    }

    public String getProvinceLetter() {
        return provinceLetter;
    }

    public void setProvinceLetter(String provinceLetter) {
        this.provinceLetter = provinceLetter;
    }
}
