### Makefile
.PHONY: help db-up dev-up down clean logs build

# Default target
help:
	@echo "Quiz Platform Infrastructure Commands:"
	@echo ""
	@echo "  🏗️  Setup & Management:"
	@echo "    db-up      - Start only databases (for single microservice dev)"
	@echo "    dev-up     - Start complete development ecosystem"
	@echo "    down       - Stop all services"
	@echo "    clean      - Stop services and remove volumes (⚠️  deletes data)"
	@echo ""
	@echo "  🔍 Monitoring & Debugging:"
	@echo "    logs       - Show logs for all services"
	@echo "    status     - Show status of all containers"
	@echo "    health     - Run health checks on databases"
	@echo ""
	@echo "  🛠️  Development:"
	@echo "    build      - Rebuild all services"
	@echo "    restart    - Restart all services"
	@echo ""
	@echo "  📋 Quick Access:"
	@echo "    mongo      - Open MongoDB shell"
	@echo "    neo4j      - Open Neo4j cypher shell"
	@echo "    redis      - Open Redis CLI"

# Database only (for single microservice development)
db-up:
	@echo "🗄️  Starting database layer..."
	docker-compose up -d mongodb neo4j redis
	@echo "✅ Databases started!"
	@echo "📊 Access URLs:"
	@echo "   MongoDB: mongodb://localhost:27017"
	@echo "   Neo4j Browser: http://localhost:7474"
	@echo "   Redis: redis://localhost:6379"

# Complete development ecosystem
dev-up:
	@echo "🚀 Starting complete development ecosystem..."
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	@echo "✅ All services started!"
	@make status

# Stop all services
down:
	@echo "🛑 Stopping all services..."
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
	@echo "✅ All services stopped!"

# Clean everything (removes volumes)
clean:
	@echo "🧹 Cleaning containers and volumes..."
	@echo "⚠️  This will delete all database data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	if [[ $REPLY =~ ^[Yy]$ ]]; then \
		docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v; \
		docker system prune -f; \
		echo "✅ Environment cleaned!"; \
	else \
		echo "❌ Operation cancelled."; \
	fi

# Show logs
logs:
	@echo "📋 Showing logs for all services..."
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Show container status
status:
	@echo "📊 Container Status:"
	docker-compose ps
	@echo ""
	@echo "🌐 Service URLs:"
	@echo "   MongoDB: mongodb://localhost:27017"
	@echo "   Neo4j Browser: http://localhost:7474 (neo4j/password123)"
	@echo "   Redis: redis://localhost:6379"

# Health checks
health:
	@echo "🏥 Running health checks..."
	@echo "MongoDB:" 
	@docker-compose exec -T mongodb mongosh --quiet --eval "db.adminCommand('ping').ok ? 'OK' : 'FAILED'"
	@echo "Neo4j:"
	@docker-compose exec -T neo4j cypher-shell -u neo4j -p password123 "RETURN 'OK'" 2>/dev/null | grep OK || echo "FAILED"
	@echo "Redis:"
	@docker-compose exec -T redis redis-cli ping

# Rebuild services
build:
	@echo "🔨 Rebuilding all services..."
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache

# Restart services
restart:
	@echo "🔄 Restarting all services..."
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml restart

# Quick database access
mongo:
	@echo "🍃 Opening MongoDB shell..."
	docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin quiz_platform

neo4j:
	@echo "🔗 Opening Neo4j cypher shell..."
	docker-compose exec neo4j cypher-shell -u neo4j -p password123

redis:
	@echo "🔴 Opening Redis CLI..."
	docker-compose exec redis redis-cli

# Development helpers
logs-mongo:
	docker-compose logs -f mongodb

logs-neo4j:
	docker-compose logs -f neo4j

logs-redis:
	docker-compose logs -f redis