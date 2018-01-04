package com.xk.platform.user.service.impl;

import com.xk.platform.user.dao.UserMapper;
import com.xk.platform.user.entity.User;
import com.xk.platform.user.entity.UserExample;
import com.xk.platform.user.dto.UserDto;
import com.xk.platform.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * Created by Admin on 2017/12/20.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean login(UserDto user) throws Exception {
        if (user == null || StringUtils.isEmpty(user.getUserCode()) || StringUtils.isEmpty(user.getPassword()))return false;
        UserExample userExample = new UserExample();
        UserExample.Criteria criteria = userExample.createCriteria();
        criteria.andUserCodeEqualTo(user.getUserCode());
        List<User> users = userMapper.selectByExample(userExample);
        if (users == null || users.size() <= 0) return false;
        User userDatabase = users.get(0);
        if (!userDatabase.getPassword().equals(user.getPassword())) return false;
        return true;
    }

}
