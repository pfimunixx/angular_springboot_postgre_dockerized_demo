FROM docker.imunixx.de/openjdk:11-jdk-slim
ARG JAR_FILE=./build/libs/back-end-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENV SPRING_PROFILES_ACTIVE=prod
ENTRYPOINT ["java","-jar","/app.jar"]