pipeline {
    agent any

    environment {
        CLIENT_IMAGE = 'aryan9626/bmi-app-repo:client-latest'
        SERVER_IMAGE = 'aryan9626/bmi-app-repo:server-latest'
        GIT_BRANCH = 'main'
        GIT_CREDENTIALS_ID = '75a960a6-e356-41ca-9da2-2290a8a63106'
        DOCKER_CREDENTIALS_ID = '25a17427-796d-420c-bb6c-77bacfc2a2ea'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${env.GIT_BRANCH}", 
                    credentialsId: "${env.GIT_CREDENTIALS_ID}", 
                    url: 'https://github.com/Aryan9626/dummy-repo-2.git'
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
                        docker.withRegistry('https://registry.hub.docker.com', "${env.DOCKER_CREDENTIALS_ID}") {
                            sh "docker push ${CLIENT_IMAGE}"
                        }
                    }
                }
                dir('server') {
                    script {
                        sh "docker build -t ${SERVER_IMAGE} ."
                        docker.withRegistry('https://registry.hub.docker.com', "${env.DOCKER_CREDENTIALS_ID}") {
                            sh "docker push ${SERVER_IMAGE}"
                        }
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    sh "docker run -d --name container1 ${CLIENT_IMAGE}"
                    sh "docker run -d --name container2 ${SERVER_IMAGE}"
                    sh "docker run -d --name container3 ${SERVER_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
