package com.xk.platform.user.controller;

import com.xk.platform.user.api.UserApi;
import com.xk.platform.user.dto.UserDto;
import com.xk.platform.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Admin on 2017/12/14.
 */
@RestController
@RequestMapping(value = UserApi.PATH)
public class UserController implements UserApi{

    @Autowired
    private UserService userService;

    @Value("${private.test.name}")
    private String name;

    @Override
    public boolean login(UserDto userDto) throws Exception{
        System.out.println(name+"--------");
        return userService.login(userDto);
    }


}
