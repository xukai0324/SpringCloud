package com.xk.platform.user.hystrix;

import com.xk.platform.user.dto.UserDto;
import com.xk.platform.user.api.UserApi;
import org.springframework.stereotype.Component;

/**
 * Created by Admin on 2017/12/17.
 */
@Component
public class UserHystrix implements UserApi {
    @Override
    public boolean login(UserDto userDto) {
        System.out.println("method login is fail......");
        return false;
    }
}
