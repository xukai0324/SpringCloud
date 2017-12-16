package com.xk.user.api;

import com.xk.PlatformConstant;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Admin on 2017/12/13.
 */
@FeignClient(name = PlatformConstant.PLATFORM_SERVICE_NAME, path = UserApi.PATH)
public interface UserApi {

    public static final String PATH = "user";

    @RequestMapping(value = "/login", method = {RequestMethod.GET})
    @ResponseBody
    boolean login();
}
