pipeline {
    agent { label 'linux-agent-1' }

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
                        npm i --no-audit
                        npx playwright install --with-deps
                    '''
                }
            }
        }

        stage('Run Test') {
            steps {
                withChecks(name: 'Robot Tests', includeStage: true) {
                    sh '''
                        npx playwright --version
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
