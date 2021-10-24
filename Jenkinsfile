pipeline {
    agent any
    stages{
        stage('Install dependencies') {
            steps{
                test "install"
            }
        }
        stage('Run unit test') {
            steps{
                test "test"
                echo "testing"
            }
        }
        stage('Run deploy') {
            steps{
                echo "Se realizo el deploy with codepipeline"
            }
        }
    }
}