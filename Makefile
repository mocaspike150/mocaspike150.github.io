up:
	docker-compose up
down:
	docker-compose down

pptx:
	node bin/story_images.js
	node bin/150stories.js

