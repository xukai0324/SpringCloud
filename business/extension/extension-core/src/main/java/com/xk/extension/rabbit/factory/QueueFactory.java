package com.xk.extension.rabbit.factory;

import com.xk.extension.rabbit.queue.RabbitmqQueue;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueueFactory {
    @Autowired
    private RabbitAdmin rabbitAdmin;


    @Bean
    public Queue selfQueue(){
        Queue queue = new Queue(RabbitmqQueue.CONTRACE_SELF,true);
        rabbitAdmin.declareQueue(queue);
        return queue;
    }

    @Bean
    public Queue tenQueue(){
        Queue queue = new Queue(RabbitmqQueue.CONTRACE_TENANT,true);
        rabbitAdmin.declareQueue(queue);
        return queue;
    }


}
