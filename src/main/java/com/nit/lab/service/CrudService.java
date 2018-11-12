package com.nit.lab.service;

import com.nit.lab.dto.utils.GridRequestDto;
import com.nit.lab.dto.utils.GridResponseDto;
/**
 * 增查改删服务接口
 * 增加(Create)、读取查询(Retrieve)、更新(Update)和删除(Delete)
 * */
public interface CrudService<Dto> {
    //class Dto extends T{}///数据传输对象

    public Integer add(Dto job) throws Exception;

    public GridResponseDto getRecord(GridRequestDto gridRequestDto) throws Exception;

    public Integer edit(Dto jod) throws Exception;

    public Integer delete(Dto jod) throws Exception;
}
