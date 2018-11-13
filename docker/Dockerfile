FROM ros:kinetic
SHELL ["/bin/bash", "-c"]

# Install nodeJS.
RUN apt-get update && apt-get install -y \
      curl \
      ros-$ROS_DISTRO-catkin \
      python-catkin-tools \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get update && apt-get install -y \
      nodejs

RUN npm install nodemon -g

# Install the social interaction as ROS package.
COPY . /src
RUN source /opt/ros/$ROS_DISTRO/setup.bash \
 && cd /src \
 && catkin_make

WORKDIR /src/src

COPY ./docker/docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 3000
