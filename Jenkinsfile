pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent'
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: jnlp
                image: jenkins/inbound-agent:latest
                args: ['\$(JENKINS_SECRET)', '\$(JENKINS_NAME)']
              - name: docker
                image: docker:20.10
                command:
                - cat
                tty: true
                volumeMounts:
                - name: docker-socket
                  mountPath: /var/run/docker.sock
              - name: node
                image: node:14
                command:
                - cat
                tty: true
                volumeMounts:
                - name: docker-socket
                  mountPath: /var/run/docker.sock
              volumes:
              - name: docker-socket
                hostPath:
                  path: /var/run/docker.sock
                  type: Socket
            """
        }
    }
    environment {
        GIT_CREDENTIALS_ID = 'github-token'
    }
    
    stages {
        stage('git clone') {
            steps {
                container('jnlp') {
                    git credentialsId: env.GIT_CREDENTIALS_ID, branch: 'main', url: 'https://github.com/minhooooo/kube-employment-frontend.git'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    script {
                        def customImage = docker.build("kube-employment-frontend:${env.BUILD_ID}")
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                container('docker') {
                    script {
                        docker.image("kube-employment-frontend:${env.BUILD_ID}").inside {
                            sh 'echo "Running tests..."'
                            sh 'echo "image build..."'
                        }
                    }
                }
                echo 'Testing..'
            }
        }
        
        stage('Execute') {
            steps {
                container('docker') {
                    script {
                        docker.image("kube-employment-frontend:${env.BUILD_ID}").inside {
                            sh 'echo "Executing application..."'
                            sh 'echo "testing tests..."'
                        }
                    }
                }
                echo 'executing..'
            }
        }
        
        stage('Test Push Docker Image') {
            steps {
                container('docker') {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS'),
                                         string(credentialsId: 'dockerhub-repo', variable: 'DOCKER_HUB_REPO')]) {
                            sh "echo ${DOCKERHUB_PASS} | docker login -u ${DOCKERHUB_USER} --password-stdin"
                            sh "docker pull hello-world:latest"
                            sh "docker tag hello-world:latest ${DOCKER_HUB_REPO}:${env.BUILD_ID}"
                            sh "docker push ${DOCKER_HUB_REPO}:${env.BUILD_ID}"
                            sh "docker tag hello-world:latest ${DOCKER_HUB_REPO}:latest"
                            sh "docker push ${DOCKER_HUB_REPO}:latest"
                        }
                    }
                }
            }
        }
    }
}
