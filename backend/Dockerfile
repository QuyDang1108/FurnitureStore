# Build stage
FROM maven:3.8.7-openjdk-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=0.0.1-SNAPSHOT

WORKDIR /app
COPY --from=build /build/target/furniture-backend-${APP_VERSION}.jar /app/

EXPOSE 8888
ENV PORT_DB=3306
ENV NAME_DB=furniture-store
ENV DB_URL=jdbc:mysql://mysql-furniture-store:${PORT_DB}/${NAME_DB}
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} furniture-backend-${APP_VERSION}.jar
