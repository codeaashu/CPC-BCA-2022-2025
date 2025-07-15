# Use OpenJDK image
FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the source file into the container
COPY HelloWorld.java .

# Compile the Java program
RUN javac HelloWorld.java

# Run the compiled Java program
CMD ["java", "HelloWorld"]