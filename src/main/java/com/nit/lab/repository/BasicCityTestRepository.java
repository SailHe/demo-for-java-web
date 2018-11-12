package com.nit.lab.repository;

import com.nit.lab.dto.basic.CityTestDto;
import com.nit.lab.model.basic.CityTestEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BasicCityTestRepository extends CrudRepository<CityTestEntity, Long> {


    /**
     * Description: 获取省份信息用于表格展示
     * @Author: SN
     * @Date: 2017/6/24 23:44
     */
    public List<CityTestDto> getRecord(String search, Integer start, Integer length) throws Exception;


    public Integer edit(CityTestDto id) throws Exception;

    /**
     * Description: 获取省份信息数量用于表格展示
     * @Author: SN
     * @Date: 2017/6/24 23:44
     */
    public Integer getRecordCount(String search) throws Exception;

}
