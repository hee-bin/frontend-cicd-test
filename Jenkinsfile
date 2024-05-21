pipeline {
    agent any

    environment {
        // 환경 변수 설정
        DOCKERHUB_CREDENTIALS_ID = 'dockerHub-token'
        DOCKERHUB_USERNAME = 'heebin00'
        IMAGE_TAG = '0.1' // yml파일과 버전 맞추기
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub 저장소에서 소스 코드 체크아웃
                git branch: 'main', url: 'https://github.com/hee-bin/frontend-cicd-test.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    // Docker Hub에 로그인
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                        sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                    }
                    // Docker 이미지 빌드 및 푸시
                    sh 'docker build -t $DOCKERHUB_USERNAME/client:$IMAGE_TAG ./'
                    sh 'docker push $DOCKERHUB_USERNAME/client:$IMAGE_TAG'
                }
            }
        }
    }

    post {
        always {
            echo '이 작업은 실행 결과에 상관없이 항상 실행됩니다.'
        }
        success {
            echo '이 작업은 빌드가 성공하면 실행됩니다.'
            slackSend(channel: '#deploy-noti', message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            echo '이 작업은 빌드가 실패하면 실행됩니다.'
            slackSend(channel: '#deploy-noti', message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}
