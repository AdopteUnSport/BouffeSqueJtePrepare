pipeline {
   agent {
        docker {
            image 'node:11-alpine' 
            args '-p 3000:3000' 
        }
  }  
  
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/AdopteUnSport/BouffeSqueJtePrepare'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'node --version'
      }
    }    
    stage('Deliver') { 
            steps {
                sh './scripts/deliver.sh' 
                sh './scripts/kill.sh' 
            }
    }
  }
}