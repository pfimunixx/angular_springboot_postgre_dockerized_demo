.PHONY: all build-images tag-images push-images

all: build-images tag-images push-images

build-images:
	@echo "Building Spring Boot application..."
	cd ./back-end && ./gradlew bootJar --no-daemon
	@echo "Building the images..."
	docker build -t back-end-image ./back-end
	docker build -t front-end-image ./front-end

tag-images:
	@echo "Tagging the images..."
	docker tag back-end-image docker.imunixx.de/back-end-image
	docker tag front-end-image docker.imunixx.de/front-end-image

push-images:
	@echo "Pushing the images..."
	docker push docker.imunixx.de/back-end-image
	docker push docker.imunixx.de/front-end-image