#!/bin/bash
cd src

npm install
npm run sass:build
rosrun social_interaction start.sh
