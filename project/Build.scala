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
      .settings(jasmineSettings : _*)
      .settings(
      // Add your own project settings here

      // jasmine conf
      appJsDir <+= baseDirectory / "public/javascripts",
      appJsLibDir <+= baseDirectory / "public/javascripts/lib",
      jasmineTestDir <+= baseDirectory / "test/assets/",
      jasmineConfFile <+= baseDirectory / "test/assets/test.dependencies.js",
      (test in Test) <<= (test in Test) dependsOn (jasmine)
    )
}
