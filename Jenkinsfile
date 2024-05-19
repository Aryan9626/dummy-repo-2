pipeline {
    agent any

    environment {
        CLIENT_IMAGE = 'aryan9626/client-image'
        SERVER_IMAGE = 'aryan9626/server-image'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: '75a960a6-e356-41ca-9da2-2290a8a63106', url: 'https://github.com/Aryan9626/dummy-repo-2.git'
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    script {
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
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('client') {
                    script {
                        sh "docker build -t ${CLIENT_IMAGE} ."
                        sh "docker push ${CLIENT_IMAGE}"
                    }
                }
                dir('server') {
                    script {
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
}