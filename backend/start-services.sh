#!/bin/bash

echo "=========================================="
echo "🚀 PAYPLUS PRODUCTION STARTUP"
echo "=========================================="

# Stop any running services
echo "🛑 Stopping existing services..."
pkill -f java
sleep 5

# Kill any stubborn processes
pkill -9 -f java 2>/dev/null

# Clear old logs
echo "🧹 Cleaning up logs..."
rm -f *.log

# Start Backend Services
echo "🔧 Starting backend services..."

echo "1. Starting Auth Service (Port 8081)..."
cd auth-service
java -jar target/auth-service-1.0.0.jar > ../auth.log 2>&1 &
AUTH_PID=$!
cd ..

echo "2. Starting Payment Service (Port 8082)..."
cd payment-service
java -jar target/payment-service-1.0.0.jar > ../payment.log 2>&1 &
PAYMENT_PID=$!
cd ..

echo "3. Starting Token Service (Port 8083)..."
cd token-service
java -jar target/token-service-1.0.0.jar > ../token.log 2>&1 &
TOKEN_PID=$!
cd ..

# Wait for backend services to initialize
echo "⏳ Waiting for backend services to start (20 seconds)..."
sleep 20

# Start Gateway Service
echo "4. Starting Gateway Service (Port 8080)..."
cd gateway-service
java -jar target/gateway-service-1.0.0.jar > ../gateway.log 2>&1 &
GATEWAY_PID=$!
cd ..

# Final wait
echo "⏳ Final initialization (15 seconds)..."
sleep 15

# Display Results
echo ""
echo "=========================================="
echo "✅ STARTUP COMPLETE"
echo "=========================================="

# Check running processes
echo "📊 RUNNING SERVICES:"
ps aux | grep java | grep -v grep | while read line; do
    echo "   📍 $line" | awk '{print $12, $13}'
done

echo ""
echo "🔍 QUICK HEALTH CHECK:"

# Test Gateway
echo "🌐 Gateway Health:"
curl -s http://localhost:8080/actuator/health || echo "   ❌ Gateway not responding"

# Test Auth Service
echo "🔐 Auth Service:"
curl -s -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"password"}' | grep -o '"success":[^,]*' || echo "   ❌ Auth service not responding"

# Test Payment Service
echo "💰 Payment Service:"
curl -s http://localhost:8080/api/payment/history | head -2 || echo "   ❌ Payment service not responding"

echo ""
echo "📁 LOG FILES:"
ls -la *.log

echo ""
echo "🎯 QUICK COMMANDS:"
echo "   View Gateway: tail -f gateway.log"
echo "   View All: tail -f *.log" 
echo "   Stop All: pkill -f java"
echo "   Status: ps aux | grep java"
echo ""
echo "🌐 API GATEWAY: http://localhost:8080"
echo "=========================================="