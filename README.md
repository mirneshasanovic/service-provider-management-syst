## Service Provider Management System

### How to Run the App

### Note
Before running the application, make sure Docker and Maven are installed on your system. Adjust the port numbers and database configurations as needed.

To run this application, follow these steps:

**```Run the database```**

1. **Pull the MySQL Docker image:**
   ```bash
   docker pull mysql
   ```

2. **Run the MySQL container:**
   ```bash
   docker run -p 3307:3306 --name mysqlcontainer -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=service_provider_management_system -d mysql
   ```

3. **Create a Docker network:**
   ```bash
   docker network create mysqlnetwork
   ```

4. **Connect the MySQL container to the network:**
   ```bash
   docker network connect mysqlnetwork mysqlcontainer
   ```

**```Run backend```**

Navigate to the backend-service-provider-management-system folder and in IntelliJ IDE:

1. **Generate the JAR file by running `mvn install`. Alternatively, you can accomplish this easily using IntelliJ IDE.**
   ```bash
   mvn install
   ```

2. **Build the backend Docker image:**
   ```bash
   docker build -t b-service-provider-management-system .
   ```

3. **Run the backend container:**
   ```bash
   docker run -p 8080:8080 --name b-service-provider-management-system --net mysqlnetwork -e MYSQL_HOST=mysqlcontainer -e MYSQL_PORT=3306 -e MYSQL_DB_NAME=service_provider_management_system -e MYSQL_USER=root -e MYSQL_PASSWORD=root b-service-provider-management-system
   ```

**```Run frontend```**

Navigate to the frontend-service-provider-management-system folder and in IntelliJ IDE:

1. **Build the frontend Docker image:**
   ```bash
   docker build -t f-service-provider-management-system .
   ```

2. **Run the frontend container:**
   ```bash
   docker run -p 4200:4200 f-service-provider-management-system
   ```
