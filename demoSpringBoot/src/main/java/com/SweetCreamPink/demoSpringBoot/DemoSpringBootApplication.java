package com.SweetCreamPink.demoSpringBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // Configura automáticamente el proyecto y escanea los componentes
public class DemoSpringBootApplication {

	public static void main(String[] args) {
		// Inicia la aplicación Spring Boot y el servidor embebido (Tomcat)
		SpringApplication.run(DemoSpringBootApplication.class, args);
	}

}