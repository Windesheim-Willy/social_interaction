#!/bin/bash

ROS_VERSION="kinetic"

# Install nodeJS.
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get update

apt-get install -y \
  curl \
  ros-$ROS_VERSION-catkin \
  python-catkin-tools \
  nodejs

npm install nodemon -g

# Install the social interaction as ROS package.
source /opt/ros/$ROS_VERSION/setup.bash \
 && src \
 && catkin_make
