package com.ssafy.trip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ssafy"})
public class Enjoytrip03Application {

	public static void main(String[] args) {
		SpringApplication.run(Enjoytrip03Application.class, args);
	}

}
