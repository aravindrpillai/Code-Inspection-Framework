package codeinspect.util
uses java.util.logging.Logger

/**
 * author : Aravind R Pillai
 * date : 03 Oct 2022
 * Utility class to handle the loggers
 */
class LoggerUtil {
  
  static var myLogger : Logger
  static var debugEnabled = false
  private construct(){}
  
  static function getLogger (className : Class) : LoggerUtil{
    myLogger = Logger.getLogger(className.Class.Name)
    return new LoggerUtil()
  }

  function info(content: String){
    myLogger.info(content)
  }

  function debug(content: String){
    if(debugEnabled){
      myLogger.fine(content)
    }
  }

  function warn(content: String){
    if(debugEnabled){
      myLogger.warning(content)
    }
  }

  function error(content: String){
    myLogger.info(content)
  }

  function trace(content: String){
    if(debugEnabled){
      myLogger.warning(content)
    }
  }

}