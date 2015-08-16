// Disqus count
(function() {

  var disqus_shortname = '<%= jekyllConfig.disqus_username %>',
    s = document.createElement('script');

  s.type = 'text/javascript';
  s.async = true;
  s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';

  ( document.getElementsByTagName('HEAD')[ 0 ] || document.getElementsByTagName('BODY')[ 0 ] ).appendChild( s );
}());

// Disqus recent comments
(function() {

  var s = document.createElement('script'),
    owner = '<%= jekyllConfig.github_username %>',
    disqusApiUrl = 'https://disqus.com/api/3.0/forums/listPosts.jsonp?forum=',
    forum = '<%= jekyllConfig.disqus_username %>',
    apiKey = '<%= jekyllConfig.disqus_api_key %>';

  s.type = 'text/javascript';
  s.async = true;
  s.src = disqusApiUrl + forum + '&related=thread&api_key=' + apiKey + '&callback=' + owner + '.getRecentComments';

  window[ owner ] = window[ owner ] || {};
  window[ owner ].getRecentComments = function( data ) {

    if ( !isThereComment() ) {
      return;
    }

    var ulTag = document.createElement('ul'),
      liTag,
      aTag,
      spanTag,
      i = 0,
      numOfComments = data.response.length,
      recentCommentsToDisplay = '<%= jekyllConfig.disqus_recent_comments_to_display %>',
      authorName,
      threadTitle,
      threadLink;

    for ( ; i < numOfComments && i < recentCommentsToDisplay; i++ ) {

      authorName = data.response[ i ].author.name;
      threadTitle = data.response[ i ].thread.title;
      threadLink = data.response[ i ].url;

      aTag = document.createElement('a');
      aTag.setAttribute( 'href', threadLink );
      aTag.innerText = threadTitle;
      spanTag = document.createElement('span');
      spanTag.innerText = authorName + ' on ';
      spanTag.className = 'disqus-author';

      liTag = document.createElement('li');
      liTag.appendChild( spanTag );
      liTag.appendChild( aTag );
      ulTag.appendChild( liTag );
    }

    document.getElementById('recent-comments-section').appendChild( ulTag );
    document.getElementById('recent-comments-section').style.display = 'block';

    //////////

    function isThereComment() {
      return !!data.response.length;
    }
  };

  document.getElementsByTagName('HEAD')[ 0 ].appendChild( s );
}());
