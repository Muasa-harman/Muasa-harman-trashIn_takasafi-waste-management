# Use an official Node.js base image
FROM node:20.11.1

# Set environment variables for Expo
ENV EXPO_DEVTOOLS_LISTEN_PORT 19002
ENV EXPO_DEVTOOLS_PORT 19001
ENV PATH /usr/local/bin:$PATH

# Install necessary packages
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    build-essential

# Install Expo CLI globally
RUN npm install -g expo-cli

# Set the working directory to the app's folder
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose ports used by Expo
EXPOSE 19000 19001 19002

# Start Expo
CMD ["expo", "start", "--tunnel"]



# # Step 1: Use an official Node.js runtime as a parent image
# FROM node:20.11.1

# # Step 2: Install Java (required for Android SDK)
# RUN apt-get update && \
#     apt-get install -y openjdk-17-jdk && \
#     apt-get clean

# # Step 3: Set up environment variables for Java and Android SDK
# ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
# ENV ANDROID_SDK_ROOT=/usr/local/android-sdk
# ENV PATH=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH
# ENV PATH=$ANDROID_SDK_ROOT/platform-tools:$PATH
# ENV PATH=$ANDROID_SDK_ROOT/emulator:$PATH

# # Step 4: Download Android SDK command line tools and install
# RUN mkdir -p $ANDROID_SDK_ROOT && \
#     wget -q "https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip" -O /tmp/tools.zip && \
#     unzip -q /tmp/tools.zip -d $ANDROID_SDK_ROOT/cmdline-tools && \
#     mv $ANDROID_SDK_ROOT/cmdline-tools/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest && \
#     yes | sdkmanager --licenses && \
#     sdkmanager --update

# # Step 5: Install Android SDK packages (for example, Android API 30)
# RUN sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3" "emulator"

# # Step 6: Install dependencies needed for React Native
# RUN apt-get install -y make gcc g++ python3

# # Step 7: Set the working directory in the container
# WORKDIR /trashIn

# # Step 8: Copy package.json and package-lock.json/yarn.lock
# COPY package*.json ./

# # Step 9: Install Node.js dependencies
# RUN npm install

# # Step 10: Copy the React Native project files into the container
# COPY . .

# # Step 11: Expose any port you want, depending on your use case (optional)
# EXPOSE 8081

# # Step 12: Command to start React Native (Android)
# CMD ["npm", "run", "android"]
