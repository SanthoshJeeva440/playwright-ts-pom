pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                withChecks(name: 'Install Dependencies', includeStage: true) {
                    sh '''
                        node -v
                    '''
                }
            }
        }

        stage('Run Test') {
            steps {
                withChecks(name: 'Robot Tests', includeStage: true) {
                    sh '''
                        npm -v
                    '''
                }
            }
        }
    }

    post {
        success {
            publishChecks(
                name: 'Pipeline',
                title: 'Pipeline Success',
                summary: 'All stages passed successfully'
            )
        }

        failure {
            publishChecks(
                name: 'Pipeline',
                conclusion: 'FAILURE',
                title: 'Pipeline Failed',
                summary: 'One or more stages failed'
            )
        }

        always {
            deleteDir()
        }
    }
}