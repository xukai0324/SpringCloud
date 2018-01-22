package com.xk.extension.rabbit;

import com.xk.extension.rabbit.queue.RabbitmqQueue;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class ReceiverController {
    @RabbitListener(queues = RabbitmqQueue.CONTRACE_SELF)
    @RabbitHandler
    public void receiveContractQueue(String contract){
        System.out.println("receive "+ RabbitmqQueue.CONTRACE_SELF +" : [" + contract + "]");
    }

    @RabbitListener(queues = RabbitmqQueue.CONTRACE_TENANT)
    @RabbitHandler
    public void receiveTenantQueue(String contract){
        System.out.println("receive "+ RabbitmqQueue.CONTRACE_TENANT +" : [" + contract + "]");
    }
}
