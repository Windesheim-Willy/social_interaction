#!/bin/bash
cd src

source /opt/ros/kinetic/setup.bash
export ROS_PACKAGE_PATH="$(pwd)/../:$ROS_PACKAGE_PATH"

sudo npm install
sudo npm run sass:build
rosrun social_interaction start.sh
