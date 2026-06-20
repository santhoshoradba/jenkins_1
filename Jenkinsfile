pipeline {
    agent any

    environment {
        S3_BUCKET = 'sunsantho'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Static site — no build step required.'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh """
                    aws s3 sync . s3://${S3_BUCKET}/ \
                        --delete \
                        --exclude ".git/*" \
                        --exclude "Jenkinsfile" \
                        --exclude "*.md"
                """
            }
        }

        stage('Invalidate CloudFront (optional)') {
            when {
                expression { return fileExists('cloudfront-distribution-id.txt') }
            }
            steps {
                script {
                    def distId = readFile('cloudfront-distribution-id.txt').trim()
                    sh "aws cloudfront create-invalidation --distribution-id ${distId} --paths '/*'"
                }
            }
        }
    }

    post {
        success {
            echo "Deployment to S3 succeeded!"
        }
        failure {
            echo "Deployment to S3 failed."
        }
    }
}
