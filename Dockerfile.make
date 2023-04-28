.PHONY: build

build:
	@echo "Building Spring Boot application..."
	cd ./back-end && ./gradlew bootJar --no-daemon
	@echo "Building Docker image..."
	docker compose up