FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY backend /app
RUN mvn clean package -DskipTests

FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/furniture-backend-0.0.1-SNAPSHOT.jar furniture-backend-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/furniture-backend-0.0.1-SNAPSHOT.jar"]
