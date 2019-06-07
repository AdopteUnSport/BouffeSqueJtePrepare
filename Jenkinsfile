pipeline {
   agent any
  tools {nodejs "good node"}
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/AdopteUnSport/BouffeSqueJtePrepare'
      }
    }
        
    stage('Install dependencies : MASTER') {
      when { 
        branch 'master'
      }
      steps {
        sh 'npm install'
      }
    }
    stage('Install dependencies : DEV') {
      when { 
        branch 'develop'
      }
      steps {
        sh 'git checkout develop'
        sh 'git pull'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }    
    stage('Deliver') { 
            steps {
                sh './scripts/deploy' 
            }
    }
  }
}
