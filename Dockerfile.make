.PHONY: build


build:
	@echo "Checking the ports..."
	@if lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null ; then \
		echo "Port 5432 is in use"; exit 1; \
	fi
	@if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null ; then \
		echo "Port 80 is in use"; exit 1; \
	fi
	@if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then \
		echo "Port 8080 is in use"; exit 1; \
	fi
	@if lsof -Pi :4200 -sTCP:LISTEN -t >/dev/null ; then \
		echo "Port 4200 is in use"; exit 1; \
	fi
	@if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then \
		echo "Port 8000 is in use"; exit 1; \
	fi
	@echo "Building Spring Boot application..."
	cd ./back-end && ./gradlew bootJar --no-daemon
	@echo "Building Docker image..."
	docker compose up