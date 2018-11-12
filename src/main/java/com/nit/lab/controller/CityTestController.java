package com.nit.lab.controller;

import com.nit.lab.dto.basic.CityTestDto;
import com.nit.lab.dto.utils.GridRequestDto;
import com.nit.lab.dto.utils.GridResponseDto;
import com.nit.lab.dto.utils.JsonMsgDto;
import com.nit.lab.service.CrudService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/basicCityTest")
/**
 * Descriptions: 一个用来处理请求地址映射的注解，可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。<p>
 *
 * @author SailHe
 * @date 2018/11/12 20:05
 */
public class CityTestController {
    @Resource
    private CrudService<CityTestDto> crudService;

    /**
     * Descriptions: 获取省份信息用于表格展示<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:05
     */
    @RequestMapping(value = "/getRecord")
    @ResponseBody
    public GridResponseDto getRecord(GridRequestDto gridRequestDto) {
        GridResponseDto gridResponseDto = new GridResponseDto();
        try {
            gridResponseDto = crudService.getRecord(gridRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return gridResponseDto;
    }

    /**
     * Descriptions: MVC信息页面跳转: 访问http://localhost/basicCityTest/shaw 的时候，会调用 shaw 映射的方法<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:05
     */
    @RequestMapping(value = "/shaw")
    public ModelAndView shaw() {
        ModelAndView mav = null;
        try {
            mav = new ModelAndView("basic/cityTest");
            return mav;
        } catch (Exception e) {
            e.printStackTrace();
            return mav;
        }
    }

    /**
     * Descriptions: 插入数据 by SailHe<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:05
     */
    @RequestMapping(value = "/add")
    public @ResponseBody
    JsonMsgDto add(CityTestDto job) {
        JsonMsgDto jsonMsgDto = new JsonMsgDto();
        try {
            jsonMsgDto.setJsonData(crudService.add(job));
            jsonMsgDto.setIsSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonMsgDto.setIsSuccess(false);
        }
        return jsonMsgDto;
    }

    /**
     * Descriptions: 删除数据 by SailHe<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:05
     */
    @RequestMapping(value = "/delete")
    public @ResponseBody
    JsonMsgDto delete(Integer id) {
        CityTestDto job = new CityTestDto();
        job.setId(id);
        JsonMsgDto jsonMsgDto = new JsonMsgDto();
        try {
            jsonMsgDto.setJsonData(crudService.delete(job));
            jsonMsgDto.setIsSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonMsgDto.setIsSuccess(false);
        }
        return jsonMsgDto;
    }

    /**
     * Descriptions: 更新数据 by SailHe<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:05
     */
    @RequestMapping(value = "/edit")
    public @ResponseBody
    JsonMsgDto edit(CityTestDto job) {
        JsonMsgDto jsonMsgDto = new JsonMsgDto();
        try {
            jsonMsgDto.setJsonData(crudService.edit(job));
            jsonMsgDto.setIsSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonMsgDto.setIsSuccess(false);
        }
        return jsonMsgDto;
    }
}
