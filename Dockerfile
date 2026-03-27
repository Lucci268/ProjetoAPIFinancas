# Estágio de Build
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Estágio de Execução
FROM openjdk:17-jdk-slim
COPY --from=build /target/*.jar app.jar
# Usando a porta 8081 que você escolheu
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]