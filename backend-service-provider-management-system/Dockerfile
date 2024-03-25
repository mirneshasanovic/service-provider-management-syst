FROM openjdk:19
WORKDIR /app
COPY target/b-service-provider-management-system.jar b-service-provider-management-system.jar
RUN mkdir -p /sql-scripts
COPY sql-scripts/init.sql /sql-scripts/
EXPOSE 8080
CMD ["java", "-jar", "b-service-provider-management-system.jar", "--init-db", "/sql-scripts/init.sql"]
