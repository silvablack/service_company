node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image service') {
        app = docker.build("silvablack/service_company")
    }

    stage('RUN image'){
        app.run()
    }

    stage('Lint Code'){
        app.inside{
            sh 'echo \"Lint Code\"'
            sh "npm run lint"
        }
    }
    stage('Test unit'){
        app.inside{
            sh 'echo \"Test Unit\"'
            sh 'npm run test-unit'
        }
    }
    
    stage('Login ECR') {
        sh("eval \$(aws ecr get-login --no-include-email | sed 's|https://||')")
    }

    stage('Send repository') {
        docker.withRegistry('666829565535.dkr.ecr.us-east-2.amazonaws.com/aws-ecr-api-company', 'ecr:us-east-1:ecr-credentials'){
            app.image().push('latest')
        }
    }

}
