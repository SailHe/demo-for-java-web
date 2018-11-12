package com.nit.lab.repository;

import com.nit.lab.dto.basic.ProvinceDto;
import com.nit.lab.model.basic.ProvinceEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BasicProvinceRepository extends CrudRepository<ProvinceEntity, Long>  {


    /** mybatis替换hibernate
     * 依赖注入 单片
     * 配置文件演化过程
     * Description: 获取省份信息用于表格展示
     * @Author: SN
     * @Date: 2017/6/24 23:44
     */
    List<ProvinceDto> getRecord4Grid(String search, Integer start, Integer length) throws Exception;

    /**
     * Description: 按id删除省份
     * @author: SailHe
     * @Date: 2017/11/11 23:40
     */
    Integer delete4Grid(Integer delId) throws Exception;

    Integer update4Grid(ProvinceDto id) throws Exception;

    /**
     * Description: 获取省份信息数量用于表格展示
     * @Author: SN
     * @Date: 2017/6/24 23:44
     */
    Integer getRecordCount(String search) throws Exception;

}
