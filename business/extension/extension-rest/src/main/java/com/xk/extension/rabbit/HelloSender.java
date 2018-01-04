package com.xk.extension.rabbit;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * Created by Admin on 2018/1/4.
 */
@RestController
@RequestMapping("test")
public class HelloSender {

    @Autowired
    private AmqpTemplate amqpTemplate;

    @RequestMapping("/value")
    public void send(){
        String context = "hello " + new Date();
        this.amqpTemplate.convertAndSend("hello",context);
    }
}
