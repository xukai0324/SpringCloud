package com.xk.extension.rabbit;

import com.xk.extension.rabbit.exchange.RabbitmqExchange;
import com.xk.extension.rabbit.queue.RabbitmqQueue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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
    private RabbitTemplate rabbitTemplate;

    @RequestMapping("value")
    public void value(String name){
        rabbitTemplate.convertAndSend(RabbitmqExchange.CONTRACT_DIRECT, RabbitmqQueue.CONTRACE_TENANT,name);
    }

    @RequestMapping("test")
    public void test(String name){
        rabbitTemplate.convertAndSend(RabbitmqExchange.CONTRACT_TOPIC,RabbitmqQueue.CONTRACE_SELF,name);
    }

}
