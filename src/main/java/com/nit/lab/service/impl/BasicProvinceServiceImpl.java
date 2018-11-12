package com.nit.lab.service.impl;

import com.nit.lab.dto.basic.ProvinceDto;
import com.nit.lab.dto.utils.GridRequestDto;
import com.nit.lab.dto.utils.GridResponseDto;
import com.nit.lab.repository.BasicProvinceRepository;
import com.nit.lab.service.BasicProvinceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BasicProvinceServiceImpl implements BasicProvinceService {

    @Resource
    private BasicProvinceRepository basicProvinceRepository;

    public GridResponseDto getRecord4Grid(GridRequestDto gridRequestDto) throws Exception {
        Integer start = gridRequestDto.getRows() * (gridRequestDto.getPage() - 1);
        List<ProvinceDto> listProvinceDto = basicProvinceRepository
                .getRecord4Grid(gridRequestDto.getQueryData(), start, gridRequestDto.getRows());
        System.out.println(listProvinceDto.get(0).toString());
        Integer count = basicProvinceRepository.getRecordCount(gridRequestDto.getQueryData());
        return new GridResponseDto(gridRequestDto.getRows(), gridRequestDto.getPage(), count, listProvinceDto);
    }

    @Transactional///自己写的事务 否则 javax.persistence.TransactionRequiredException: Executing an update/delete query...
    public Integer update4Grid(ProvinceDto jod) throws Exception {
        ///或许可以直接save一个同样id的
        return basicProvinceRepository.update4Grid(jod);
    }

    /**
     * 调用Dao接口插入一条新记录
     */
    public Integer insert4Grid(ProvinceDto job) throws Exception {
        return basicProvinceRepository.save(job.toBean()).getId();
    }

    /**
     * 调用Dao接口按照id删除一条记录
     */
    public Integer delete4Grid(ProvinceDto job) throws Exception {
        Long tmp = job.getId().longValue();///调用其按id查找会报异常
        basicProvinceRepository.delete(job.toBean());///删除数据库中的job实体
        return job.getId();
    }
}