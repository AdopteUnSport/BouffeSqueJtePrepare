pipeline {
   agent any
  
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
