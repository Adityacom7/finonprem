# Create startup script
cat > start-services.sh << 'EOF'
#!/bin/bash

# Start Gateway Service (port 8080)
cd /home/ubuntu/backend/gateway-service
nohup java -jar target/gateway-service-1.0.0.jar > gateway.log 2>&1 &

# Start Auth Service (port 8081)
cd /home/ubuntu/backend/auth-service
nohup java -jar target/auth-service-1.0.0.jar > auth.log 2>&1 &

# Start Payment Service (port 8082)
cd /home/ubuntu/backend/payment-service
nohup java -jar target/payment-service-1.0.0.jar > payment.log 2>&1 &

# Start Token Service (port 8083)
cd /home/ubuntu/backend/token-service
nohup java -jar target/token-service-1.0.0.jar > token.log 2>&1 &

echo "All services starting..."
echo "Check logs: gateway.log, auth.log, payment.log, token.log"
EOF

# Make script executable
chmod +x start-services.sh