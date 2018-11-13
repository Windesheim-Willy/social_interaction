#!/bin/bash
set -e

source /opt/ros/$ROS_DISTRO/setup.bash
export ROS_PACKAGE_PATH="/src:$ROS_PACKAGE_PATH"

# Install all the dependencies of the social interaction.
npm install
npm run sass:build

# Install all the catkin dependencies.
#catkin_make

# Run the social interaction.
rosrun social_interaction start.sh
