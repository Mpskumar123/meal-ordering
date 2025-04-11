pipeline {
    agent any

    environment {
        IMAGE = "pavansaikumar49221/meal-ordering:${BUILD_NUMBER}"
        GIT_REPO_NAME = "meal-ordering"
        GIT_USER_NAME = "Mpskumar123"
    }

    stages {
        
        stage('Build App') {
            steps {
                script {
                    bat '''
                    
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('SonarQube Code Analysis') {
            steps {
                 withSonarQubeEnv('MySonarQube') {
        bat "${tool 'MySonarQube'}/bin/sonar-scanner -Dsonar.projectKey=meal-ordering -Dsonar.sources=src -Dsonar.login=squ_8791863d8fa62fb8acddbe06cf14fdd647e1f8dc -X"
    }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t $IMAGE .'
            }
        }

        stage('Trivy Scan') {
            steps {
                bat 'trivy image $IMAGE'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE
                    '''
                }
            }
        }

        stage('Update Deployment File and Push') {
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    bat '''
                        git config --global user.email "pavansaikumar49@gmail.com"
                        git config --global user.name "Mpskumar123"

                        sed -i "s|replaceImageTag|${BUILD_NUMBER}|g" k8s/deployment.yaml
                        git add k8s/deployment.yaml

                        if ! git diff --cached --quiet; then
                            git commit -m "Update image to ${BUILD_NUMBER}"
                            git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                        else
                            echo "No changes to commit."
                        fi
                    '''
                }
            }
        }

        stage('Slack Notification') {
            steps {
                slackSend(channel: '#devops', message: "✅ Docker image *${IMAGE}* pushed & manifest updated. ArgoCD will sync it. 🚀")
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            slackSend(channel: '#devops', message: "🎉 Build and deployment pipeline for *meal-ordering* succeeded.")
        }
        failure {
            slackSend(channel: '#devops', message: "❌ Pipeline for *meal-ordering* failed. Check Jenkins logs.")
        }
    }
}
