pipeline{
    agent any
    stages{
        stage('Install dependencies'){
            steps{
                npm 'install'
            }
        }
        stage('Run init test') {
            steps{
                npm "test"
            }
        }
        stage('Run deploy') {
            steps{
                echo "Se realizo el deploy with codepipeline"
            }
        }
    }
}