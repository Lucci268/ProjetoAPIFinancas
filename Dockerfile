# Estágio de Build (Compila o código)
FROM maven:3.8.6-eclipse-temurin-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Estágio de Execução (Roda o app)
FROM eclipse-temurin:17-jdk-jammy
COPY --from=build /target/*.jar app.jar
# Definindo a porta que você escolheu
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]