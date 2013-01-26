import sbt._
import Keys._
import PlayProject._
import com.gu.SbtJasminePlugin._

object ApplicationBuild extends Build {

    val appName         = "AngularJSTest"
    val appVersion      = "1.0-SNAPSHOT"

    val appDependencies = Seq(
      // Add your project dependencies here,
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = SCALA)
      .settings(jasmineSettings : _*)  //this adds jasmine settings from the sbt-jasmine plugin into the project
      .settings(
      // Add your own project settings here

      // jasmine configuration, overridden as we don't follow the default project structure sbt-jasmine expects
      appJsDir <+= baseDirectory / "app/assets/javascripts",
      appJsLibDir <+= baseDirectory / "public/javascripts/lib",
      jasmineTestDir <+= baseDirectory / "test/assets/",
      jasmineConfFile <+= baseDirectory / "test/assets/test.dependencies.js",
      // link jasmine to the standard 'sbt test' action. Now when running 'test' jasmine tests will be run, and if they pass
      // then other Play tests will be executed.
      (test in Test) <<= (test in Test) dependsOn (jasmine)
    )
}
