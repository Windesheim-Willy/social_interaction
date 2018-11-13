cmake_minimum_required(VERSION 2.8.3)
project(social_interaction)

find_package(catkin REQUIRED)

###################################
## catkin specific configuration ##
###################################
catkin_package()

#############
## Install ##
#############

install(PROGRAMS
   app.js
   DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)