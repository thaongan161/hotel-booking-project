@echo off
title Hotel Booking System - Full Stack

REM run backend
start cmd /k "cd backend && mvn spring-boot:run"

REM run frontend
start cmd /k "cd frontend && npm run dev"
