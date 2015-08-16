(function() {

  var s = document.createElement('script'),
    githubApiUrl = 'https://api.github.com/repos/',
    owner = '<%= jekyllConfig.github_username %>',
    repo = owner + '.github.io';

  s.type = 'text/javascript';
  s.async = true;
  s.src = githubApiUrl + owner + '/' + repo + '?callback=' + owner + '.getGitHubRepoInfo';

  window[ owner ] = window[ owner ] || {};
  window[ owner ].getGitHubRepoInfo = function( response ) {

    var stargazers = response.data.stargazers_count,
      forks = response.data.forks_count;

    document.getElementById('stargazers').innerText = stargazers;
    document.getElementById('forks').innerText = forks;
    document.getElementById('github-repo-info').style.display = 'block';
  };

  document.getElementsByTagName('HEAD')[ 0 ].appendChild( s );
}());
