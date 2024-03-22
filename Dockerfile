FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/barkdateconnect.jar barkdateconnect.jar
ENTRYPOINT ["java", "-jar", "barkdateconnect.jar"]