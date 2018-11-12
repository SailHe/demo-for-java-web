package com.nit.lab.controller;

import com.nit.lab.dto.basic.ProvinceDto;
import com.nit.lab.dto.utils.GridRequestDto;
import com.nit.lab.dto.utils.GridResponseDto;
import com.nit.lab.dto.utils.JsonMsgDto;
import com.nit.lab.service.BasicProvinceService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

@Controller
@RequestMapping("/basicProvince")
public class BasicProvinceController {
    @Resource
    private BasicProvinceService basicProvinceService;

    /**
     * Descriptions: 则访问http://localhost/basicProvince/mavDefault的时候，会调用 mavDefault方法了<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:07
     */
    @RequestMapping(value = "/mavDefault")
    public ModelAndView mavDefault() {
        ModelAndView mav = null;
        try {
            //获取位于(basic/province)的视图
            mav = new ModelAndView("basic/province");
            return mav;
        } catch (Exception e) {
            e.printStackTrace();
            return mav;
        }
    }

    @RequestMapping(value = "/getRecord4Grid")
    @ResponseBody
    public GridResponseDto getRecord4Grid(GridRequestDto gridRequestDto) {
        GridResponseDto gridResponseDto = new GridResponseDto();
        try {
            gridResponseDto = basicProvinceService.getRecord4Grid(gridRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return gridResponseDto;
    }

    /**
     * Descriptions: 获取省份信息用于表格展示 Json版<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:05
     */
    @RequestMapping(value = "/getInfo4Select")
    @ResponseBody
    public JsonMsgDto getInfo4Select() {
        JsonMsgDto jsonMsgDto = new JsonMsgDto();
        try {
            //jsonMsgDto.setJsonData(basicProvinceService.getBasicProvinces4Grid());
            jsonMsgDto.setIsSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonMsgDto.setIsSuccess(false);
        }
        return jsonMsgDto;
    }

    @RequestMapping(value = "/myDefaultPage")
    public ModelAndView myDefaultPage() {
        ModelAndView mav = null;
        try {
            mav = new ModelAndView("basic/myPage");
            return mav;
        } catch (Exception e) {
            e.printStackTrace();
            return mav;
        }
    }

    /**
     * Descriptions: 插入数据<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:07
     */
    @RequestMapping(value = "/insert4Grid")
    public @ResponseBody
    JsonMsgDto insert4Grid(ProvinceDto job) {
        JsonMsgDto jsonMsgDto = new JsonMsgDto();
        try {
            jsonMsgDto.setJsonData(basicProvinceService.insert4Grid(job));
            jsonMsgDto.setIsSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonMsgDto.setIsSuccess(false);
        }
        return jsonMsgDto;
    }

    /**
     * Descriptions: 删除数据<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:07
     */
    @RequestMapping(value = "/delete4Grid")
    public @ResponseBody
    JsonMsgDto delete4Grid(ProvinceDto job) {
        JsonMsgDto jsonMsgDto = new JsonMsgDto();
        try {
            jsonMsgDto.setJsonData(basicProvinceService.delete4Grid(job));
            jsonMsgDto.setIsSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonMsgDto.setIsSuccess(false);
        }
        return jsonMsgDto;
    }

    /**
     * Descriptions: 更新数据<p>
     *
     * @author SailHe
     * @date 2018/11/12 20:07
     */
    @RequestMapping(value = "/update4Grid")
    public @ResponseBody
    JsonMsgDto update4Grid(ProvinceDto job) {
        JsonMsgDto jsonMsgDto = new JsonMsgDto();
        try {
            jsonMsgDto.setJsonData(basicProvinceService.update4Grid(job));
            jsonMsgDto.setIsSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonMsgDto.setIsSuccess(false);
        }
        return jsonMsgDto;
    }
}
