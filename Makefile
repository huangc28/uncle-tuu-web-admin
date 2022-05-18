CURRENT_DIR = $(shell pwd)

# Export variable in .app.env.
ifneq (,$(wildcard ./.env))
	include .env
	export
endif

# Pull latest from remote repository  
# Build production bundle 
# Restart pm2  
deploy: 
	ssh -t root@staging-api.darkpanda.love 'cd ~/darkpanda/darkpanda-spa && \
		git pull https://$(GITHUB_USER):$(GITHUB_ACCESS_TOKEN)@github.com/huangc28/darkpanda-spa.git && \
		npm install && \
		npm start' 

.PHONY: deploy