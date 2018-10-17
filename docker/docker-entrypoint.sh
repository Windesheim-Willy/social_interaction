#!/bin/bash
set -e

npm install
npm run sass:build
npm start
