package com.xk.extension.rabbit;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Admin on 2018/1/5.
 */
@RestController
@RequestMapping("test")
public class TestController {

    @Autowired
    private ConnectionFactory connectionFactory;

    @RequestMapping("value")
    public void value(){
        connectionFactory.createConnection().createChannel(true).exchangeDeclare(Exchange);
        System.out.println(connectionFactory);
    }

}
