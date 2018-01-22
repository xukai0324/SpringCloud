package com.xk.extension.rabbit.factory;

import com.xk.extension.rabbit.exchange.RabbitmqExchange;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExchangeFactory {
    @Autowired
    private RabbitAdmin rabbitAdmin;

    @Bean
    public TopicExchange topicExchange(){
        TopicExchange topicExchange = new TopicExchange(RabbitmqExchange.CONTRACT_TOPIC);
        rabbitAdmin.declareExchange(topicExchange);
        return topicExchange;
    }


    @Bean
    public DirectExchange directExchange(){
        DirectExchange directExchange = new DirectExchange(RabbitmqExchange.CONTRACT_DIRECT);
        rabbitAdmin.declareExchange(directExchange);
        return directExchange;
    }

    @Bean
    public FanoutExchange fanoutExchange(){
        FanoutExchange fanoutExchange = new FanoutExchange(RabbitmqExchange.CONTRACT_FANOUT);
        rabbitAdmin.declareExchange(fanoutExchange);
        return fanoutExchange;
    }

}
