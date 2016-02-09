---
layout: post
title:  "Own a maven repository, like a boss! – Part 1"
description: Learn to host your artifacts in your own private repository!
permalink: /own-a-maven-repository-like-a-boss–part-1
date: 2015-08-03 14:46:14 +0530
author: "Nishant"
---

Have you ever thought how the central repository works like Maven Central or JCenter?
Is it possible to own one for yourself?
Do you want to host your artifacts in your own private repository?

If your answer is **YES**, well you are in the right place. I am going to walk you through basic steps involved in setting up your own maven repository where you can publish your artifacts, using all but your terminal, git and a public remote repository hosting service of your choice ( i.e Github or Bitbucket ).

**For those of you who want to jump into the code right away , here is the gist**

<script src="https://gist.github.com/nisrulz/efb1654eaeb8930591c6.js"></script>

**For the rest of you who want a complete explanation, lets dive in**..

###Terms
Before we start, I want you to get acquainted with some of the terms:

**Artifacts** : An artifact is a file, usually a JAR, that gets deployed to a Maven repository. A Maven build produces one or more artifacts, such as a compiled JAR and a “sources” JAR. Each artifact has a group ID (usually a reversed domain name, like com.example.foo), an artifact ID (just a name), and a version string. The three together uniquely identify the artifact. A project’s dependencies are specified as artifacts.

**Maven** : A tool that can be used for building and managing any Java-based project.([more info](https://maven.apache.org/what-is-maven.html))

> I would like to mention that having your artifacts in the Maven Central and JCenter has a plethora of advantages which you will never be able to get when using the below method.
> Lets just say its just another method to host and publish your artifacts without having to go through the process of publishing it to central repository.

Prerequisites

1. git ([Install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))

2. maven ([Install guide](https://maven.apache.org/install.html))

3. [Bitbucket](https://bitbucket.org/) or [Github](https://github.com/) account

4. JAR/AAR/WAR file to be published to your maven repository

….Okay…if you made it till this point, everything is going to be a piece of cake from here onwards :P promise :)

##Steps
**Step 1** : Fire up your terminal/command prompt
**Step 2** : Create a directory where you will sync your maven artifacts to, lets say its called mavenrepo
{% highlight bash %}

mkdir mavenrepo

{% endhighlight %}

and change into the mavenrepo directory
{% highlight bash %}

cd mavenrepo

{% endhighlight %}

**Step 3** : Once inside the directory, initialise it with git
{% highlight bash %}

git init

{% endhighlight %}


**Step 4** : Create a repository named **mavenrepo (git remote)** at Github/Bitbucket and add it to your **mavenrepo (git local)** directory as a remote repository named **origin** ( here i am adding a github repo)
{% highlight bash %}

git remote add origin https://github.com/<username>/mavenrepo.git

{% endhighlight %}

Note : you can get the url from Github under the settings tab when at your repository page

[![Copy Github URL](/assets/images/posts/2015-08-03-own-a-maven-repository-like-a-boss–part-1/copygithuburl.png "Copy Github URL")](/assets/images/posts/2015-08-03-own-a-maven-repository-like-a-boss–part-1/copygithuburl.png)


**Step 5** :  Create 2 directories under mavenrepo, namely releases and snapshots

{% highlight bash %}

mkdir releases snapshots

{% endhighlight %}


**Step 6** : Create README.md under each sub directory, releases and snapshots
Note: This step is required since git will not push empty directories, so we add empty README.md files :)
{% highlight bash %}

touch releases/README.md
touch snapshots/README.md

{% endhighlight %}


**Step 7** : Stage all the changed files under git, using the below command
{% highlight bash %}

git add .

{% endhighlight %}


**Step 8** : Commit with a message
{% highlight bash %}

git commit -m "Initial Setup"

{% endhighlight %}


**Step 9** : Push to origin
{% highlight bash %}

git push origin master

{% endhighlight %}

Thats It!
You have a working maven repository :D

Okay, this is cool …I have a working maven repository ..hmm..but something is missing ….wait a second, where is the artifact that i would be pushing to this maven repository ??
To be specific, how do i generate the maven artifact ?
Simple,

##Generating a maven artifact

**Step 10** : Generate a maven artifact using the below command in terminal/command prompt (provided you already have the maven installed)
{% highlight bash %}

mvn clean org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file -DgroupId=com.company.id -DartifactId=artificatid -Dversion=1.0.0 -Dpackaging=aar -Dfile=artifact.aar -DlocalRepositoryPath=./mavenrepo/releases/aar -DgeneratePom=true -DcreateChecksum=true

{% endhighlight %}

thats a lot to take in but thats just one single command that does it all.

Lets break it down into parts:

- **mvn** Maven build tool command
- **clean** Command that attempts to clean a project’s working directory of the files that were generated at build-time
- **org.apache.maven.plugins:maven-install-plugin:2.5.2:install-file** Command to install the artifact into the maven repository via using a specific maven plugin, here being v2.5.2
- **-DgroupId** Specify your package name here i.e.com.company.id
- **-DartifactId** Specify the name of the artifact
- **-Dversion** Specify the version of the artifact
- **-Dpackaging** Specify the packaging type of the artifact i.e jar/aar/war
- **-Dfile** Specify here the specific name of the jar/aar/war you are pushing as a maven artifact
- **-DlocalRepositoryPath** Specify the path to your mavenrepo (git local) i.e.
{% highlight bash %}

./mavenrepo/releases/aar

{% endhighlight %}

- **-DgeneratePom** Set it to true to generate a POM file
- **-DcreateChecksum** Set it to true to generate the checksum files

**Step 11** : Once you are done generating the maven artifacts and they are deployed under the specific folder ( releases/snapshots), just stage them, commit and push it to your remote repo…
{% highlight bash %}

git add .
git commit -m "<artifact> v1.0.0 added"
git push origin master

{% endhighlight %}

Repeat ***Steps 10-11*** every time you want to publish a maven artifact to your own maven repository.

## In Summary
Thats it for Part 1. In the next part we will see how to use this maven repository in our android application to reference libraries into our project with the help of gradle.

Till then have fun crushing code :D
