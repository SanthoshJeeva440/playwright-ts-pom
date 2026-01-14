pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.51.1-jammy'
            args '--platform=linux/arm64'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npx playwright --version'
            }
        }
    }
}
