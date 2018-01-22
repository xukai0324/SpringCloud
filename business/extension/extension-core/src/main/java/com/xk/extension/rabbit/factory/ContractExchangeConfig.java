package com.xk.extension.rabbit.factory;

import com.xk.extension.rabbit.queue.RabbitmqQueue;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ContractExchangeConfig {

    @Autowired
    private RabbitAdmin rabbitAdmin;


    @Bean
    public Binding bindingTopicToSlef(Queue selfQueue, TopicExchange topicExchange){
        Binding binding = BindingBuilder.bind(selfQueue).to(topicExchange).with(RabbitmqQueue.CONTRACE_SELF);
        rabbitAdmin.declareBinding(binding);
        return binding;
    }

    @Bean
    public Binding bindingDirectToTen(Queue tenQueue, DirectExchange directExchange){
        Binding binding = BindingBuilder.bind(tenQueue).to(directExchange).with(RabbitmqQueue.CONTRACE_TENANT);
        rabbitAdmin.declareBinding(binding);
        return binding;
    }
}
