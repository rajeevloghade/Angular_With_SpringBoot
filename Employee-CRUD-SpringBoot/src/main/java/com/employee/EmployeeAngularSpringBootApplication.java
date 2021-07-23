package com.employee;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;

@ComponentScans({ @ComponentScan("com.employee"), @ComponentScan("com.employee.rest"),
		@ComponentScan("com.employee.service"), @ComponentScan("com.employee.dao"),
		@ComponentScan("com.employee.model") })
@SpringBootApplication
public class EmployeeAngularSpringBootApplication {

	static Logger log = LoggerFactory.getLogger(EmployeeAngularSpringBootApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EmployeeAngularSpringBootApplication.class, args);
		log.info("SpringBoot Application Started...!!!");
	}

}
