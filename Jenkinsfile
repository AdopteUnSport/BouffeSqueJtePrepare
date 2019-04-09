pipeline {
   agent {
        docker {
            image 'node:6-alpine' 
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
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './scripts/kill.sh' 
            }
    }
  }
}