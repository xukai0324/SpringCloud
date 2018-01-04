package com.xk.platform.user.api;

import com.xk.platform.PlatformConstant;
import com.xk.platform.user.dto.UserDto;
import com.xk.platform.user.hystrix.UserHystrix;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Admin on 2017/12/13.
 */
@FeignClient(name = PlatformConstant.PLATFORM_SERVICE_NAME, path = UserApi.PATH, fallback = UserHystrix.class)
public interface UserApi {

    public static final String PATH = "user";

    @RequestMapping(value = "/login", method = {RequestMethod.GET})
    @ResponseBody
    boolean login(UserDto userDto) throws Exception;
}
