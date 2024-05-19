pipeline {
    agent any

    environment {
        // Define environment variables
        CLIENT_IMAGE = 'aryan9626/client-image'
        SERVER_IMAGE = 'aryan9626/server-image'
        GIT_BRANCH = 'main'  // Specify your branch here if it's 'main' instead of 'master'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout from a specific branch
                git branch: "${env.GIT_BRANCH}", 
                    credentialsId: '75a960a6-e356-41ca-9da2-2290a8a63106', 
                    url: 'https://github.com/Aryan9626/dummy-repo-2.git'
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    script {
                        // Install dependencies and build the client
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build Server') {
            steps {
                dir('server') {
                    script {
                        // Install server dependencies
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('client') {
                    script {
                        // Build and push the client Docker image
                        sh "docker build -t ${CLIENT_IMAGE} ."
                        sh "docker push ${CLIENT_IMAGE}"
                    }
                }
                dir('server') {
                    script {
                        // Build and push the server Docker image
                        sh "docker build -t ${SERVER_IMAGE} ."
                        sh "docker push ${SERVER_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    // Run Docker containers
                    sh "docker run -d --name container1 ${CLIENT_IMAGE}"
                    sh "docker run -d --name container2 ${SERVER_IMAGE}"
                    sh "docker run -d --name container3 ${SERVER_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after the pipeline runs to keep it clean for the next execution
            cleanWs()
        }
        success {
            // Actions to take on successful build
            echo 'Pipeline succeeded!'
        }
        failure {
            // Actions to take if the pipeline fails
            echo 'Pipeline failed!'
        }
    }
}
