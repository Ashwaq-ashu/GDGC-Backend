# GDGC Backend Deployment Guide

This guide explains how to deploy the GDGC Backend application on a Virtual Machine (VM) using Docker.



## Prerequisites


- A VM with Ubuntu 20.04+ or similar Linux distribution
- Docker and Docker Compose installed
- Git installed
- Basic knowledge of Linux commands

## VM Setup

### 1. Update the System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to the docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and log back in for group changes to take effect
```

### 3. Install Git

```bash
sudo apt install git -y
```

## Application Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/GDSC-MJCET/GDGC-Backend.git
cd GDGC-Backend
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit the environment file if needed
nano .env
```

The default configuration should work for most setups. The `.env` file contains:

```env
DATABASE_URL="postgresql://gdgc_user:gdgc_password@postgres:5432/gdgc_db?schema=public"
PORT=3000
NODE_ENV=production
```

### 3. Deploy with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check if services are running
docker-compose ps
```

### 4. Verify Deployment

```bash
# Check if the application is responding
curl http://localhost:3000

# Expected response:
# {"message":"Hello world"}
```

## Alternative: Manual Docker Deployment

If you prefer to run the database and application separately:

### 1. Start PostgreSQL Database

```bash
docker run -d \
  --name gdgc-postgres \
  -e POSTGRES_DB=gdgc_db \
  -e POSTGRES_USER=gdgc_user \
  -e POSTGRES_PASSWORD=gdgc_password \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15-alpine
```

### 2. Build and Run the Application

```bash
# Build the Docker image
docker build -t gdgc-backend .

# Run the application
docker run -d \
  --name gdgc-backend \
  --link gdgc-postgres:postgres \
  -e DATABASE_URL="postgresql://gdgc_user:gdgc_password@postgres:5432/gdgc_db?schema=public" \
  -p 3000:3000 \
  gdgc-backend
```

## Production Considerations

### 1. Security

- Change default database credentials
- Use environment variables for sensitive data
- Consider using Docker secrets for production
- Set up a reverse proxy (nginx) for SSL termination

### 2. Monitoring

```bash
# View application logs
docker-compose logs -f backend

# Monitor resource usage
docker stats

# Check container health
docker-compose ps
```

### 3. Backup

```bash
# Backup database
docker exec gdgc-postgres pg_dump -U gdgc_user gdgc_db > backup.sql

# Restore database
docker exec -i gdgc-postgres psql -U gdgc_user gdgc_db < backup.sql
```

### 4. Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart services
docker-compose down
docker-compose up -d --build
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using port 3000
   sudo netstat -tulpn | grep :3000
   
   # Kill the process or change the port in docker-compose.yml
   ```

2. **Database connection issues**
   ```bash
   # Check if PostgreSQL is running
   docker-compose logs postgres
   
   # Test database connection
   docker exec -it gdgc-postgres psql -U gdgc_user -d gdgc_db
   ```

3. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs postgres

# Access container shell
docker exec -it gdgc-backend sh
docker exec -it gdgc-postgres psql -U gdgc_user -d gdgc_db
```

## API Endpoints

Once deployed, the following endpoints will be available:

- `GET /` - Health check
- `GET /applications` - Get all applications
- `POST /application` - Create new application

Example usage:

```bash
# Health check
curl http://your-vm-ip:3000

# Get applications
curl http://your-vm-ip:3000/applications

# Create application
curl -X POST http://your-vm-ip:3000/application \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "rollNo": "12345",
    "phoneNo": "1234567890",
    "branch": "Computer Science",
    "year": "3rd",
    "resume": "resume.pdf",
    "email": "john@example.com",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "previousWork": "Some previous work experience",
    "selectedPortfolios": ["portfolio1", "portfolio2"],
    "portfolio1": "https://portfolio1.com",
    "portfolio2": "https://portfolio2.com"
  }'
```

## Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Support

For issues and questions, please check the logs first and then create an issue in the GitHub repository.
