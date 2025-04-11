pipeline {
    agent any

    environment {
        IMAGE = "pavansaikumar49221/meal-ordering"
    }

    stages {
        stage('Checkout') {
            steps {
                //git 'https://github.com/Mpskumar123/meal-ordering'
                //sh 'echo pass'
                echo 'Checked out source code'
                
            }
        }

        stage('Build App') {
            steps {
                sh ''' 
                cd meal-ordering
                 npm install
                 npm run build
                 '''
                
            }
        }

        stage('SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv('MySonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=meal-ordering -Dsonar.sources=src'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image $IMAGE'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $IMAGE'
                }
            }
        }

        stage('Slack Notification') {
            steps {
                slackSend(channel: '#devops', message: "✅ Docker image for *meal-ordering* pushed to DockerHub. ArgoCD will deploy to EKS 🚀")
            }
        }
    }
}
