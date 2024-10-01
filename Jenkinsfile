pipeline{
    agent{
        node {
            label 'jenkins label'
        }
    }
    triggers {
        pollSCM '*****'
    }
    stages {
        stage('Clone'){
            steps {
                git branch: 'master'
                url: 'https://github.com/muasa=harman/.git'
                }
        }
        stage('Build...'){
            steps{echo 'Testing...'
                sh '''echo "doing test..." '''

            }
        }
        stage('Package'){
                steps{echo 'packages...' 
                sh '''echo "doing package ...."'''
            }
        }
        stage('Deploy'){
                steps{echo 'Deliver...' 
                sh '''echo "deploying..."'''
            }
        }
}}