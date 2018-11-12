package com.nit.lab.service.impl;

import com.nit.lab.dto.basic.CityTestDto;
import com.nit.lab.dto.utils.GridRequestDto;
import com.nit.lab.dto.utils.GridResponseDto;
import com.nit.lab.repository.BasicCityTestRepository;
import com.nit.lab.service.BasicCityTestService;
import com.nit.lab.service.CrudService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BasicCityTestServiceImpl implements BasicCityTestService {

    @Resource
    private BasicCityTestRepository basicCityTestRepository;

    public GridResponseDto getRecord(GridRequestDto gridRequestDto) throws Exception {
        Integer start = gridRequestDto.getRows() * (gridRequestDto.getPage() - 1);
        List<CityTestDto> listProvinceDto = basicCityTestRepository
                .getRecord(gridRequestDto.getQueryData(), start, gridRequestDto.getRows());
        System.out.println(listProvinceDto.get(0).toString());
        basicCityTestRepository.count();
        Integer count = basicCityTestRepository.getRecordCount(gridRequestDto.getQueryData());
        return new GridResponseDto(gridRequestDto.getRows(), gridRequestDto.getPage(), count, listProvinceDto);
    }

    @Transactional///自己写的事务 否则 javax.persistence.TransactionRequiredException: Executing an update/delete query...
    public Integer edit(CityTestDto job) throws Exception {
        ///save一个同样id的会覆盖
        return add(job);
        ///return basicCityTestRepository.edit(job);
    }

    /**
     * 调用Dao接口插入一条新记录
     */
    public Integer add(CityTestDto job) throws Exception {
        return basicCityTestRepository.save(job.toBean()).getId();
    }

    /**
     * 调用Dao接口按照id删除一条记录
     */
    public Integer delete(CityTestDto job) throws Exception {
        Long tmp = job.getId().longValue();///调用其按id查找会报异常
        basicCityTestRepository.delete(job.toBean());///删除数据库中的job实体
        return job.getId();
    }
}
