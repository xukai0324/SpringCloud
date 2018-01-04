package com.xk.platform.user.service;

import com.xk.platform.user.dto.UserDto;

/**
 * Created by Admin on 2017/12/19.
 */
public interface UserService {

    boolean login(UserDto user) throws Exception;

}
