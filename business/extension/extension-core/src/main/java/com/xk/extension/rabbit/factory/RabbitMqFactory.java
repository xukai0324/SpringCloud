package com.xk.extension.rabbit.factory;

import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.boot.autoconfigure.amqp.RabbitProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * Created by Admin on 2018/1/5.
 */
@Configuration
public class RabbitMqFactory {

    @Autowired
    private RabbitProperties rabbitProperties;

    @Bean
    public ConnectionFactory connectionFactory(){
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(rabbitProperties.getHost());
        connectionFactory.setPort(rabbitProperties.getPort());
        connectionFactory.setUsername(rabbitProperties.getUsername());
        connectionFactory.setPassword(rabbitProperties.getPassword());
        connectionFactory.setVirtualHost(rabbitProperties.getVirtualHost());
        /**
         * 对于每一个RabbitTemplate只支持一个ReturnCallback。
         * 对于返回消息，模板的mandatory属性必须被设定为true，
         * 它同样要求CachingConnectionFactory的publisherReturns属性被设定为true。
         * 如果客户端通过调用setReturnCallback(ReturnCallback callback)注册了RabbitTemplate.ReturnCallback，那么返回将被发送到客户端。
         * 这个回调函数必须实现下列方法：
         *void returnedMessage(Message message, intreplyCode, String replyText,String exchange, String routingKey);
         */
        // connectionFactory.setPublisherReturns(true);
        /**
         * 同样一个RabbitTemplate只支持一个ConfirmCallback。
         * 对于发布确认，template要求CachingConnectionFactory的publisherConfirms属性设置为true。
         * 如果客户端通过setConfirmCallback(ConfirmCallback callback)注册了RabbitTemplate.ConfirmCallback，那么确认消息将被发送到客户端。
         * 这个回调函数必须实现以下方法：
         * void confirm(CorrelationData correlationData, booleanack);
         */
        connectionFactory.setPublisherConfirms(true);
        return connectionFactory;
    }

    /**
     * rabbitAdmin代理类
     * @param connectionFactory
     * @return
     */
    @Bean
    public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory){
        return new RabbitAdmin(connectionFactory);
    }

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public RabbitTemplate rabbitTemplate(){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
        return rabbitTemplate;
    }

}
