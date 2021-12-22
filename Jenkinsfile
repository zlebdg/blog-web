node("win10") {
  stage("Step 1 - checkout code") {
    var_of_git = checkout(scm)
  }
  stage('Step 2 - build') {
    powershell('''
      docker build -t local/blog-web .
    ''')
  }
  stage("Step 3 - deploy") {
    try {
      powershell('''
        docker rm -f blog-web
      ''')
    } catch (e) {

    }
    powershell('''
      docker run -itd --restart always -p 50001:5000 --name blog-web local/blog-web
    ''')
  }
}
