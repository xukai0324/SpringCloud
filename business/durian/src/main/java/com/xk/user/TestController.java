package com.xk.user;

import com.xk.platform.user.api.UserApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Admin on 2017/12/16.
 */
@RestController
@RequestMapping("/user")
public class TestController {
    @Autowired
    private UserApi userApi;


    @RequestMapping(value = "/test")
    public boolean login() {
        return userApi.login();
    }
}
