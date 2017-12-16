package com.xk.user.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.xk.user.api.UserApi;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Admin on 2017/12/14.
 */
@RestController
@RequestMapping(value = UserApi.PATH)
public class UserController implements UserApi{



    @Override
    @HystrixCommand(fallbackMethod = "booleanFallBackFalse")
    public boolean login() {
        return true;
    }


    public boolean booleanFallBackFalse(){
        System.out.println("hi fall back.....");
        return false;
    }
}
