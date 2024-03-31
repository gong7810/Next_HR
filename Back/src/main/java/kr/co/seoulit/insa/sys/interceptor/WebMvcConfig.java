package kr.co.seoulit.insa.sys.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggerInterceptor())
                .excludePathPatterns("/hr/login/login");
    }

    @Bean
    public LoggerInterceptor loggerInterceptor() {
        LoggerInterceptor logger =  new LoggerInterceptor();
        return logger;

    }
}
