package com.nit.lab.repository;

import com.nit.lab.dto.basic.ProvinceDto;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
///JPA是Java Persistence API的简称(Java持久层API)
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;///JPA的Query接口
//import org.hibernate.Query;///Hibernate的Query接口
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.List;

public class BasicProvinceRepositoryImpl {
    @PersistenceContext
    private EntityManager em;

    public List<ProvinceDto> getRecord4Grid(String search, Integer start, Integer length) throws Exception {
        /*String sql = "select bp.Id, bp.ProvinceCode, bp.ProvinceName, bp.ProvinceAbbreviation, bp.ProvinceLetter from basic_province bp";
        if (search != null) {
            sql += " where " + search;
        }sql += " order by bp.Id desc";*/
        String sql = "SELECT Id, ProvinceCode, ProvinceName, ProvinceAbbreviation, ProvinceLetter FROM basic_province";
        if(search != null)
            sql += " WHERE " + search;
        sql += " order by Id desc";
        Query query = em.createNativeQuery(sql);
        query.unwrap(NativeQuery.class).setResultTransformer(Transformers.aliasToBean(ProvinceDto.class));
        System.out.println(start);
        System.out.println(length);
        List<ProvinceDto> basicProvinces = query.setFirstResult(start).setMaxResults(length).getResultList();
        return basicProvinces;
    }

    public Integer update4Grid(ProvinceDto job) throws Exception {
        String sql = "UPDATE basic_province SET provinceCode = ?, ProvinceName = '?', ProvinceAbbreviation = '?', ProvinceLetter = '?' WHERE Id = ";
        sql += job.getId().toString();/*正则表达式 元字符串转义*/
        sql = sql.replaceFirst("\\?", job.getProvinceCode());
        sql = sql.replaceFirst("\\?", job.getProvinceName());
        sql = sql.replaceFirst("\\?", job.getProvinceAbbreviation());
        sql = sql.replaceFirst("\\?", job.getProvinceLetter());
        System.out.println(sql);
        Query query = em.createNativeQuery(sql);
        return query.executeUpdate();
    }

    /**未使用 马甲
     * */
    public Integer delete4Grid(Integer delId) throws Exception {
        String sql = "DELETE FROM basic_province WHERE id = (?)";
        return delId;
    }

    public Integer getRecordCount(String search) throws Exception {
        {
            String sql = "select count(*) from basic_province bp";
            if (search != null) {
                sql += " where " + search;
            }
            Query query = em.createNativeQuery(sql);
            Integer count = Integer.valueOf(query.getSingleResult().toString());
            System.out.println(count);
            return count;
        }
    }
}
