package com.nit.lab.dto.basic;

import com.nit.lab.model.basic.ProvinceEntity;

///数据传输对象
public class ProvinceDto {
    private Integer id;
    private String provinceCode;
    private String provinceName;
    private String provinceAbbreviation;
    private String provinceLetter;

    public ProvinceDto() {
    }

    public ProvinceDto(Integer id, String provinceCode, String provinceName, String provinceAbbreviation, String provinceLetter) {
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

    /**
     * 修改getSize实现时，不破坏向后兼容性。
     * 这种
     * public int getSize() {
     *     return size;
     * }的惯用手法，就是Java Bean。
     */
    ///将数据传输对象转换为实体对象
    public ProvinceEntity toBean(){
        ProvinceEntity bean = new ProvinceEntity();
        bean.setId(id);
        bean.setProvinceCode(provinceCode);
        bean.setProvinceName(provinceName);
        bean.setProvinceAbbreviation(provinceAbbreviation);
        bean.setProvinceLetter(provinceLetter);
        return bean;
    }
}
