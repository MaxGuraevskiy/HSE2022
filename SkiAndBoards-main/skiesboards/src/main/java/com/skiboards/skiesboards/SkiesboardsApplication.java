package com.skiboards.skiesboards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class SkiesboardsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkiesboardsApplication.class, args);
	}

}
