package com.xk.extension.rabbit;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Admin on 2018/1/4.
 */
@Configuration
public class RabbitConfig {

    @Bean
    public Queue queue(){
        return new Queue("testword");
    }
}
