node {
  app = 'node-cd'
  checkout scm
  stage 'Load files from GitHub'
  def gcloud, cd
  fileLoader.withGit('git@github.corp.ebay.com:N/infra.git',
    'master', '10727ea9-7a7b-4309-afd0-a22487fda3aa', '') {
    cd = fileLoader.load('pipeline/cd2')
  }

  cd.initCD(app)

  // Allows you to use $replicas in the deployment object template
  cd.setReplicasPerEnv([
    'dev': 1,
    'test': 2,
    'prod': 2
  ])

  cd.setEnvContext([
    'dev': ['propDemo': 'dev prop'],
    'test': ['propDemo': 'test prop'],
    'prod': ['propDemo': 'prod prop']
  ])

  cd.dockerBuildAndPush()
  cd.rolloutEnv('dev')

  // cd.waitForDeploy('dev', app, 3)
  // println "Dev deployment complete"

  // Use a low latency threshold to cause it to fail

  // latencyThreshold = 80
  // latencies = cd.measureLatency('dev', 'http://user-info-svc/facebook', [
  //   headers: [
  //     'X-EBAY-N-USER-ID': 'ff89ee16-cf3e-43d4-9f39-33b3fc741a8a'
  //   ]
  // ])

  // print latencies
  // latencies.each { l ->
  //   ninetieth = l.percentiles["90"]
  //   println "90th percentile in dev: ${ninetieth}"
  //   if (ninetieth > latencyThreshold)
  //     error "Deployment cancelled: 90th percentile latency of ${ninetieth} ms is greater than threshold $latencyThreshold"
  //   else
  //     println "90th percentile latency of ${ninetieth} ms was within $latencyThreshold threshold"
  // }

  cd.rolloutEnv('test')
  cd.rolloutEnv('prod')

}

