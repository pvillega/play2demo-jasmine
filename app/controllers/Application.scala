/*
 * Copyright (c) 2013 Pere Villega
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._

object Application extends Controller {
  
  def index = Action { implicit request =>
    Ok(views.html.index())
  }

  // Used to add new tasks, in the backend we simply show a message in the logs to notify that the call was successful
  def addTask = Action(parse.json) { implicit request =>
    (request.body \ "msg").asOpt[String].map { msg =>
      Logger.info("Received task with text: %s".format(msg))
      Ok
    }.getOrElse {
      BadRequest("Missing parameter [msg]")
    }
  }

  // Makes some routes available via javascript
  def javascriptRoutes = Action { implicit request =>
    Ok(
      Routes.javascriptRouter("jsRoutes")(
        routes.javascript.Application.tasks
      )
    ).as("text/javascript")
  }

  //Model for the Json response, this should be in database and more elaborated in a real app
  case class Task(id: Int, text: String, done: Boolean = false)

  // to facilitate conversion from class to Json we create this implicit
  implicit object dumpToJson extends Format[Task] {

    def writes(o: Task): JsValue = JsObject(
      List(
        "id" -> JsNumber(o.id),
        "text" -> JsString(o.text),
        "done" -> JsBoolean(o.done)
      )
    )

    def reads(json: JsValue): Task = Task(
      id = (json \ "id").as[Int],
      text = (json \ "text").as[String],
      done = (json \ "done").as[Boolean]
    )
  }

  //returns a list of tasks as json
  def tasks = Action { implicit request =>
    val values = List(Task(1, "learn angular", true), Task(2, "build an Angular app"))
    Ok(Json.toJson(values).toString()).as("application/json")
  }
  
}