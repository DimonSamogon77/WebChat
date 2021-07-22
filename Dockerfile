FROM adoptopenjdk/openjdk8:ubi
ARG JAR_FILE=target/*.jar
ENV DATAUSERNAME=
ENV DATAPASSWORD=
ENV SECRET=
ENV ACCESS=
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Dspring.datasource.username=${DATAUSERNAME}","-Dspring.datasource.password=${DATAPASSWORD}","-Dstorage.access.key=${ACCESS}","-Dstorage.secret.key=${SECRET}","-Dserver.port=8085", "-jar", "/app.jar"]