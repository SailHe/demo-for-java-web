package com.nit.lab.service;

import com.nit.lab.dto.JsonMsgDto;
import com.nit.lab.dto.basic.ProvinceDto;
import com.nit.lab.dto.utils.GridRequestDto;
import com.nit.lab.dto.utils.GridResponseDto;

import java.util.List;

/**
 * @author SailHe
 * @date 2018/1/23 19:10
 */
public interface BasicProvinceService {

    /**
     * Description: 获取省份信息用于表格展示
     * @Author: SN
     * @Date: 2017/6/24 23:44
     */
    public GridResponseDto getRecord4Grid(GridRequestDto gridRequestDto) throws Exception;
    /**
     * @author SailHe
     * @date 2018/1/23 19:10
     */
    public Integer delete4Grid(ProvinceDto jod) throws Exception;
    /**
     * @author SailHe
     * @date 2018/1/23 19:10
     */
    public Integer update4Grid(ProvinceDto jod) throws Exception;

    /**
     * fetch data by rule id
     *
     * @param ruleId rule id
     * @param page page number
     * @param jsonContext json format context
     * @return Result<XxxxDO>
     */
    //int fetchDataByRuleId(Long ruleId, Integer page, String jsonContext) throws Exception;

    /**
     * 插入
     *
     * @author SailHe
     * @date 2018/1/23 19:22
     * @return java.lang.Integer
     * @param job job
     * Description: insert4Grid
     * @exception Exception no // 这个与下面的同义 但是这个无法被阿里规范插件识别
     * @throws Exception no
     */
    Integer insert4Grid(ProvinceDto job) throws Exception;
}
