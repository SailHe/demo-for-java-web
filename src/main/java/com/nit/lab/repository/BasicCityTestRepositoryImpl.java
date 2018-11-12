package com.nit.lab.repository;

import com.nit.lab.dto.basic.CityTestDto;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class BasicCityTestRepositoryImpl {
    @PersistenceContext
    private EntityManager em;

    public List<CityTestDto> getRecord(String search, Integer start, Integer length) throws Exception {
        String sql = "SELECT Id, CityCode, CityName, ProvinceCode, CityAbbreviation, CityLetter FROM basic_city";
        if(search != null) {
            sql += " WHERE " + search;
        }
        sql += " order by Id desc";
        System.out.println("getRecord:" + sql);
        Query query = em.createNativeQuery(sql);
        query.unwrap(NativeQuery.class).setResultTransformer(Transformers.aliasToBean(CityTestDto.class));
        System.out.println("start " + start + "  length " + length + "\r\n");
        List<CityTestDto> basicProvinces = query.setFirstResult(start).setMaxResults(length).getResultList();
        return basicProvinces;
    }

    public Integer edit(CityTestDto job) throws Exception {
        String sql = "UPDATE sail_he.basic_city SET CityCode = ?, CityName = '?',ProvinceCode = ?,  CityAbbreviation = '?', CityLetter = '?' WHERE Id = ";
        sql += job.getId().toString();
        /*正则表达式 元字符串转义*/
        sql = sql.replaceFirst("\\?", job.getCityCode());
        sql = sql.replaceFirst("\\?", job.getCityName());
        sql = sql.replaceFirst("\\?", job.getProvinceCode());
        sql = sql.replaceFirst("\\?", job.getCityAbbreviation());
        sql = sql.replaceFirst("\\?", job.getCityLetter());
        System.out.println("edit:"+sql + "\r\n");
        Query query = em.createNativeQuery(sql);
        return query.executeUpdate();
    }

    public Integer getRecordCount(String search) throws Exception {
        String sql = "select count(*) from sail_he.basic_city";
        if (search != null) {
            sql += " where " + search;
        }
        System.out.println("getRecordCount:" + sql);
        Query query = em.createNativeQuery(sql);
        Integer count = Integer.valueOf(query.getSingleResult().toString());
        System.out.println(count + "\r\n");
        return count;
    }
}
