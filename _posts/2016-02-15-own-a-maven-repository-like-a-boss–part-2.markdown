---
layout: post
title:  "Own a maven repository, like a boss! – Part 2"
description: Learn to use your artifacts hosted in your a private repository
permalink: /own-a-maven-repository-like-a-boss–part-2
date: 2016-02-16 14:46:14 +0530
author: "Nishant"
---
The world of artifacts and the way they make the life of a developer simpler, fascinates me to a great extent.

For the same reason I have gone through a lot of good articles online, which explain how the whole process works. However most of the documentation is either not up to date or lacks proper explanation. Personally all I care about is how does it work and how can I make it simpler. Hence I set out to try and implement the whole process on my own.

We have already covered in [Part-1](/own-a-maven-repository-like-a-boss–part-1) of this series the process of how to create a maven repository hosted on github and this part builds upon that.

The next part is actually the simpler step - To consume these artifacts which are hosted on a maven repository in your android project.

The basic steps required are as follows :

+ ### **Step 1**
Goto your maven repository on github and open up your releases folder via the browser.

+ ### **Step 2**
Copy the URL in the address bar. It should look like below
{% highlight bash %}https://github.com/<username>/<mavenrepo>/tree/master/releases{% endhighlight %}

+ ### **Step 3**
Now replace the `tree` word in the url with `raw`
    
    From ```https://github.com/<username>/<mavenrepo>/tree/master/releases```

    to ```https://github.com/<username>/<mavenrepo>/raw/master/releases```

    and copy this new url.

+ ### **Step 4**
Now goto your Android Project and open up your `build.gradle` file for the module where you want to include the artifact (i.e app/library).

+ ### **Step 5**
Now copy the below to the `build.gradle` file with the appropriate url for the maven repository as obtained in _Step-3_.
{% highlight groovy %}
repositories {
    maven {
        url "https://github.com/<username>/<mavenrepo>/raw/master/releases"
    }
}{% endhighlight %}

+ ### **Step 6**
Next , add the dependency as you would normally
{% highlight groovy %}
dependencies {
    compile 'com.github.<username>:<artifact_name>:<version>'
}{% endhighlight %}

**where `<version>` has to be of the form  `<major>.<minor>.<patch>` i.e 1.0.0**

---

## In Summary

You just learned how to use artifacts from your own github account as a maven repository and in essence bypassed the complexity of getting artifacts into the Maven Central/Jcenter.

For reference you can have a look at my own [maven repository](http://crushingcode.co/mavenrepo/) on [github](https://github.com/nisrulz/mavenrepo)

However as you would see this is a very limiting way of accessing artifacts. 
The developer is supposed to include your `maven url` under `repository` section which is ...a bit of extra work , right ? 

As a developer we are all very lazy. We want to cut this extra work down to only compiling our artifact as a dependency with a single line of code

{% highlight groovy %}compile 'com.github.<username>:<artifact_name>:<version>'{% endhighlight %}

Well this is where Maven Central/Jcenter step in.
A lot of information on them in the next part of this series.

Till then keep calm and crush c.o.d.e !
