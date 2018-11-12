package com.nit.lab.dto.basic;

import com.nit.lab.model.basic.CityTestEntity;

public class CityTestDto {//dto会被springmvc自动转换为json
    private Integer id;
    private String cityCode;
    private String cityName;
    private String provinceCode;
    private String cityAbbreviation;
    private String cityLetter;

    public CityTestDto() {
    }

    public CityTestDto(Integer id, String cityCode, String provinceCode, String cityName, String cityAbbreviation, String cityLetter) {
        this.id = id;
        this.cityCode = cityCode;
        this.provinceCode = provinceCode;
        this.cityName = cityName;
        this.cityAbbreviation = cityAbbreviation;
        this.cityLetter = cityLetter;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getCityAbbreviation() {
        return cityAbbreviation;
    }

    public void setCityAbbreviation(String cityAbbreviation) {
        this.cityAbbreviation = cityAbbreviation;
    }

    public String getCityLetter() {
        return cityLetter;
    }

    public void setCityLetter(String cityLetter) {
        this.cityLetter = cityLetter;
    }
    ///
    public CityTestEntity toBean(){
        CityTestEntity bean = new CityTestEntity();
        bean.setId(id);
        bean.setCityName(cityName);
        bean.setCityCode(cityCode);
        bean.setProvinceCode(provinceCode);
        bean.setCityAbbreviation(cityAbbreviation);
        bean.setCityLetter(cityLetter);
        return bean;
    }
}
