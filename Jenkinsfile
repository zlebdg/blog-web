node("win10") {
    stage("Step 1 - checkout code") {
        var_of_git = checkout(scm)
    }
    stage("Step 2 - npm build") {
        powershell('''
            npm i
            npm run build
        ''')
    }
    stage('Step 3 - docker build') {
        powershell('''
            docker build -t local/blog-web .
        ''')
    }
    stage("Step 4 - deploy") {
        powershell('''
            docker rm -f blog-web
            docker run -itd --restart always -p 50002:8080 --name blog-web local/blog-web
        ''')
    }
}
