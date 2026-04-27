pipeline {
    agent { label 'linux-agent-1' }
    
    parameters {
        choice(name: 'ENV', choices: ['dev', 'qa', 'prod'], description: 'Environment')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser')
        string(name: 'TAGS', defaultValue: '@smoke', description: 'Test tags')
        booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run headless')
    }

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
                        npm ci
                        npx playwright install
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
