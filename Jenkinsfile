//https://writingworld-9ba1f.web.app/
pipeline {
        agent any
        stages{
            stage('Build an Image'){
                steps{
                    sh 'docker build -t writing-world .'
                }
            }
            stage('Run container'){
                steps{
                    sh 'docker run -d --name writing-world writing-world'
                }
            }
            // stage('Clean docker image'){
            //     steps{
            //         sh 'docker stop writing-world && docker rm writing-world && docker rmi writing-world'
            //     }
            // }
        }
}
