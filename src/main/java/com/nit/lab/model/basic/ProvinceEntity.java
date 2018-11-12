package com.nit.lab.model.basic;

import javax.persistence.*;

@Entity
@Table(name = "basic_province", schema = "sail_he", catalog = "")
public class ProvinceEntity {
    private Integer id;
    private String provinceCode;
    private String provinceName;
    private String provinceAbbreviation;
    private String provinceLetter;

    @Id
    @Column(name = "Id")
    //@GeneratedValue(strategy = GenerationType.AUTO)///作为主键的生成策略 Annotations 注释 AUTO不行
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "ProvinceCode")
    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    @Basic
    @Column(name = "ProvinceName")
    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    @Basic
    @Column(name = "ProvinceAbbreviation")
    public String getProvinceAbbreviation() {
        return provinceAbbreviation;
    }

    public void setProvinceAbbreviation(String provinceAbbreviation) {
        this.provinceAbbreviation = provinceAbbreviation;
    }

    @Basic
    @Column(name = "ProvinceLetter")
    public String getProvinceLetter() {
        return provinceLetter;
    }

    public void setProvinceLetter(String provinceLetter) {
        this.provinceLetter = provinceLetter;
    }

}
