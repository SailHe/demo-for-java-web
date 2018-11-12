package com.nit.lab.model.basic;

import javax.persistence.*;

@Entity
@Table(name = "basic_city", schema = "sail_he", catalog = "")
public class CityTestEntity {
    private Integer id;///
    private String cityCode;
    private String cityName;
    private String provinceCode;
    private String cityAbbreviation;
    private String cityLetter;

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)///
    public Integer getId() {///
        return id;
    }

    public void setId(Integer id) {///
        this.id = id;
    }

    @Basic
    @Column(name = "CityCode")
    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    @Basic
    @Column(name = "CityName")
    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
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
    @Column(name = "CityAbbreviation")
    public String getCityAbbreviation() {
        return cityAbbreviation;
    }

    public void setCityAbbreviation(String cityAbbreviation) {
        this.cityAbbreviation = cityAbbreviation;
    }

    @Basic
    @Column(name = "CityLetter")
    public String getCityLetter() {
        return cityLetter;
    }

    public void setCityLetter(String cityLetter) {
        this.cityLetter = cityLetter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CityTestEntity that = (CityTestEntity) o;

        if (id != that.id) return false;
        if (cityCode != null ? !cityCode.equals(that.cityCode) : that.cityCode != null) return false;
        if (cityName != null ? !cityName.equals(that.cityName) : that.cityName != null) return false;
        if (provinceCode != null ? !provinceCode.equals(that.provinceCode) : that.provinceCode != null) return false;
        if (cityAbbreviation != null ? !cityAbbreviation.equals(that.cityAbbreviation) : that.cityAbbreviation != null)
            return false;
        if (cityLetter != null ? !cityLetter.equals(that.cityLetter) : that.cityLetter != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (cityCode != null ? cityCode.hashCode() : 0);
        result = 31 * result + (cityName != null ? cityName.hashCode() : 0);
        result = 31 * result + (provinceCode != null ? provinceCode.hashCode() : 0);
        result = 31 * result + (cityAbbreviation != null ? cityAbbreviation.hashCode() : 0);
        result = 31 * result + (cityLetter != null ? cityLetter.hashCode() : 0);
        return result;
    }
}
