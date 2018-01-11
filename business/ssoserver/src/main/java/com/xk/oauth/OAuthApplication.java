package com.xk.oauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;

/**
 * Created by Admin on 2018/1/11.
 */
@SpringBootApplication
@EnableAuthorizationServer
public class OAuthApplication {
    public static void main(String[] args) {
        SpringApplication.run(OAuthApplication.class,args);
    }
}
