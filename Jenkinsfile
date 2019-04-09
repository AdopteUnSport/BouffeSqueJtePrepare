pipeline {
  agent any
    
  tools {nodejs "good node"}
    
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
    stage('launch') {
      steps {
         sh 'npm run dev'
      }
    }   
  }
}