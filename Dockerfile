FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/barkdateConnect.jar barkdateConnect.jar
ENTRYPOINT ["java", "-jar", "barkdateConnect.jar"]