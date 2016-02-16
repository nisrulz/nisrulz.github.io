---
layout: post
title:  "Meet JACK & JILL , Android’s experimental toolchain"
description: Toolchain.Much love.
permalink: /meet-jack-and-jill-androids-experimental-toolchain
date: 2015-07-21 14:46:14 +0530
author: "Nishant"
---

JACK & JILL are part of the new tool chain for android and in the words of [Android Developer Blog](http://android-developers.blogspot.co.uk/2014/12/hello-world-meet-our-new-experimental.html)

> they are designed to improve build times and simplify development by reducing dependencies on other tools

In case you are curious, **JACK** stands for **Java Android Compiler Kit** and **JILL** stands for  **Jack Intermediate Library Linker**.

Woa ..woa..wooaaaa ..thats sounds too technical ..lets slow this down, right.

**JACK** & **JILL** were released as an experimental tool chain in the Android SDK  21.1.1 and recently got minor bug fixes in the recent release of Android SDK 21.1.2

**So what exactly are they for  ?**
**JACK** basically compiles your Java code directly to a .dex Dalvik Executable.
**JILL** on the other hand translates any libraries you are referencing to a new Jack library file (.jack).

**Whats the difference ?**
Glad you asked :)
The usual process of android compilation process is
1. Use the standard javac compiler to convert the source code to Java bytecode
2. Feed this bytecode to dex compiler to get the Dalvik bytecode

**JACK** eliminates the conversion to Java bytecode step and directly converts source code to Dalvik bytecode. During the same time it also handles any requested code minification (shrinking and/or obfuscation), previously handled by Proguard and then perform repackaging too.

Now all this time, **JACK** was working on you source code, right!
What if you have a library being referenced in the form of say a JAR?
**JILL** takes care of that, by converting all libraries to Jack Library File (.jack) which can easily be merged by JACK during compilation into object code.
Basically the Android Gradle plugin and JACK collect any .jack library files, along with your source code, and compiles them into a set of dex files and further assembles them into an APK.

The complete process explained in a diagram

[![Jack & Jill Application Build](/assets/images/posts/2015-07-21-meet-jack-and-jill-androids-experimental-toolchain/jacksitesdiagram.png "Jack & Jill Application Build")](/assets/images/posts/2015-07-21-meet-jack-and-jill-androids-experimental-toolchain/jacksitesdiagram.png)

**Why all the hassle for compiler ?**
Google believes in optimizing the whole process of  compilation of android apps. The faster that happens the better, maybe involve incremental compilation for the same(still under development)! :D
Also due to the Oracle-Google dispute over using java , Google probably wants to move away from using javac and have its own compiler in place to convert source code to dalvik bytecode.

**How do you use the tool chain in your apps ?**
Good question! At the moment JACK & JILL are both in experimental phase.
So you specifically need to enable them in your build.gradle i.e. you need to set useJack = true

{% highlight groovy %}

android {
    ...
     buildToolsRevision '21.1.2'
     defaultConfig {
         // Enable the experimental Jack build tools.
         useJack = true
         }
    ...
 }

{% endhighlight %}

[More Info at Android Tools Project Site](http://tools.android.com/tech-docs/jackandjill)

**Downside ?**
As of now these support only Java 7 i.e no support for Java 8 :(
No Annotation processing :(

Thats it for now.
Any questions are always welcome :D

References

[Android Developer Blog](http://android-developers.blogspot.co.uk/2014/12/hello-world-meet-our-new-experimental.html)

[Android Tools Project Site](http://tools.android.com/tech-docs/jackandjill)
